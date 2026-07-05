"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "akreditasi", label: "Akreditasi" },
  { value: "ami", label: "AMI" },
  { value: "rtm", label: "RTM" },
  { value: "rekonsiliasi", label: "Rekonsiliasi" },
  { value: "penelitian", label: "Penelitian" },
  { value: "lulusan", label: "Lulusan" },
  { value: "spmi", label: "SPMI" },
  { value: "lainnya", label: "Lainnya" },
];

export default function NewLinkPage() {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("lainnya");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, target_url: targetUrl, title, category }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Gagal menyimpan tautan");
      }
    } catch {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="page-header">
        <h1 className="page-title">Tautan Baru</h1>
        <p className="page-subtitle">
          Buat tautan pendek baru untuk dokumen
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-100 p-4 text-sm text-red-700 flex items-center gap-3">
              <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="input-label">
              Judul <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slug) setSlug(generateSlug(e.target.value));
              }}
              className="input-field"
              placeholder="Contoh: SK Akreditasi Akuntansi"
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="input-label">
              Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center rounded-lg border border-gray-200 bg-white focus-within:border-navy-500 focus-within:ring-2 focus-within:ring-navy-500/20 transition-all">
              <span className="border-r border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-400 font-medium">
                /
              </span>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                className="flex-1 border-0 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-400"
                placeholder="sk-akreditasi-akuntansi"
                required
              />
            </div>
            <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              Huruf kecil, angka, dan tanda hubung saja
            </p>
          </div>

          <div>
            <label htmlFor="target_url" className="input-label">
              URL Tujuan <span className="text-red-500">*</span>
            </label>
            <input
              id="target_url"
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="input-field"
              placeholder="https://drive.google.com/..."
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="input-label">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                "Simpan Tautan"
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
