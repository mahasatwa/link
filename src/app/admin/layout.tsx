import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 text-white hidden lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-navy-700">
            <Image
              src="/logo-brand.svg"
              alt="STIE Dwimulya"
              width={40}
              height={40}
              className="brightness-0 invert"
            />
            <div>
              <div className="font-semibold text-white">Link Admin</div>
              <div className="text-xs text-navy-300">STIE Dwimulya</div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-navy-200 hover:bg-navy-800 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/admin/link/new"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-navy-200 hover:bg-navy-800 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Tautan Baru
            </Link>
          </nav>
          
          {/* Footer */}
          <div className="border-t border-navy-700 p-4">
            <LogoutButton />
          </div>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/logo-brand.svg"
              alt="STIE Dwimulya"
              width={32}
              height={32}
            />
            <span className="font-semibold text-navy-900">Link Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/admin/link/new" className="btn-primary text-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:pl-64">
        <main className="container-admin">{children}</main>
      </div>
    </div>
  );
}

