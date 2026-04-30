# Cloudflare Pages 404 Fix (QSTRO)

إذا ظهر لك على `https://qstro.pages.dev` الخطأ:

> HTTP ERROR 404 — لا يمكن العثور على الصفحة

فالمشكلة غالبًا من إعدادات مشروع Cloudflare Pages وليس من كود الواجهة.

## الإعدادات الصحيحة داخل Cloudflare Pages

في **Project Settings → Build & deployments** استخدم القيم التالية حرفيًا:

- **Framework preset:** `None`
- **Build command:** `npm run pages:build`
- **Build output directory:** `.open-next`
- **Root directory:** `/` (اتركه الجذر، لا تضع `app`)

## لماذا يحدث 404؟

OpenNext يولّد `worker.js`، بينما Cloudflare Pages يحتاج ملف `_worker.js` داخل مجلد الإخراج لكي تمر كل الطلبات عبر SSR worker.

لذلك سكربت البناء الحالي يقوم تلقائيًا بـ:

- نسخ `.open-next/worker.js` ➜ `.open-next/_worker.js`
- توليد `.open-next/_routes.json` لتوجيه كل المسارات إلى الـ Worker
- إنشاء `.open-next/index.html` كـ fallback للصفحة الرئيسية

## تحقق محلي قبل النشر

نفّذ:

```bash
npm run pages:verify
```

هذا الأمر يبني المشروع ويتحقق من وجود الملفات الضرورية:

- `.open-next/_worker.js`
- `.open-next/worker.js`
- `.open-next/assets/index.html`
- `.open-next/index.html`
- `.open-next/_routes.json`

## نشر يدوي (اختياري)

```bash
npx wrangler pages deploy .open-next --project-name qstro
```

## ملاحظات مهمة إذا استمر 404

1. تأكد أن آخر Deploy حالته **Success** (وليس Failed).
2. تأكد أن المشروع المرتبط فعلاً هو `qstro` وليس مشروع آخر.
3. امسح أي إعداد قديم لـ Build output (مثل `out` أو `.next`) ثم أعد النشر.
4. إذا غيرت الإعدادات، اعمل **Retry deployment** أو **Create new deployment**.
