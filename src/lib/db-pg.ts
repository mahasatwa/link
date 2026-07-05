import { Client } from "pg";

let client: Client | null = null;

async function getClient(): Promise<Client> {
  if (!client) {
    client = new Client({ connectionString: process.env.POSTGRES_URL });
    await client.connect();
  }
  return client;
}

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

export async function ensureTable() {
  const c = await getClient();
  await c.query(`
    CREATE TABLE IF NOT EXISTS links (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      target_url TEXT NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'lainnya',
      clicks INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await c.query("CREATE INDEX IF NOT EXISTS idx_links_slug ON links(slug)");
  await c.query("CREATE INDEX IF NOT EXISTS idx_links_category ON links(category)");
}

export async function getAllLinks(): Promise<Link[]> {
  const c = await getClient();
  const { rows } = await c.query<Link>("SELECT * FROM links ORDER BY created_at DESC");
  return rows;
}

export async function getLinkBySlug(slug: string): Promise<Link | null> {
  const c = await getClient();
  const { rows } = await c.query<Link>("SELECT * FROM links WHERE slug = $1", [slug]);
  return rows[0] ?? null;
}

export async function getLinkById(id: number): Promise<Link | null> {
  const c = await getClient();
  const { rows } = await c.query<Link>("SELECT * FROM links WHERE id = $1", [id]);
  return rows[0] ?? null;
}

export async function createLink(data: {
  slug: string;
  target_url: string;
  title: string;
  category: string;
}): Promise<Link> {
  const c = await getClient();
  const { rows } = await c.query<Link>(
    "INSERT INTO links (slug, target_url, title, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [data.slug, data.target_url, data.title, data.category]
  );
  return rows[0];
}

export async function updateLink(
  id: number,
  data: { slug: string; target_url: string; title: string; category: string }
): Promise<Link> {
  const c = await getClient();
  const { rows } = await c.query<Link>(
    "UPDATE links SET slug = $1, target_url = $2, title = $3, category = $4, updated_at = NOW() WHERE id = $5 RETURNING *",
    [data.slug, data.target_url, data.title, data.category, id]
  );
  return rows[0];
}

export async function deleteLink(id: number): Promise<void> {
  const c = await getClient();
  await c.query("DELETE FROM links WHERE id = $1", [id]);
}

export async function incrementClicks(id: number): Promise<void> {
  const c = await getClient();
  await c.query("UPDATE links SET clicks = clicks + 1 WHERE id = $1", [id]);
}

export async function searchLinks(query: string): Promise<Link[]> {
  const c = await getClient();
  const pattern = `%${query}%`;
  const { rows } = await c.query<Link>(
    "SELECT * FROM links WHERE title ILIKE $1 OR slug ILIKE $1 ORDER BY created_at DESC",
    [pattern]
  );
  return rows;
}

export async function countLinks(): Promise<number> {
  const c = await getClient();
  const { rows } = await c.query<{ count: number }>("SELECT COUNT(*)::int as count FROM links");
  return rows[0].count;
}

export async function countByCategory(): Promise<
  { category: string; count: number }[]
> {
  const c = await getClient();
  const { rows } = await c.query<{ category: string; count: number }>(
    "SELECT category, COUNT(*)::int as count FROM links GROUP BY category"
  );
  return rows;
}
