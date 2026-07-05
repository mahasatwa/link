import { getAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const auth = await getAuth();
  if (auth) redirect("/admin");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-brand.svg"
                alt="STIE Dwimulya"
                width={40}
                height={40}
              />
              <span className="text-lg font-bold text-navy-900">Link</span>
            </div>
            <Link href="/admin/login" className="btn-secondary text-sm">
              Masuk Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 inline-flex items-center justify-center rounded-2xl bg-navy-100 p-6">
            <Image
              src="/logo-brand.svg"
              alt="STIE Dwimulya"
              width={80}
              height={80}
            />
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-navy-900 sm:text-5xl">
            Link STIE Dwimulya
          </h1>
          
          <p className="mb-4 text-xl text-gray-600">
            Kampus Rakyat, Kampus Perubahan
          </p>
          
          <p className="mb-10 max-w-lg mx-auto text-gray-500 leading-relaxed">
            Platform tautan dokumen repository STIE Dwimulya untuk mengelola 
            akses dokumen akademik secara terpusat dan terukur.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admin/login"
              className="btn-primary"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
+              </svg>
              Masuk Admin
            </Link>
            <span className="text-sm text-gray-400">atau hubungi administrator</span>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="border-t border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-navy-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-900 mb-1">Tautan Pendek</h3>
              <p className="text-sm text-gray-500">URL pendek dengan slug kustom untuk setiap dokumen</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-gold-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-900 mb-1">Kategorisasi</h3>
              <p className="text-sm text-gray-500">Organisasi dokumen berdasarkan kategori institusi</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-navy-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.591" />
                </svg>
              </div>
              <h3 className="font-semibold text-navy-900 mb-1">Statistik Klik</h3>
              <p className="text-sm text-gray-500">Pantau penggunaan tautan setiap dokumen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} STIE Dwimulya. Hak Cipta Dilindungi.
            </p>
            <p className="text-sm text-gray-400">
              Kampus Rakyat, Kampus Perubahan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
