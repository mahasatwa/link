import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ADMIN_USER: process.env.ADMIN_USER ? "SET" : "MISSING",
    ADMIN_PASS_HASH: process.env.ADMIN_PASS_HASH ? "SET" : "MISSING",
    JWT_SECRET: process.env.JWT_SECRET ? "SET" : "MISSING",
    POSTGRES_URL: process.env.POSTGRES_URL ? "SET" : "MISSING",
    DATABASE_URL: process.env.DATABASE_URL ? "SET" : "MISSING",
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
  });
}
