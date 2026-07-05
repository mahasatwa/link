import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const auth = await getAuth();
  if (auth) redirect("/admin");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 px-4">
      <div className="text-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <svg
            className="h-16 w-16 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
          Link STIE Dwimulya
        </h1>
        <p className="mb-8 max-w-md text-lg text-white/80">
          Platform tautan dokumen repository STIE Dwimulya. Silakan hubungi
          administrator untuk mendapatkan akses.
        </p>
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-primary-700 shadow-lg transition-all hover:bg-gray-100"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Masuk Admin
        </Link>
      </div>
      <p className="mt-12 text-sm text-white/50">
        &copy; {new Date().getFullYear()} STIE Dwimulya
      </p>
    </div>
  );
}
