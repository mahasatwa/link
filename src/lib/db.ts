// Platform-specific adapter: better-sqlite3 is a native C addon unavailable on
// Vercel serverless; pg only works with a real Postgres connection.
// Dynamic import is required here because the module choice depends on the
// runtime environment (DATABASE_URL prefix / VERCEL env var).
import type { Link, SeedLink } from "./db-pg";

const isPg = process.env.DATABASE_URL?.startsWith("postgres") || !!process.env.VERCEL;

type DbModule = {
  ensureTable(): Promise<void>;
  getAllLinks(): Promise<Link[]>;
  getLinkBySlug(slug: string): Promise<Link | null>;
  getLinkById(id: number): Promise<Link | null>;
  createLink(data: { slug: string; target_url: string; title: string; category: string }): Promise<Link>;
  updateLink(id: number, data: { slug: string; target_url: string; title: string; category: string }): Promise<Link>;
  deleteLink(id: number): Promise<void>;
  incrementClicks(id: number): Promise<void>;
  searchLinks(query: string): Promise<Link[]>;
  countLinks(): Promise<number>;
  countByCategory(): Promise<{ category: string; count: number }[]>;
};

let cached: DbModule | null = null;

async function getDb(): Promise<DbModule> {
  if (!cached) {
    cached = isPg
      ? await import("./db-pg")
      : await import("./db-sqlite");
  }
  return cached;
}

export type { Link, SeedLink };

export async function ensureTable(): Promise<void> {
  (await getDb()).ensureTable();
}

export async function getAllLinks(): Promise<Link[]> {
  return (await getDb()).getAllLinks();
}

export async function getLinkBySlug(slug: string): Promise<Link | null> {
  return (await getDb()).getLinkBySlug(slug);
}

export async function getLinkById(id: number): Promise<Link | null> {
  return (await getDb()).getLinkById(id);
}

export async function createLink(data: {
  slug: string;
  target_url: string;
  title: string;
  category: string;
}): Promise<Link> {
  return (await getDb()).createLink(data);
}

export async function updateLink(
  id: number,
  data: { slug: string; target_url: string; title: string; category: string }
): Promise<Link> {
  return (await getDb()).updateLink(id, data);
}

export async function deleteLink(id: number): Promise<void> {
  return (await getDb()).deleteLink(id);
}

export async function incrementClicks(id: number): Promise<void> {
  return (await getDb()).incrementClicks(id);
}

export async function searchLinks(query: string): Promise<Link[]> {
  return (await getDb()).searchLinks(query);
}

export async function countLinks(): Promise<number> {
  return (await getDb()).countLinks();
}

export async function countByCategory(): Promise<{ category: string; count: number }[]> {
  return (await getDb()).countByCategory();
}
