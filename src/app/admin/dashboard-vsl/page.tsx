import Link from "next/link";
import {
  BarChart3,
  Eye,
  MousePointerClick,
  RefreshCw,
  Volume2,
  Video,
} from "lucide-react";
import { getBlueprintVslDashboardStats } from "@/lib/blueprint-vsl/analytics";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function formatDateLabel(value: string) {
  const date = new Date(`${value}T12:00:00`);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

function getIcon(eventType: string) {
  if (eventType === "page_view") return <Eye size={18} />;
  if (eventType === "video_complete") return <Video size={18} />;
  if (eventType === "sound_enabled") return <Volume2 size={18} />;
  return <MousePointerClick size={18} />;
}

export default async function AdminDashboardVslPage() {
  const stats = await getBlueprintVslDashboardStats(30);
  const maxDailyViews = Math.max(
    1,
    ...stats.daily.map((day) => day.page_view),
  );

  return (
    <div className="admin-dashboard-page flex w-full flex-col gap-6">
      <section className="admin-dark-panel relative overflow-hidden rounded-[22px] p-5 md:p-6">
        <div className="admin-glow-orb absolute right-[-70px] top-[-80px] h-[220px] w-[220px] rounded-full bg-white/10 blur-3xl" />
        <div className="admin-glow-orb absolute bottom-[-100px] left-[28%] h-[180px] w-[180px] rounded-full bg-[#c79a4b]/14 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="admin-eyebrow text-[#ebca84]">
              Blueprint VSL Analytics
            </p>

            <h2 className="admin-title-lg mt-2 text-white">
              Dashboard da VSL.
            </h2>

            <p className="admin-body-sm mt-2.5 max-w-2xl text-white/68">
              Acompanhe acessos, pessoas que chegaram ao final do vídeo,
              cliques para ativar som e interações no formulário da página
              /blueprint-vsl.
            </p>
          </div>

          <Link
            href="/blueprint-vsl"
            className="admin-primary-button inline-flex min-h-[40px] gap-1.5 rounded-xl px-4 text-[12px] font-semibold no-underline"
          >
            Abrir VSL
            <BarChart3 size={14} />
          </Link>
        </div>
      </section>

      {!stats.available && (
        <section className="admin-card rounded-[18px] border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-semibold text-amber-800">
            Os eventos ainda não estão disponíveis.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-amber-700">
            A tabela `reg_blueprint_vsl_events` precisa existir no Supabase.
            A migration já foi criada no projeto. Depois de aplicar a migration,
            novos eventos da VSL começarão a aparecer aqui.
          </p>
          {stats.error && (
            <p className="mt-3 text-xs leading-5 text-amber-700/80">
              Detalhe técnico: {stats.error}
            </p>
          )}
        </section>
      )}

      <section className="grid w-full gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.metrics.map((metric) => (
          <article
            key={metric.eventType}
            className="admin-kpi-card group relative overflow-hidden rounded-[18px] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="admin-kpi-title max-w-[210px] text-[12px] font-semibold leading-4">
                  {metric.label}
                </p>

                <p className="admin-kpi-value mt-3 text-[30px] font-semibold leading-none tracking-[-0.03em]">
                  {formatNumber(metric.uniqueSessions)}
                </p>

                <p className="admin-kpi-description mt-2 text-[11px] leading-4">
                  {metric.description}
                </p>
              </div>

              <span className="admin-kpi-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition duration-200 group-hover:scale-105 group-hover:bg-[#c79a4b] group-hover:text-white">
                {getIcon(metric.eventType)}
              </span>
            </div>

            <div className="mt-4 rounded-xl bg-black/[0.035] px-3 py-2 text-[11px] text-slate-500">
              Total de eventos:{" "}
              <strong className="text-[#171614]">
                {formatNumber(metric.total)}
              </strong>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="admin-card rounded-[20px] p-5 md:p-6">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="admin-eyebrow text-[#c79a4b]">Últimos 30 dias</p>
              <h2 className="admin-title-md mt-1">Acessos por dia</h2>
              <p className="mt-1 text-sm text-slate-500">
                Barras baseadas em eventos `page_view`.
              </p>
            </div>

            <Link
              href="/admin/dashboard-vsl"
              className="admin-secondary-button inline-flex min-h-[36px] items-center gap-2 rounded-xl px-4 text-[12px] font-semibold no-underline"
            >
              <RefreshCw size={14} />
              Atualizar
            </Link>
          </div>

          <div className="mt-6 grid gap-2">
            {stats.daily.map((day) => {
              const width = Math.max(4, (day.page_view / maxDailyViews) * 100);

              return (
                <div
                  key={day.date}
                  className="grid grid-cols-[56px_1fr_48px] items-center gap-3"
                >
                  <span className="text-xs font-semibold text-slate-500">
                    {formatDateLabel(day.date)}
                  </span>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-[#c79a4b]"
                      style={{ width: `${width}%` }}
                    />
                  </div>

                  <span className="text-right text-xs font-bold text-[#171614]">
                    {formatNumber(day.page_view)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="admin-dark-panel rounded-[20px] p-5 text-white md:p-6">
          <p className="admin-eyebrow text-[#ebca84]">Como ler</p>
          <h2 className="admin-title-md relative z-10 mt-1 text-white">
            Pessoas únicas vs eventos.
          </h2>

          <div className="relative z-10 mt-5 space-y-4 text-sm leading-6 text-white/65">
            <p>
              O número grande de cada card mostra sessões únicas. Isso evita
              contar a mesma pessoa várias vezes quando ela clica mais de uma
              vez.
            </p>
            <p>
              O total de eventos mostra o volume bruto de ações registradas no
              período.
            </p>
            <p>
              A coleta começa a contar a partir da aplicação da migration e do
              deploy desta versão.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
