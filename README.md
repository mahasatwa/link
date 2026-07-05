# Link STIE Dwimulya

Platform tautan pendek untuk repository dokumen STIE Dwimulya.

## Fitur

- 🔗 Tautan pendek dengan slug kustom
- ⏱️ Halaman publik dengan countdown 3 detik sebelum redirect
- 🔐 Panel admin dengan autentikasi JWT
- 📊 Dashboard dengan statistik klik
- 🏷️ Kategori: Akreditasi, AMI, RTM, Rekonsiliasi, Penelitian, Lulusan, SPMI, Lainnya
- 🌐 Responsive design

## Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your settings

# Seed database (84 links)
npm run seed

# Start development server
npm run dev
```

## Default Credentials

- Username: `admin`
- Password: `link-admin-2025`

## Commands

```bash
npm run dev       # Start dev server (port 3000)
npm run build     # Production build
npm run start     # Start production server
npm run seed      # Seed database from seed-links.json
```

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- SQLite (local dev) / PostgreSQL (production via Neon)
- JWT auth (jose)

## Deploy to Vercel

1. Create a free [Neon](https://neon.tech) database
2. Push this repo to GitHub/GitLab
3. Import the project in [Vercel](https://vercel.com)
4. Set environment variables in Vercel:
   ```
   DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
   JWT_SECRET=your-secure-random-string
   ADMIN_USER=admin
   ADMIN_PASS=your-secure-password
   ```
5. Vercel will auto-deploy on push
6. Run seed script: `vercel env pull .env.local && npm run seed`

### Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add `link.stiedwimulya.ac.id`
3. Configure DNS as shown in Vercel
