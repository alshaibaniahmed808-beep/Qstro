#!/usr/bin/env bash
set -euo pipefail

npm run pages:build

[ -f .open-next/_worker.js ] || { echo "Missing .open-next/_worker.js"; exit 1; }
[ -f .open-next/worker.js ] || { echo "Missing .open-next/worker.js"; exit 1; }
[ -f .open-next/assets/index.html ] || { echo "Missing .open-next/assets/index.html"; exit 1; }
[ -f .open-next/index.html ] || { echo "Missing .open-next/index.html"; exit 1; }
[ -f .open-next/_routes.json ] || { echo "Missing .open-next/_routes.json"; exit 1; }

echo "Cloudflare Pages build artifacts look good."
