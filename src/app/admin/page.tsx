export const dynamic = "force-dynamic";

import { getAllLinks, type Link } from "@/lib/db";
import LinkComponent from "next/link";
import DeleteButton from "@/components/DeleteButton";

const CATEGORY_LABELS: Record<string, string> = {
  akreditasi: "Akreditasi",
  ami: "AMI",
  rtm: "RTM",
  rekonsiliasi: "Rekonsiliasi",
  penelitian: "Penelitian",
  lulusan: "Lulusan",
  spmi: "SPMI",
  lainnya: "Lainnya",
};

const CATEGORY_COLORS: Record<string, string> = {
  akreditasi: "bg-blue-100 text-blue-800",
  ami: "bg-green-100 text-green-800",
  rtm: "bg-purple-100 text-purple-800",
  rekonsiliasi: "bg-orange-100 text-orange-800",
  penelitian: "bg-cyan-100 text-cyan-800",
  lulusan: "bg-pink-100 text-pink-800",
  spmi: "bg-yellow-100 text-yellow-800",
  lainnya: "bg-gray-100 text-gray-800",
};

export default async function AdminPage() {
  const links: Link[] = await getAllLinks();
  const total = links.length;
  const totalClicks = links.reduce((sum: number, l: Link) => sum + l.clicks, 0);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Kelola tautan dokumen repository STIE Dwimulya
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-navy-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <div>
              <p className="stat-label">Total Tautan</p>
              <p className="stat-value">{total}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gold-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.591" />
              </svg>
            </div>
            <div>
              <p className="stat-label">Total Klik</p>
              <p className="stat-value text-gold-600">
                {totalClicks.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-navy-100 flex items-center justify-center">
              <svg className="h-5 w-5 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
            </div>
            <div>
              <p className="stat-label">Kategori</p>
              <p className="stat-value">{Object.keys(CATEGORY_LABELS).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-navy-900">
            Semua Tautan
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Slug</th>
                <th>Kategori</th>
                <th className="text-right">Klik</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {links.map((link) => (
                <tr key={link.id}>
                  <td className="max-w-xs truncate font-medium text-navy-900">
                    {link.title}
                  </td>
                  <td>
                    <code className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      /{link.slug}
                    </code>
                  </td>
                  <td>
                    <span
                      className={`badge ${CATEGORY_COLORS[link.category] || CATEGORY_COLORS.lainnya}`}
                    >
                      {CATEGORY_LABELS[link.category] || link.category}
                    </span>
                  </td>
                  <td className="text-right tabular-nums text-gray-600">
                    {link.clicks.toLocaleString("id-ID")}
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <LinkComponent
                        href={`/${link.slug}`}
                        target="_blank"
                        className="btn-ghost p-2"
                        title="Lihat"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </LinkComponent>
                      <LinkComponent
                        href={`/admin/link/${link.id}/edit`}
                        className="btn-ghost p-2"
                        title="Edit"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </LinkComponent>
                      <DeleteButton linkId={link.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {links.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Belum ada tautan</p>
                        <p className="text-sm text-gray-500 mt-1">
                          <LinkComponent href="/admin/link/new" className="text-navy-600 hover:underline">
                            Buat tautan baru
                          </LinkComponent>{" "}
                          untuk memulai
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
