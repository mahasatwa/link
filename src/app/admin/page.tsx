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
  const links = await getAllLinks();
  const total = links.length;
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Kelola tautan dokumen repository STIE Dwimulya
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-sm font-medium text-gray-500">Total Tautan</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{total}</p>
        </div>
        <div className="card">
          <p className="text-sm font-medium text-gray-500">Total Klik</p>
          <p className="mt-1 text-3xl font-bold text-primary-600">
            {totalClicks.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="card">
          <p className="text-sm font-medium text-gray-500">Kategori</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">
            {Object.keys(CATEGORY_LABELS).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Semua Tautan ({total})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500">Judul</th>
                <th className="px-6 py-3 font-medium text-gray-500">Slug</th>
                <th className="px-6 py-3 font-medium text-gray-500">Kategori</th>
                <th className="px-6 py-3 text-right font-medium text-gray-500">
                  Klik
                </th>
                <th className="px-6 py-3 text-right font-medium text-gray-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {links.map((link) => (
                <tr key={link.id} className="hover:bg-gray-50">
                  <td className="max-w-xs truncate px-6 py-3 font-medium text-gray-900">
                    {link.title}
                  </td>
                  <td className="px-6 py-3">
                    <code className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                      /{link.slug}
                    </code>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[link.category] || CATEGORY_COLORS.lainnya}`}
                    >
                      {CATEGORY_LABELS[link.category] || link.category}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right tabular-nums text-gray-600">
                    {link.clicks.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <LinkComponent
                        href={`/${link.slug}`}
                        target="_blank"
                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        title="Lihat"
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
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </LinkComponent>
                      <LinkComponent
                        href={`/admin/link/${link.id}/edit`}
                        className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-primary-600"
                        title="Edit"
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </LinkComponent>
                      <DeleteButton linkId={link.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {links.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    Belum ada tautan.{" "}
                    <LinkComponent
                      href="/admin/link/new"
                      className="text-primary-600 hover:underline"
                    >
                      Buat tautan baru
                    </LinkComponent>
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
