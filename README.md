# Daniel's Nightly Quotes

A sleek, time-aware quote website where Daniel's nightly quotes live.

## Features
- **Tonight's quote** — displayed front and center
- **Archive** — all previous nights' quotes in reverse order
- **Add quote** — simple form to add each night's new quote
- **Time-aware theme** — orange/yellow liquid glass from 5am–6pm, purple/blue at night
- **Deployable to Vercel** in one command

---

## Deploy to Vercel

### One-click (recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo
3. Click **Deploy** — no config needed, `vercel.json` handles routing

### Via CLI
```bash
npm install -g vercel
vercel
```

---

## Adding Quotes

### Via the website
Click **"+ Add tonight's quote"** at the bottom of the page, type the quote, optionally give it a night label ("Sunday Night"), and hit **Send it out**.

### Via API
```bash
curl -X POST https://your-site.vercel.app/api/quotes \
  -H "Content-Type: application/json" \
  -d '{"text": "Your quote here.", "night": "Sunday Night"}'
```

---

## Persistent Storage (for production)

The default setup stores quotes **in memory** — they reset on each deploy.

For permanent storage, swap the `quotes` array in `api/quotes.js` with:
- **[Vercel KV](https://vercel.com/docs/storage/vercel-kv)** (Redis, built into Vercel — easiest)
- **[PlanetScale](https://planetscale.com)** (MySQL, free tier)
- **[Supabase](https://supabase.com)** (Postgres, free tier)

The Vercel KV swap takes ~20 lines of code — happy to help with that.

---

## Local development
```bash
npm install
npm run dev
# open http://localhost:3000
```
