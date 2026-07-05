// Dynamic imports: better-sqlite3 is a native module unavailable on Vercel serverless;
// @vercel/postgres is only functional with a real PG connection.
import type { Link, SeedLink } from "./db-pg";

type Adapter = typeof import("./db-pg");

const isPg = process.env.DATABASE_URL?.startsWith("postgres") || !!process.env.VERCEL;

let cached: Adapter | null = null;

async function adapter(): Promise<Adapter> {
  if (!cached) {
    // Dynamic import required: one of these modules is platform-specific
    cached = isPg
      ? await import("./db-pg")
      : await import("./db-sqlite");
  }
  return cached;
}

export type { Link, SeedLink };

export async function ensureTable() {
  (await adapter()).ensureTable();
}

export async function getAllLinks() {
  return (await adapter()).getAllLinks();
}

export async function getLinkBySlug(slug: string) {
  return (await adapter()).getLinkBySlug(slug);
}

export async function getLinkById(id: number) {
  return (await adapter()).getLinkById(id);
}

export async function createLink(data: {
  slug: string;
  target_url: string;
  title: string;
  category: string;
}) {
  return (await adapter()).createLink(data);
}

export async function updateLink(
  id: number,
  data: { slug: string; target_url: string; title: string; category: string }
) {
  return (await adapter()).updateLink(id, data);
}

export async function deleteLink(id: number) {
  return (await adapter()).deleteLink(id);
}

export async function incrementClicks(id: number) {
  return (await adapter()).incrementClicks(id);
}

export async function searchLinks(query: string) {
  return (await adapter()).searchLinks(query);
}

export async function countLinks() {
  return (await adapter()).countLinks();
}

export async function countByCategory() {
  return (await adapter()).countByCategory();
}
