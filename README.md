# QSTRO — Car Marketplace for Libya

QSTRO is a production-ready MVP car marketplace built with **Next.js App Router**, **Tailwind CSS**, and **Supabase** (Auth, Database, Storage, Realtime), optimized for **Cloudflare Pages** deployment.

## Features

- Authentication (email/password) with role-based access (`user`, `dealer`, `admin`)
- Home page with search filters (city + price range)
- Featured cars and full listing catalog
- Car details with image gallery and internal chat entry point
- Sell car flow with multi-image upload to Supabase Storage
- Realtime messaging per car conversation
- Dealer dashboard (manage own cars, messages, subscription)
- Subscription plans with manual bank transfer proof upload
- Admin dashboard (approve cars, payments, manage users)
- Responsive mobile navbar with burger menu

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Backend/BaaS**: Supabase (Auth, Postgres, Storage, Realtime)
- **Language**: JavaScript
- **Deployment**: Cloudflare Pages (OpenNext adapter), Vercel-compatible Next.js codebase

## Project Structure

```text
qstro/
├── app/
│   ├── auth/
│   │   ├── callback/route.js
│   │   ├── login/page.js
│   │   └── register/page.js
│   ├── cars/
│   │   ├── [id]/
│   │   │   ├── ChatSellerButton.jsx
│   │   │   └── page.js
│   │   └── sell/SellCarForm.jsx
│   ├── dashboard/
│   │   ├── admin/page.js
│   │   └── dealer/page.js
│   ├── messages/
│   │   ├── [carId]/[userId]/page.js
│   │   └── page.js
│   ├── subscription/page.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   └── Input.jsx
│   ├── CarCard.jsx
│   ├── ChatWindow.jsx
│   ├── FeaturedCars.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── ImageGallery.jsx
│   └── SearchBar.jsx
├── hooks/
│   └── useAuth.js
├── lib/
│   ├── actions.js
│   ├── utils.js
│   └── supabase/
│       ├── client.js
│       ├── middleware.js
│       └── server.js
├── supabase/
│   └── schema.sql
├── public/
│   ├── logo.svg
│   └── index.html
├── middleware.js
├── next.config.mjs
├── open-next.config.ts
├── wrangler.toml
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── env.local.example
```

## Supabase Database Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run the script in `supabase/schema.sql`.
4. Create a storage bucket named `car-images` (public or signed URL strategy as preferred).
5. In Supabase Auth settings, enable email/password sign-in.

## Environment Variables

Copy and update envs:

```bash
cp env.local.example .env.local
```

Required values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Local Development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Cloudflare Pages Deployment (Recommended)

This repo is configured with OpenNext for Cloudflare.

### Build command

```bash
npm run pages:build
```

### Deploy with Wrangler

```bash
npx wrangler pages deploy .open-next --project-name qstro
```

### Cloudflare Pages UI Settings

- **Framework preset**: None / Custom
- **Build command**: `npm run pages:build`
- **Build output directory**: `.open-next`
- Add all Supabase environment variables in Pages project settings.

## Notes for Branding (Logo)

- Current logo file is `public/logo.svg` and used in the header.
- Replace it with your official brand asset while keeping the same filename for zero-code swap.

## Role Flow

- New users register as `user`.
- Admin can promote account to `dealer` / `admin` via database or admin panel controls.
- Dealer unlocks dashboard and subscription tools.

## MVP Scalability Recommendations

- Add pagination + indexed search (city, price, created_at).
- Add row-level rate limits for messages.
- Add moderation queue and audit logs.
- Add payment webhook once switching from manual transfer to gateway.
