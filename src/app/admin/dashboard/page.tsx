import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Database,
  Eye,
  FileText,
  Globe2,
  Inbox,
  LayoutTemplate,
  Users,
} from "lucide-react";
import { getAdminProperties } from "@/lib/properties";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatNumber, mapPropertyToCard } from "@/types/property";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type DashboardCountTable =
  | "admin_users"
  | "analytics_events"
  | "leads"
  | "form_submissions";

async function getTableCount(tableName: DashboardCountTable) {
  try {
    const supabase = createAdminClient();

    const { count, error } = await supabase.from(tableName).select("*", {
      count: "exact",
      head: true,
    });

    if (error) {
      return 0;
    }

    return count || 0;
  } catch {
    return 0;
  }
}

function normalizeStatus(status: string | null | undefined) {
  return String(status || "").toLowerCase();
}

function normalizeVisibility(visibility: string | null | undefined) {
  return String(visibility || "").toLowerCase();
}

export default async function AdminDashboardPage() {
  const [
    properties,
    adminUsersCount,
    leadsCount,
    formSubmissionsCount,
    analyticsEventsCount,
  ] = await Promise.all([
    getAdminProperties(),
    getTableCount("admin_users"),
    getTableCount("leads"),
    getTableCount("form_submissions"),
    getTableCount("analytics_events"),
  ]);

  const publicPagesRegistered = properties.length;

  const publicPagesCreated = properties.filter((property) => {
    const visibility = normalizeVisibility(
      (property as unknown as Record<string, unknown>).visibility as string,
    );

    return visibility === "public";
  }).length;

  const publicPagesOff = properties.filter((property) => {
    const visibility = normalizeVisibility(
      (property as unknown as Record<string, unknown>).visibility as string,
    );

    const status = normalizeStatus(property.status);

    return visibility !== "public" || status === "draft";
  }).length;

  const propertiesCount = properties.length;

  const recentProperties = [...properties]
    .sort((a, b) => {
      const first = new Date(a.created_at || 0).getTime();
      const second = new Date(b.created_at || 0).getTime();

      return second - first;
    })
    .slice(0, 8);

  return (
    <div className="admin-dashboard-page w-full space-y-8">
      <section className="admin-dark-panel relative overflow-hidden rounded-[34px] p-7 md:p-9">
        <div className="absolute right-[-90px] top-[-100px] h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[28%] h-[220px] w-[220px] rounded-full bg-[#53bc76]/12 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#8df0a9]">
              Dashboard KPIs
            </p>

            <h2 className="mt-3 text-[38px] font-semibold leading-[1] tracking-normal text-white md:text-[58px]">
              Admin overview.
            </h2>

            <p className="mt-4 max-w-3xl text-sm font-normal leading-7 text-white/72 md:text-base">
              Acompanhe as principais métricas do portal, páginas públicas,
              formulários, acessos, usuários e imóveis cadastrados.
            </p>
          </div>

          <Link
            href="/admin/properties"
            className="admin-primary-button inline-flex min-h-[50px] gap-2 px-6 text-sm no-underline transition hover:-translate-y-0.5"
          >
            Manage Properties
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardKpiCard
          title="Páginas Públicas Cadastradas"
          value={publicPagesRegistered}
          description="Total de imóveis/páginas no banco"
          icon={<LayoutTemplate size={22} />}
        />

        <DashboardKpiCard
          title="Páginas Públicas Criadas"
          value={publicPagesCreated}
          description="Páginas com visibilidade pública"
          icon={<Globe2 size={22} />}
        />

        <DashboardKpiCard
          title="Páginas Públicas Off"
          value={publicPagesOff}
          description="Páginas em draft ou não públicas"
          icon={<FileText size={22} />}
        />

        <DashboardKpiCard
          title="Formulários Enviados"
          value={formSubmissionsCount}
          description="Registros em form_submissions"
          icon={<ClipboardCheck size={22} />}
        />

        <DashboardKpiCard
          title="Formulários Recebidos"
          value={leadsCount}
          description="Leads recebidos no banco"
          icon={<Inbox size={22} />}
        />

        <DashboardKpiCard
          title="Acessos à Home"
          value={analyticsEventsCount}
          description="Eventos registrados em analytics_events"
          icon={<Eye size={22} />}
        />

        <DashboardKpiCard
          title="Usuários Cadastrados"
          value={adminUsersCount}
          description="Usuários cadastrados no admin"
          icon={<Users size={22} />}
        />

        <DashboardKpiCard
          title="Imóveis Cadastrados"
          value={propertiesCount}
          description="Total de imóveis cadastrados"
          icon={<Building2 size={22} />}
        />
      </section>

      <section className="grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="admin-card overflow-hidden rounded-[32px]">
          <div className="admin-panel-header flex flex-col justify-between gap-4 px-6 py-5 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#53bc76]">
                Portfolio
              </p>

              <h2 className="admin-list-title mt-1 text-2xl font-bold tracking-normal">
                Recent Properties
              </h2>

              <p className="admin-list-meta mt-1 text-sm font-normal">
                Latest properties registered in Supabase.
              </p>
            </div>

            <Link
              href="/admin/properties"
              className="admin-secondary-button inline-flex min-h-[42px] items-center justify-center rounded-full px-5 text-sm font-bold no-underline transition hover:-translate-y-0.5"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-[rgba(14,53,65,0.08)]">
            {recentProperties.map((property) => {
              const card = mapPropertyToCard(property);

              return (
                <Link
                  key={property.id}
                  href={`/admin/properties/${property.id}`}
                  className="admin-list-row flex items-center gap-4 px-6 py-4 transition"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-[#f8fafc] ring-1 ring-[rgba(14,53,65,0.08)]">
                    {card.imageUrl ? (
                      <img
                        src={card.imageUrl}
                        alt={property.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="admin-list-title flex h-full w-full items-center justify-center">
                        <Building2 size={22} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="admin-list-title truncate text-sm font-bold">
                      {property.title}
                    </p>

                    <p className="admin-list-meta mt-1 truncate text-xs font-normal">
                      {property.slug}
                    </p>
                  </div>

                  <span className="admin-badge hidden px-3 py-1 text-[11px] uppercase tracking-[0.08em] md:inline-flex">
                    {property.status}
                  </span>
                </Link>
              );
            })}

            {recentProperties.length === 0 ? (
              <div className="admin-list-meta px-6 py-14 text-center text-sm font-normal">
                No properties registered yet.
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-6">
          <div className="admin-card rounded-[32px] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#53bc76]">
              Visibility
            </p>

            <h2 className="admin-list-title mt-1 text-2xl font-bold tracking-normal">
              Public Pages Status
            </h2>

            <p className="admin-list-meta mt-2 text-sm font-normal leading-6">
              Distribuição atual das páginas públicas do portal.
            </p>

            <div className="mt-6 space-y-5">
              <ProgressRow
                label="Criadas"
                value={publicPagesCreated}
                total={publicPagesRegistered}
              />

              <ProgressRow
                label="Off"
                value={publicPagesOff}
                total={publicPagesRegistered}
              />
            </div>
          </div>

          <div className="admin-dark-panel rounded-[32px] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8df0a9]">
              System
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-normal text-white">
              Database Health
            </h2>

            <div className="mt-5 grid gap-3">
              <HealthItem
                icon={<Database size={19} />}
                title="Supabase"
                description="Connected"
              />

              <HealthItem
                icon={<Building2 size={19} />}
                title="Properties Loaded"
                description={`${propertiesCount} records`}
              />

              <HealthItem
                icon={<ClipboardList size={19} />}
                title="Forms"
                description={`${formSubmissionsCount} submissions`}
              />

              <HealthItem
                icon={<CheckCircle2 size={19} />}
                title="Admin Access"
                description="Protected area"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardKpiCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="admin-kpi-card group relative overflow-hidden rounded-[28px] p-5 transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(14,53,65,0.12)]">
      <div className="absolute right-[-46px] top-[-46px] h-32 w-32 rounded-full bg-[#53bc76]/8 blur-xl transition group-hover:bg-[#53bc76]/12" />
      <div className="absolute bottom-[-70px] left-[-60px] h-32 w-32 rounded-full bg-slate-900/5 blur-xl" />

      <div className="relative z-10 flex items-start justify-between gap-5">
        <div>
          <p className="admin-kpi-title max-w-[220px] text-sm font-bold leading-5">
            {title}
          </p>

          <p className="admin-kpi-value mt-4 text-[36px] font-semibold leading-none tracking-normal">
            {formatNumber(value)}
          </p>

          <p className="admin-kpi-description mt-3 text-sm font-normal leading-5">
            {description}
          </p>
        </div>

        <span className="admin-kpi-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition group-hover:bg-[#53bc76] group-hover:text-white">
          {icon}
        </span>
      </div>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="admin-progress-label text-sm font-semibold">
          {label}
        </span>

        <span className="admin-progress-label text-sm font-bold">
          {value} / {total}
        </span>
      </div>

      <div className="admin-progress-track h-3 overflow-hidden rounded-full">
        <div
          className="admin-progress-value h-full rounded-full"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function HealthItem({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[22px] border border-[rgba(255,255,255,0.1)] bg-white/[0.08] p-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#53bc76]/15 text-[#53bc76]">
        {icon}
      </span>

      <div>
        <p className="text-sm font-bold text-white">{title}</p>

        <p className="mt-1 text-sm font-normal text-white/58">
          {description}
        </p>
      </div>
    </div>
  );
}
