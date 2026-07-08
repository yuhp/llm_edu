#!/bin/zsh
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DIST_DIR="$SCRIPT_DIR/dist"
PORT="4173"

if [ ! -d "$DIST_DIR" ]; then
  echo "dist 目录不存在，请先执行 npm run build"
  exit 1
fi

open "http://127.0.0.1:$PORT"
python3 -m http.server "$PORT" --directory "$DIST_DIR"
