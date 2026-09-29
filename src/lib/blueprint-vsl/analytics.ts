import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

export const BLUEPRINT_VSL_EVENT_TYPES = [
  "page_view",
  "video_complete",
  "sound_enabled",
  "form_click",
] as const;

export type BlueprintVslEventType =
  (typeof BLUEPRINT_VSL_EVENT_TYPES)[number];

type BlueprintVslEventRow = {
  event_type: BlueprintVslEventType;
  session_id: string;
  created_at: string;
};

type BlueprintVslMetric = {
  eventType: BlueprintVslEventType;
  label: string;
  description: string;
  total: number;
  uniqueSessions: number;
};

const EVENT_LABELS: Record<
  BlueprintVslEventType,
  { label: string; description: string }
> = {
  page_view: {
    label: "Acessos na página",
    description: "Total de visitas registradas em /blueprint-vsl.",
  },
  video_complete: {
    label: "Pessoas até o final",
    description: "Sessões que chegaram ao fim do vídeo.",
  },
  sound_enabled: {
    label: "Ativaram o som",
    description: "Cliques no botão de ativar som.",
  },
  form_click: {
    label: "Clicaram no formulário",
    description: "Sessões com interação no formulário liberado.",
  },
};

const EMPTY_METRICS: BlueprintVslMetric[] = BLUEPRINT_VSL_EVENT_TYPES.map(
  (eventType) => ({
    eventType,
    ...EVENT_LABELS[eventType],
    total: 0,
    uniqueSessions: 0,
  }),
);

function getOptionalAdminClient() {
  return createAdminClient() as unknown as {
    from: (table: string) => {
      select: (
        columns: string,
        options?: { count?: "exact"; head?: boolean },
      ) => {
        gte: (column: string, value: string) => Promise<{
          data: BlueprintVslEventRow[] | null;
          error: { message?: string } | null;
          count?: number | null;
        }>;
      };
    };
  };
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function subtractDays(days: number) {
  const date = startOfDay(new Date());
  date.setDate(date.getDate() - days);
  return date;
}

export async function getBlueprintVslDashboardStats(days = 30) {
  try {
    const supabase = getOptionalAdminClient();
    const fromDate = subtractDays(days - 1);

    const { data, error } = await supabase
      .from("reg_blueprint_vsl_events")
      .select("event_type, session_id, created_at")
      .gte("created_at", fromDate.toISOString());

    if (error) {
      return {
        available: false,
        error: error.message || "Não foi possível carregar os eventos.",
        rangeDays: days,
        metrics: EMPTY_METRICS,
        daily: [],
      };
    }

    const rows = data || [];
    const metrics = BLUEPRINT_VSL_EVENT_TYPES.map((eventType) => {
      const eventRows = rows.filter((row) => row.event_type === eventType);

      return {
        eventType,
        ...EVENT_LABELS[eventType],
        total: eventRows.length,
        uniqueSessions: new Set(eventRows.map((row) => row.session_id)).size,
      };
    });

    const dailyMap = new Map<
      string,
      Record<BlueprintVslEventType, number> & { date: string }
    >();

    for (let index = 0; index < days; index += 1) {
      const date = subtractDays(days - 1 - index);
      const key = date.toISOString().slice(0, 10);
      dailyMap.set(key, {
        date: key,
        page_view: 0,
        video_complete: 0,
        sound_enabled: 0,
        form_click: 0,
      });
    }

    rows.forEach((row) => {
      const key = row.created_at.slice(0, 10);
      const day = dailyMap.get(key);

      if (day) {
        day[row.event_type] += 1;
      }
    });

    return {
      available: true,
      error: null,
      rangeDays: days,
      metrics,
      daily: [...dailyMap.values()],
    };
  } catch (error) {
    return {
      available: false,
      error:
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os eventos.",
      rangeDays: days,
      metrics: EMPTY_METRICS,
      daily: [],
    };
  }
}
