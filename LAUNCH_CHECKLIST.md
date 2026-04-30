# QSTRO Final Launch Checklist

## 1) Supabase Setup
- [ ] Run `supabase/schema.sql` in Supabase SQL editor.
- [ ] Create storage buckets: `car-images`, `payment-proofs`.
- [ ] Enable Email/Password auth.
- [ ] Add Site URL and redirect URL for production domain.

## 2) Environment Variables
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL`.
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [ ] Add the same variables in Cloudflare Pages settings.

## 3) Admin Bootstrap
- [ ] Register first account using app signup.
- [ ] Promote this account role to `admin` in `public.users`.
- [ ] Verify admin can approve cars/payments and update user roles.

## 4) Core QA Flows
- [ ] User signup/login/logout.
- [ ] Seller creates listing with multiple images.
- [ ] Admin approves listing and listing appears on homepage.
- [ ] Buyer opens listing and sends chat message.
- [ ] Realtime message appears for both participants.
- [ ] Dealer uploads payment proof and admin approves it.

## 5) Cloudflare Deployment
- [ ] Build command: `npm run pages:build`.
- [ ] Output directory: `.open-next`.
- [ ] Deploy using `npx wrangler pages deploy .open-next --project-name qstro`.

## 6) Post-Launch Monitoring
- [ ] Check Supabase Auth logs and DB errors daily.
- [ ] Monitor failed storage uploads.
- [ ] Keep weekly backup/export of core tables.

## 7) Final Pre-Deploy Verification (2026-04-30)
- [x] `npm run pages:build` completed successfully.
- [x] Verified `.open-next/_worker.js` exists after build.
- [x] Verified `.open-next/worker.js` exists after build.
- [x] Verified `wrangler.toml` contains `name`, `compatibility_date`, and `pages_build_output_dir`.
- [ ] Deploy from Cloudflare Pages dashboard (Production) and validate live domain.
