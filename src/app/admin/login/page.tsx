import Link from "next/link";
import { Building2, LockKeyhole, ArrowLeft, ShieldCheck } from "lucide-react";
import { loginAdminAction } from "@/app/admin/login/actions";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const error = resolvedSearchParams.error;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0e3541] px-5 py-10">
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#53bc76]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-12 h-96 w-96 rounded-full bg-[#39aff2]/25 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-2xl" />

      <section className="relative z-10 grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden lg:block">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-bold text-white/80 backdrop-blur-xl transition hover:bg-white/[0.11] hover:text-white"
          >
            <ArrowLeft size={16} />
            Voltar ao site
          </Link>

          <div className="mt-10 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-bold text-white/82 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[#53bc76] shadow-[0_0_0_6px_rgba(83,188,118,0.14)]" />
              Checkmate Property Admin
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-[-0.04em] text-white">
              Gestão da operação imobiliária com{" "}
              <span className="bg-gradient-to-r from-[#53bc76] to-[#39aff2] bg-clip-text text-transparent">
                segurança e clareza.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
              Acesse o painel administrativo para gerenciar propriedades,
              conteúdos, formulários, leads e configurações do portal.
            </p>

            <div className="mt-8 grid max-w-lg grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#0e3541]">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="mt-4 text-sm font-black text-white">
                  Acesso protegido
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Login administrativo para equipe autorizada.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[#53bc76] to-[#39aff2] text-white">
                  <Building2 size={22} />
                </div>
                <h3 className="mt-4 text-sm font-black text-white">
                  Property Portal
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Controle da estrutura pública e administrativa.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#53bc76] to-[#39aff2] text-white shadow-[0_18px_40px_rgba(57,175,242,0.24)]">
                <Building2 size={24} />
              </span>

              <div className="text-left">
                <p className="font-black leading-none text-white">
                  Property Portal
                </p>
                <p className="mt-1 text-xs font-semibold text-white/58">
                  Admin Access
                </p>
              </div>
            </Link>
          </div>

          <section className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-white p-7 shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#39aff2]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#53bc76]/16 blur-3xl" />

            <div className="relative z-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#0e3541] text-white shadow-[0_18px_45px_rgba(14,53,65,0.24)]">
                <LockKeyhole size={28} />
              </div>

              <h1 className="mt-6 text-center text-3xl font-black tracking-[-0.03em] text-[#0e3541]">
                Admin Login
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-6 text-[#587469]">
                Enter your credentials to access the property management
                dashboard.
              </p>

              {error === "invalid" ? (
                <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
                  Invalid email or password.
                </div>
              ) : null}

              {error === "config" ? (
                <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-700">
                  Missing admin environment variables.
                </div>
              ) : null}

              <form action={loginAdminAction} className="mt-7 space-y-5">
                <label className="block">
                  <span className="text-sm font-black text-[#0e3541]">
                    Email
                  </span>

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="admin@property.com"
                    className="mt-2 h-12 w-full rounded-2xl border border-[rgba(14,53,65,0.12)] bg-[#f8fafc] px-4 text-sm font-semibold text-[#0e3541] outline-none transition placeholder:text-[#8aa09a] focus:border-[#39aff2] focus:bg-white focus:ring-4 focus:ring-[#39aff2]/10"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-black text-[#0e3541]">
                    Password
                  </span>

                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="mt-2 h-12 w-full rounded-2xl border border-[rgba(14,53,65,0.12)] bg-[#f8fafc] px-4 text-sm font-semibold text-[#0e3541] outline-none transition placeholder:text-[#8aa09a] focus:border-[#39aff2] focus:bg-white focus:ring-4 focus:ring-[#39aff2]/10"
                  />
                </label>

                <button
                  type="submit"
                  className="group relative mt-2 flex h-13 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0e3541] px-5 py-4 text-sm font-black text-white shadow-[0_18px_44px_rgba(14,53,65,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(14,53,65,0.3)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#53bc76] to-[#39aff2] opacity-0 transition group-hover:opacity-100" />
                  <span className="relative z-10">Sign In</span>
                </button>
              </form>

              <Link
                href="/"
                className="mt-6 flex items-center justify-center gap-2 text-center text-sm font-black text-[#0e3541] transition hover:text-[#39aff2]"
              >
                <ArrowLeft size={16} />
                Back to public website
              </Link>
            </div>
          </section>

          <p className="mt-5 text-center text-xs font-semibold leading-5 text-white/48">
            © Checkmate Property. Secure administrative access.
          </p>
        </div>
      </section>
    </main>
  );
}