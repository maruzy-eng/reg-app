import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f4ef] px-5">
      <div className="max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-[#2680d8]">
          <Home size={30} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-950">
          Page not found
        </h1>

        <p className="mt-3 text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-2xl bg-[#2680d8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f5fa8]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}