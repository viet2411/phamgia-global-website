#!/usr/bin/env bash
# Đẩy NỘI DUNG thư mục public/ lên nhánh `site` (index.html nằm ngay gốc nhánh).
# OneSite (iNET) chỉ lấy file tĩnh ở gốc nhánh, không chạy build, không chọn được thư mục con,
# nên nhánh `site` là bản web đã build sẵn. Không sửa tay nhánh `site`: mỗi lần chạy sẽ ghi đè.
#
# Chạy ở thư mục gốc repo, sau khi đã build:  bash .github/scripts/publish-site.sh
set -euo pipefail

BRANCH=site
SRC="$(pwd)/public"
SHA="$(git rev-parse --short HEAD)"
[ -f "$SRC/index.html" ] || { echo "Không thấy public/index.html – chạy python _build/build.py trước"; exit 1; }

DIR="$(mktemp -d)"
trap 'git worktree remove --force "$DIR" >/dev/null 2>&1 || true' EXIT
git worktree add --detach "$DIR" >/dev/null

cd "$DIR"
if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null; then
  git fetch -q origin "$BRANCH"
  git checkout -q -B "$BRANCH" "origin/$BRANCH"
else
  git checkout -q --orphan "$BRANCH"
fi
git rm -rfq --ignore-unmatch .
cp -a "$SRC/." .
git add -A

if git diff --cached --quiet; then
  echo "Nhánh $BRANCH đã khớp public/ – không có gì thay đổi"
  exit 0
fi
git commit -q -m "Cập nhật web từ main@$SHA"
git push -q origin "$BRANCH"
echo "Đã cập nhật nhánh $BRANCH từ main@$SHA"
