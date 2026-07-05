import path from "path";
import fs from "fs";

const SEED_PATH = path.resolve(__dirname, "../seed-links.json");

if (!fs.existsSync(SEED_PATH)) {
  console.error(`Seed file not found: ${SEED_PATH}`);
  process.exit(1);
}

const seedData = JSON.parse(fs.readFileSync(SEED_PATH, "utf-8")) as {
  slug: string;
  target_url: string;
  title: string;
  category: string;
}[];

const isPg = process.env.DATABASE_URL?.startsWith("postgres");

async function seedPg() {
  const { Client } = await import("pg");
  const c = new Client({ connectionString: process.env.POSTGRES_URL });
  await c.connect();

  // Ensure table
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

  let count = 0;
  for (const link of seedData) {
    const result = await c.query(
      "INSERT INTO links (slug, target_url, title, category) VALUES ($1, $2, $3, $4) ON CONFLICT (slug) DO NOTHING RETURNING id",
      [link.slug, link.target_url, link.title, link.category]
    );
    if (result.rowCount && result.rowCount > 0) count++;
  }

  const { rows: totalRows } = await c.query<{ count: number }>("SELECT COUNT(*)::int as count FROM links");
  console.log(`✅ Seeded ${count} new links (${totalRows[0].count} total in database)`);
  await c.end();
}

async function seedSqlite() {
  const Database = (await import("better-sqlite3")).default;
  const dbPath = process.env.DATABASE_URL || "./data/link.db";

  const dbDir = path.dirname(path.resolve(dbPath));
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const db = new Database(path.resolve(dbPath));
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      target_url TEXT NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'lainnya',
      clicks INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT (datetime('now')),
      updated_at DATETIME NOT NULL DEFAULT (datetime('now'))
    );
  `);
  db.exec("CREATE INDEX IF NOT EXISTS idx_links_slug ON links(slug)");
  db.exec("CREATE INDEX IF NOT EXISTS idx_links_category ON links(category)");

  const insert = db.prepare(
    "INSERT OR IGNORE INTO links (slug, target_url, title, category) VALUES (?, ?, ?, ?)"
  );

  let count = 0;
  const insertMany = db.transaction((links: typeof seedData) => {
    for (const link of links) {
      const result = insert.run(link.slug, link.target_url, link.title, link.category);
      if (result.changes > 0) count++;
    }
  });

  insertMany(seedData);
  const total = db.prepare("SELECT COUNT(*) as count FROM links").get() as { count: number };

  console.log(`✅ Seeded ${count} new links (${total.count} total in database)`);
  db.close();
}

const main = isPg ? seedPg : seedSqlite;
main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
