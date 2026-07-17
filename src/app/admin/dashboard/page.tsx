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
    <div className="admin-dashboard-page flex w-full flex-col">
      <section className="admin-dark-panel relative overflow-hidden rounded-[22px] p-5 md:p-6">
        <div className="admin-glow-orb absolute right-[-70px] top-[-80px] h-[200px] w-[200px] rounded-full bg-white/10 blur-3xl" />
        <div className="admin-glow-orb absolute bottom-[-100px] left-[28%] h-[180px] w-[180px] rounded-full bg-[#53bc76]/14 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="admin-eyebrow text-[#8df0a9]">Dashboard KPIs</p>

            <h2 className="admin-title-lg mt-2 text-white">Admin overview.</h2>

            <p className="admin-body-sm mt-2.5 max-w-2xl text-white/68">
              Acompanhe as principais métricas do portal, páginas públicas,
              formulários, acessos, usuários e imóveis cadastrados.
            </p>
          </div>

          <Link
            href="/admin/properties"
            className="admin-primary-button inline-flex min-h-[40px] gap-1.5 rounded-xl px-4 text-[12px] font-semibold no-underline"
          >
            Manage Properties
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      <section className="grid w-full gap-3 md:grid-cols-2 xl:grid-cols-4">
        <DashboardKpiCard
          title="Páginas Públicas Cadastradas"
          value={publicPagesRegistered}
          description="Total de imóveis/páginas no banco"
          icon={<LayoutTemplate size={16} />}
          delay={1}
        />

        <DashboardKpiCard
          title="Páginas Públicas Criadas"
          value={publicPagesCreated}
          description="Páginas com visibilidade pública"
          icon={<Globe2 size={16} />}
          delay={2}
        />

        <DashboardKpiCard
          title="Páginas Públicas Off"
          value={publicPagesOff}
          description="Páginas em draft ou não públicas"
          icon={<FileText size={16} />}
          delay={3}
        />

        <DashboardKpiCard
          title="Formulários Enviados"
          value={formSubmissionsCount}
          description="Registros em form_submissions"
          icon={<ClipboardCheck size={16} />}
          delay={4}
        />

        <DashboardKpiCard
          title="Formulários Recebidos"
          value={leadsCount}
          description="Leads recebidos no banco"
          icon={<Inbox size={16} />}
          delay={5}
        />

        <DashboardKpiCard
          title="Acessos à Home"
          value={analyticsEventsCount}
          description="Eventos registrados em analytics_events"
          icon={<Eye size={16} />}
          delay={6}
        />

        <DashboardKpiCard
          title="Usuários Cadastrados"
          value={adminUsersCount}
          description="Usuários cadastrados no admin"
          icon={<Users size={16} />}
          delay={7}
        />

        <DashboardKpiCard
          title="Imóveis Cadastrados"
          value={propertiesCount}
          description="Total de imóveis cadastrados"
          icon={<Building2 size={16} />}
          delay={8}
        />
      </section>

      <section className="grid w-full gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="admin-card overflow-hidden rounded-[20px]">
          <div className="admin-panel-header flex flex-col justify-between gap-3 px-4 py-3.5 md:flex-row md:items-center md:px-5">
            <div>
              <p className="admin-eyebrow text-[#53bc76]">Portfolio</p>

              <h2 className="admin-list-title admin-title-md mt-1">
                Recent Properties
              </h2>

              <p className="admin-list-meta mt-0.5 text-[12px]">
                Latest properties registered in Supabase.
              </p>
            </div>

            <Link
              href="/admin/properties"
              className="admin-secondary-button inline-flex min-h-[34px] items-center justify-center rounded-full px-4 text-[12px] font-semibold no-underline"
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
                  className="admin-list-row flex items-center gap-3 px-4 py-3 md:px-5"
                >
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#f8fafc] ring-1 ring-[rgba(14,53,65,0.08)]">
                    {card.imageUrl ? (
                      <img
                        src={card.imageUrl}
                        alt={property.title}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="admin-list-title flex h-full w-full items-center justify-center">
                        <Building2 size={16} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="admin-list-title truncate text-[13px] font-semibold">
                      {property.title}
                    </p>

                    <p className="admin-list-meta mt-0.5 truncate text-[11px]">
                      {property.slug}
                    </p>
                  </div>

                  <span className="admin-badge hidden px-2.5 py-0.5 text-[10px] uppercase tracking-[0.08em] md:inline-flex">
                    {property.status}
                  </span>
                </Link>
              );
            })}

            {recentProperties.length === 0 ? (
              <div className="admin-list-meta px-5 py-10 text-center text-[12px]">
                No properties registered yet.
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <div className="admin-card rounded-[20px] p-4 md:p-5">
            <p className="admin-eyebrow text-[#53bc76]">Visibility</p>

            <h2 className="admin-list-title admin-title-md mt-1">
              Public Pages Status
            </h2>

            <p className="admin-list-meta mt-1.5 text-[12px] leading-5">
              Distribuição atual das páginas públicas do portal.
            </p>

            <div className="mt-4 space-y-4">
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

          <div className="admin-dark-panel rounded-[20px] p-4 md:p-5">
            <p className="admin-eyebrow relative z-10 text-[#8df0a9]">System</p>

            <h2 className="admin-title-md relative z-10 mt-1 text-white">
              Database Health
            </h2>

            <div className="relative z-10 mt-4 grid gap-2">
              <HealthItem
                icon={<Database size={15} />}
                title="Supabase"
                description="Connected"
              />

              <HealthItem
                icon={<Building2 size={15} />}
                title="Properties Loaded"
                description={`${propertiesCount} records`}
              />

              <HealthItem
                icon={<ClipboardList size={15} />}
                title="Forms"
                description={`${formSubmissionsCount} submissions`}
              />

              <HealthItem
                icon={<CheckCircle2 size={15} />}
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
  delay = 1,
}: {
  title: string;
  value: number;
  description: string;
  icon: ReactNode;
  delay?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}) {
  return (
    <div
      className={`admin-kpi-card admin-reveal admin-reveal-delay-${delay} group relative overflow-hidden rounded-[18px] p-4`}
    >
      <div className="absolute right-[-40px] top-[-40px] h-28 w-28 rounded-full bg-[#53bc76]/8 blur-xl transition group-hover:bg-[#53bc76]/14" />
      <div className="absolute bottom-[-60px] left-[-50px] h-28 w-28 rounded-full bg-slate-900/5 blur-xl" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="admin-kpi-title max-w-[200px] text-[12px] font-semibold leading-4">
            {title}
          </p>

          <p className="admin-kpi-value mt-3 text-[28px] font-semibold leading-none tracking-[-0.03em]">
            {formatNumber(value)}
          </p>

          <p className="admin-kpi-description mt-2 text-[11px] leading-4">
            {description}
          </p>
        </div>

        <span className="admin-kpi-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition duration-200 group-hover:scale-105 group-hover:bg-[#53bc76] group-hover:text-white">
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
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="admin-progress-label text-[12px] font-medium">
          {label}
        </span>

        <span className="admin-progress-label text-[12px] font-semibold">
          {value} / {total}
        </span>
      </div>

      <div className="admin-progress-track h-2 overflow-hidden rounded-full">
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
    <div className="flex items-center gap-3 rounded-[14px] border border-[rgba(255,255,255,0.1)] bg-white/[0.07] px-3 py-2.5 transition duration-200 hover:bg-white/[0.11]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#53bc76]/15 text-[#53bc76]">
        {icon}
      </span>

      <div>
        <p className="text-[12px] font-semibold text-white">{title}</p>

        <p className="mt-0.5 text-[11px] text-white/55">{description}</p>
      </div>
    </div>
  );
}
