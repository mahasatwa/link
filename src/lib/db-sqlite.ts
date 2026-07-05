import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

export interface Link {
  id: number;
  slug: string;
  target_url: string;
  title: string;
  category: string;
  clicks: number;
  created_at: string;
  updated_at: string;
}

export interface SeedLink {
  slug: string;
  target_url: string;
  title: string;
  category: string;
}

const DB_PATH = process.env.DATABASE_URL || "./data/link.db";

// Ensure data directory exists
const dbDir = path.dirname(path.resolve(DB_PATH));
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(path.resolve(DB_PATH));
db.pragma("journal_mode = WAL");

// Prepared statements
const stmts = {
  getAll: db.prepare("SELECT * FROM links ORDER BY created_at DESC"),
  search: db.prepare(
    "SELECT * FROM links WHERE title LIKE ? OR slug LIKE ? ORDER BY created_at DESC"
  ),
  getBySlug: db.prepare("SELECT * FROM links WHERE slug = ?"),
  getById: db.prepare("SELECT * FROM links WHERE id = ?"),
  create: db.prepare(
    "INSERT INTO links (slug, target_url, title, category) VALUES (?, ?, ?, ?)"
  ),
  update: db.prepare(
    "UPDATE links SET slug = ?, target_url = ?, title = ?, category = ?, updated_at = datetime('now') WHERE id = ?"
  ),
  incrementClicks: db.prepare(
    "UPDATE links SET clicks = clicks + 1 WHERE id = ?"
  ),
  delete: db.prepare("DELETE FROM links WHERE id = ?"),
  count: db.prepare("SELECT COUNT(*) as count FROM links"),
  countByCategory: db.prepare(
    "SELECT category, COUNT(*) as count FROM links GROUP BY category"
  ),
};

export async function ensureTable(): Promise<void> {
  db.exec(`
    CREATE TABLE IF NOT EXISTS links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      target_url TEXT NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'lainnya',
      clicks INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_links_slug ON links(slug);
    CREATE INDEX IF NOT EXISTS idx_links_category ON links(category);
  `);
}

export async function getAllLinks(): Promise<Link[]> {
  return stmts.getAll.all() as Link[];
}

export async function getLinkBySlug(slug: string): Promise<Link | null> {
  return (stmts.getBySlug.get(slug) as Link | undefined) ?? null;
}

export async function getLinkById(id: number): Promise<Link | null> {
  return (stmts.getById.get(id) as Link | undefined) ?? null;
}

export async function createLink(data: {
  slug: string;
  target_url: string;
  title: string;
  category: string;
}): Promise<Link> {
  const result = stmts.create.run(data.slug, data.target_url, data.title, data.category);
  const link = stmts.getById.get(result.lastInsertRowid) as Link;
  return link;
}

export async function updateLink(
  id: number,
  data: { slug: string; target_url: string; title: string; category: string }
): Promise<Link> {
  stmts.update.run(data.slug, data.target_url, data.title, data.category, id);
  return stmts.getById.get(id) as Link;
}

export async function deleteLink(id: number): Promise<void> {
  stmts.delete.run(id);
}

export async function incrementClicks(id: number): Promise<void> {
  stmts.incrementClicks.run(id);
}

export async function searchLinks(query: string): Promise<Link[]> {
  const pattern = `%${query}%`;
  return stmts.search.all(pattern, pattern) as Link[];
}

export async function countLinks(): Promise<number> {
  const row = stmts.count.get() as { count: number };
  return row.count;
}

export async function countByCategory(): Promise<
  { category: string; count: number }[]
> {
  return stmts.countByCategory.all() as { category: string; count: number }[];
}
