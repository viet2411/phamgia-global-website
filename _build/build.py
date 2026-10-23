"""Ghép các trang HTML của website từ phần dùng chung.

Cách dùng (chạy ở thư mục gốc repo):
    python _build/build.py

- _build/partials/  : phần dùng chung (head, header + menu, footer, popup báo giá, icon...)
- _build/pages/     : nội dung riêng từng trang; khối <!-- ... --> ở đầu file là thông tin trang
- _build/credits.json : nguồn ảnh minh họa, in ra footer
- Kết quả ghi vào public/ (index.html, gioi-thieu.html, ..., 404.html, sitemap.xml, robots.txt).
  public/ là thư mục được đăng lên hosting; style.css, script.js, assets/ cũng nằm ở đó.

Không sửa trực tiếp các file .html, sitemap.xml, robots.txt trong public/: lần build sau sẽ ghi đè.

Thông tin trang (trong khối <!-- ... -->):
    title, desc, nav   bắt buộc
    url                đường dẫn trang (để trống với trang chủ)
    schema: yes        chèn dữ liệu có cấu trúc Organization
    noindex: yes       không cho Google lập chỉ mục, không đưa vào sitemap
    absolute: yes      đổi đường dẫn tương đối thành tuyệt đối (/style.css...), dùng cho 404.html
"""
import json
import re
import sys
from html import escape
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

# Tên miền chính thức, không có dấu / ở cuối. Đổi tên miền: sửa dòng này rồi build lại.
SITE = "https://phamgiaglobal.com.vn"

BUILD = Path(__file__).resolve().parent
ROOT = BUILD.parent
OUT = ROOT / "public"
PARTIALS = BUILD / "partials"
PAGES = BUILD / "pages"


def partial(name):
    return (PARTIALS / f"{name}.html").read_text(encoding="utf-8")


def parse_page(path):
    text = path.read_text(encoding="utf-8")
    m = re.match(r"\s*<!--(.*?)-->\s*", text, re.S)
    if not m:
        raise SystemExit(f"{path.name}: thiếu khối thông tin trang <!-- ... --> ở đầu file")
    meta = {}
    for line in m.group(1).strip().splitlines():
        key, _, value = line.partition(":")
        meta[key.strip()] = value.strip()
    for key in ("title", "desc", "nav"):
        if not meta.get(key):
            raise SystemExit(f"{path.name}: thiếu '{key}'")
    return meta, text[m.end():]


def credits_list():
    """Danh sách nguồn ảnh cho footer, đọc từ _build/credits.json."""
    path = BUILD / "credits.json"
    if not path.exists():
        return ""
    items = json.loads(path.read_text(encoding="utf-8"))
    return "\n".join(
        f'      <li><a href="{escape(c["page"])}" rel="noopener">{escape(c["title"])}</a> – '
        f'{escape(c["creator"])}, {escape(c["license"])}</li>'
        for c in items
    )


def absolute_paths(html):
    """Đường dẫn tương đối -> tuyệt đối, để trang 404 hiển thị đúng ở mọi địa chỉ (vd. /a/b/c)."""
    html = re.sub(r'\b(href|src|action)="(?![a-z]+:|#|/)', r'\1="/', html)
    return re.sub(r"url\('(?![a-z]+:|/)", "url('/", html)


def build_page(path):
    meta, body = parse_page(path)
    for key in ("BOQ", "PROCESS", "CTA"):
        body = body.replace(f"%%{key}%%", partial(key.lower()).strip())

    head = (partial("head")
            .replace("%%TITLE%%", meta["title"])
            .replace("%%DESC%%", meta["desc"])
            .replace("%%URL%%", meta.get("url", ""))
            .replace("%%NAV%%", meta["nav"])
            .replace("%%HEAD_EXTRA%%", partial("schema") if meta.get("schema") == "yes" else ""))
    if meta.get("noindex") == "yes":
        head = re.sub(r'\s*<link rel="canonical"[^>]*>|\s*<meta property="og:url"[^>]*>', "", head)
        head = head.replace("<title>", '<meta name="robots" content="noindex">\n  <title>', 1)
    header = partial("header").replace(f'data-nav="{meta["nav"]}"', f'data-nav="{meta["nav"]}" aria-current="page"')

    html = "".join([
        head.replace('<html lang="vi">', '<html lang="vi">\n<!-- File được tạo tự động bởi _build/build.py. Sửa nội dung trong _build/ rồi chạy lại build. -->', 1),
        partial("sprite"), "\n",
        header, "\n",
        body.strip(), "\n\n",
        partial("footer").replace("%%CREDITS%%", credits_list()),
        partial("modal"),
        '<script src="script.js"></script>\n</body>\n</html>\n',
    ]).replace("%%SITE%%", SITE)
    if meta.get("absolute") == "yes":
        html = absolute_paths(html)
    left = re.findall(r"%%[A-Z_]+%%", html)
    if left:
        raise SystemExit(f"{path.name}: còn placeholder chưa thay {left}")
    (OUT / path.name).write_text(html, encoding="utf-8", newline="\n")
    return meta


def write_sitemap(metas):
    urls = "".join(
        f"  <url><loc>{SITE}/{escape(m.get('url', ''))}</loc></url>\n"
        for m in sorted(metas, key=lambda m: m.get("url", ""))
        if m.get("noindex") != "yes"
    )
    (OUT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{urls}</urlset>\n", encoding="utf-8", newline="\n")
    (OUT / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8", newline="\n")


if __name__ == "__main__":
    pages = sorted(PAGES.glob("*.html"))
    # Xóa trang .html cũ trong public/ không còn file nguồn tương ứng
    for old in OUT.glob("*.html"):
        if not (PAGES / old.name).exists():
            old.unlink()
    metas = [build_page(p) for p in pages]
    write_sitemap(metas)
    print("Đã tạo:", ", ".join(p.name for p in pages), "+ sitemap.xml, robots.txt")
