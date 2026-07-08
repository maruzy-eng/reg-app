import Link from "next/link";
import { Building2 } from "lucide-react";

export default function PropertyNotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center property-grid-bg px-5">
      <div className="max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-[#2680d8]">
          <Building2 size={30} />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-950">
          Property not found
        </h1>

        <p className="mt-3 text-gray-500">
          The property you are looking for does not exist, is not public, or has
          been removed from the portal.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-2xl bg-[#2680d8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0f5fa8]"
        >
          Back to Projects
        </Link>
      </div>
    </main>
  );
}