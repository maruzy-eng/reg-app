import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F6F1] px-5">
      <div className="max-w-lg rounded-[1.5rem] border border-black/8 bg-white p-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C79A4B]">
          Checkmate REG
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#171614]">
          Page not found
        </h1>

        <p className="mt-3 text-[#68635B]">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/reg"
          className="mt-6 inline-flex rounded-full bg-[linear-gradient(135deg,#C79A4B_0%,#B4853C_100%)] px-5 py-3 text-sm font-semibold text-[#111111] transition hover:-translate-y-0.5"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
