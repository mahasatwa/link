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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tautan Baru</h1>
        <p className="mt-1 text-sm text-gray-500">
          Buat tautan pendek baru untuk dokumen
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Judul *
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
            <label
              htmlFor="slug"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Slug *
            </label>
            <div className="flex items-center rounded-lg border border-gray-300 bg-white focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
              <span className="border-r border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500">
                /
              </span>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                className="flex-1 border-0 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-400"
                placeholder="sk-akreditasi-akuntansi"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Huruf kecil, angka, dan tanda hubung saja
            </p>
          </div>

          <div>
            <label
              htmlFor="target_url"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              URL Tujuan *
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
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Kategori *
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

          <div className="flex items-center gap-3 border-t border-gray-200 pt-5">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Menyimpan..." : "Simpan Tautan"}
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
