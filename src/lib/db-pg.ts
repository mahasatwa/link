import { sql } from "@vercel/postgres";

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
  await sql`
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
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_links_slug ON links(slug)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_links_category ON links(category)`;
}

export async function getAllLinks(): Promise<Link[]> {
  const { rows } = await sql`SELECT * FROM links ORDER BY created_at DESC`;
  return rows as Link[];
}

export async function getLinkBySlug(slug: string): Promise<Link | null> {
  const { rows } = await sql`SELECT * FROM links WHERE slug = ${slug}`;
  return (rows[0] as Link) ?? null;
}

export async function getLinkById(id: number): Promise<Link | null> {
  const { rows } = await sql`SELECT * FROM links WHERE id = ${id}`;
  return (rows[0] as Link) ?? null;
}

export async function createLink(data: {
  slug: string;
  target_url: string;
  title: string;
  category: string;
}): Promise<Link> {
  const { rows } = await sql`
    INSERT INTO links (slug, target_url, title, category)
    VALUES (${data.slug}, ${data.target_url}, ${data.title}, ${data.category})
    RETURNING *
  `;
  return rows[0] as Link;
}

export async function updateLink(
  id: number,
  data: { slug: string; target_url: string; title: string; category: string }
): Promise<Link> {
  const { rows } = await sql`
    UPDATE links
    SET slug = ${data.slug}, target_url = ${data.target_url}, title = ${data.title},
        category = ${data.category}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Link;
}

export async function deleteLink(id: number): Promise<void> {
  await sql`DELETE FROM links WHERE id = ${id}`;
}

export async function incrementClicks(id: number): Promise<void> {
  await sql`UPDATE links SET clicks = clicks + 1 WHERE id = ${id}`;
}

export async function searchLinks(query: string): Promise<Link[]> {
  const pattern = `%${query}%`;
  const { rows } = await sql`
    SELECT * FROM links WHERE title ILIKE ${pattern} OR slug ILIKE ${pattern}
    ORDER BY created_at DESC
  `;
  return rows as Link[];
}

export async function countLinks(): Promise<number> {
  const { rows } = await sql`SELECT COUNT(*)::int as count FROM links`;
  return rows[0].count as number;
}

export async function countByCategory(): Promise<
  { category: string; count: number }[]
> {
  const { rows } = await sql`
    SELECT category, COUNT(*)::int as count FROM links GROUP BY category
  `;
  return rows as { category: string; count: number }[];
}
