import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link STIE Dwimulya",
  description: "Platform tautan dokumen STIE Dwimulya",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
