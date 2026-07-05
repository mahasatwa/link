"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Gagal masuk");
      }
    } catch {
      setError("Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <Image
              src="/logo-brand.svg"
              alt="STIE Dwimulya"
              width={64}
              height={64}
              className="brightness-0 invert mb-8"
            />
            <h1 className="text-4xl font-bold mb-4">Link Admin</h1>
            <p className="text-xl text-navy-300">STIE Dwimulya</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gold-400/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Tautan Dokumen</div>
                <div className="text-sm text-navy-300">Kelola akses dokumen repository</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gold-400/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Statistik Klik</div>
                <div className="text-sm text-navy-300">Pantau penggunaan tautan</div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-navy-400">
            &copy; {new Date().getFullYear()} STIE Dwimulya. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
      
      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Image
              src="/logo-brand.svg"
              alt="STIE Dwimulya"
              width={48}
              height={48}
              className="mb-4"
            />
            <h1 className="text-2xl font-bold text-navy-900">Link Admin</h1>
            <p className="text-gray-500">STIE Dwimulya</p>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold text-navy-900 mb-1">
              Masuk ke Panel Admin
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Gunakan akun admin untuk mengakses sistem
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-100 p-4 text-sm text-red-700 flex items-center gap-3">
                  <svg className="h-5 w-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="username" className="input-label">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                  placeholder="Masukkan username"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="Masukkan password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>
          </div>
          
          <p className="mt-6 text-center text-xs text-gray-400">
            Kampus Rakyat, Kampus Perubahan
          </p>
        </div>
      </div>
    </div>
  );
}
