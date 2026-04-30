#!/usr/bin/env bash
set -euo pipefail

cp .open-next/worker.js .open-next/_worker.js
cp .open-next/assets/index.html .open-next/index.html

cat > .open-next/_routes.json <<'JSON'
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/_next/static/*", "/favicon.ico"]
}
JSON

echo "Prepared Cloudflare Pages output (_worker.js + _routes.json + root index.html)."
