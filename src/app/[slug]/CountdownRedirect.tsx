"use client";

import { useEffect, useState } from "react";

interface Props {
  targetUrl: string;
  title: string;
  slug: string;
}

export default function CountdownRedirect({ targetUrl, title, slug }: Props) {
  const [countdown, setCountdown] = useState(3);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setRedirecting(true);
      // Use replace to avoid adding to history stack (reduces throttling)
      if (typeof window !== "undefined") {
        window.location.replace(targetUrl);
      }
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, targetUrl]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-primary-100 p-4">
          <svg
            className="h-10 w-10 text-primary-600"
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

        <h1 className="mb-2 text-lg font-semibold text-gray-900">{title}</h1>
        <p className="mb-1 text-sm text-gray-500">Tautan: /{slug}</p>

        {/* Countdown circle */}
        <div className="my-8 flex items-center justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <svg className="absolute h-24 w-24 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="6"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45 * (countdown / 3)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <span className="text-3xl font-bold text-primary-600">
              {countdown}
            </span>
          </div>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          {redirecting
            ? "Mengalihkan ke tujuan..."
            : `Mengalihkan dalam ${countdown} detik ke:`}
        </p>

        {!redirecting && (
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs text-gray-400">URL Tujuan:</p>
            <a
              href={targetUrl}
              className="break-all text-sm text-primary-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {targetUrl}
            </a>
            <p className="mt-3">
              <a
                href={targetUrl}
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                Buka Sekarang
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
              </a>
            </p>
          </div>
        )}

        <p className="mt-8 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} STIE Dwimulya
        </p>
      </div>
    </div>
  );
}
