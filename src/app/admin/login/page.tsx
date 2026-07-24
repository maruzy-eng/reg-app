import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Building2, LockKeyhole, ShieldCheck } from "lucide-react";
import { loginAdminAction } from "@/app/admin/login/actions";
import { getAdminSession } from "@/lib/admin-auth";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const error = resolvedSearchParams.error;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070707] px-5 py-10">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#C79A4B]/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-[#EBCA84]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-2xl" />

      <section className="relative z-10 grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden lg:block">
          <Link
            href="/reg"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur-xl transition hover:bg-white/[0.11] hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to website
          </Link>

          <div className="mt-10 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white/82 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[#C79A4B] shadow-[0_0_0_6px_rgba(199,154,75,0.14)]" />
              Checkmate REG Admin
            </div>

            <p className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white">
              Secure access to the{" "}
              <span className="bg-gradient-to-r from-[#C79A4B] to-[#EBCA84] bg-clip-text text-transparent">
                operations panel.
              </span>
            </p>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
              Sign in to manage properties, forms, submissions, users, and site
              settings for Checkmate REG.
            </p>

            <div className="mt-8 grid max-w-lg grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#111111]">
                  <ShieldCheck size={22} />
                </div>
                <h2 className="mt-4 text-sm font-semibold text-white">
                  Protected access
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Restricted to authorized team members only.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#C79A4B_0%,#B4853C_100%)] text-[#111111]">
                  <Building2 size={22} />
                </div>
                <h2 className="mt-4 text-sm font-semibold text-white">
                  REG Control
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/58">
                  Centralized management for the institutional platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 text-center lg:hidden">
            <Link href="/reg" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#C79A4B_0%,#B4853C_100%)] text-[#111111] shadow-[0_18px_40px_rgba(199,154,75,0.24)]">
                <Building2 size={24} />
              </span>

              <div className="text-left">
                <p className="font-semibold leading-none text-white">
                  Checkmate REG
                </p>
                <p className="mt-1 text-xs font-medium text-white/58">
                  Admin Access
                </p>
              </div>
            </Link>
          </div>

          <section className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-white p-7 shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#EBCA84]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-[#C79A4B]/14 blur-3xl" />

            <div className="relative z-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#111111] text-white shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
                <LockKeyhole size={28} />
              </div>

              <h1 className="mt-6 text-center text-3xl font-semibold tracking-[-0.03em] text-[#171614]">
                Admin Login
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-6 text-[#68635B]">
                Enter your credentials to access the Checkmate REG admin
                dashboard.
              </p>

              {error === "invalid" ? (
                <div
                  role="alert"
                  className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700"
                >
                  Invalid email or password.
                </div>
              ) : null}

              {error === "config" ? (
                <div
                  role="alert"
                  className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-700"
                >
                  Admin environment variables are missing or invalid. Check
                  ADMIN_SESSION_SECRET and related settings.
                </div>
              ) : null}

              <form action={loginAdminAction} className="mt-7 space-y-5">
                <label className="block">
                  <span className="text-sm font-semibold text-[#171614]">
                    Email
                  </span>

                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="admin@checkmatereg.com"
                    className="mt-2 h-12 w-full rounded-2xl border border-black/8 bg-[#F8F6F1] px-4 text-sm font-medium text-[#171614] outline-none transition placeholder:text-[#68635B]/70 focus:border-[#C79A4B] focus:bg-white focus:ring-4 focus:ring-[#C79A4B]/15"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#171614]">
                    Password
                  </span>

                  <input
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="mt-2 h-12 w-full rounded-2xl border border-black/8 bg-[#F8F6F1] px-4 text-sm font-medium text-[#171614] outline-none transition placeholder:text-[#68635B]/70 focus:border-[#C79A4B] focus:bg-white focus:ring-4 focus:ring-[#C79A4B]/15"
                  />
                </label>

                <button
                  type="submit"
                  className="group relative mt-2 flex min-h-12 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#111111] px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(0,0,0,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C79A4B]"
                >
                  <span className="absolute inset-0 bg-[linear-gradient(135deg,#C79A4B_0%,#B4853C_100%)] opacity-0 transition group-hover:opacity-100" />
                  <span className="relative z-10 group-hover:text-[#111111]">
                    Sign In
                  </span>
                </button>
              </form>

              <Link
                href="/reg"
                className="mt-6 flex items-center justify-center gap-2 text-center text-sm font-semibold text-[#171614] transition hover:text-[#C79A4B]"
              >
                <ArrowLeft size={16} />
                Back to public website
              </Link>
            </div>
          </section>

          <p className="mt-5 text-center text-xs font-medium leading-5 text-white/48">
            © Checkmate REG. Secure administrative access.
          </p>
        </div>
      </section>
    </main>
  );
}
