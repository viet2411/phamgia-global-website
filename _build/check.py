"""Kiểm tra website trong public/ trước khi đăng (chạy sau build):
    python _build/check.py

- Link nội bộ (href, src, action, url(...)) trỏ tới file có thật
- Link có #mục trỏ tới id có thật trong trang đích
- Mỗi trang có title, description, đúng một thẻ h1; ảnh có alt
- Trang trong sitemap.xml tồn tại
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

sys.stdout.reconfigure(encoding="utf-8")

OUT = Path(__file__).resolve().parent.parent / "public"


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links, self.h1, self.title = set(), [], 0, False
        self.desc, self.no_alt = False, []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        for key in ("href", "src", "action"):
            if a.get(key):
                self.links.append(a[key])
        for u in re.findall(r"url\('([^']+)'\)", a.get("style") or ""):
            self.links.append(u)
        self.h1 += tag == "h1"
        self.title |= tag == "title"
        self.desc |= tag == "meta" and a.get("name") == "description" and bool(a.get("content"))
        if tag == "img" and "alt" not in a:
            self.no_alt.append(a.get("src"))


def main():
    pages = {}
    for f in sorted(OUT.glob("*.html")):
        p = Page()
        p.feed(f.read_text(encoding="utf-8"))
        pages[f.name] = p

    errors = []
    for name, p in pages.items():
        if not p.title or not p.desc:
            errors.append(f"{name}: thiếu title hoặc description")
        if p.h1 != 1:
            errors.append(f"{name}: có {p.h1} thẻ h1 (cần đúng 1)")
        errors += [f"{name}: ảnh thiếu alt: {s}" for s in p.no_alt]
        for link in p.links:
            u = urlsplit(link)
            if u.scheme or u.netloc:
                continue
            path = unquote(u.path).lstrip("/")
            target = name if not path else path
            if path and not (OUT / path).exists():
                errors.append(f"{name}: link hỏng {link}")
                continue
            if u.fragment and target.endswith(".html"):
                if u.fragment not in pages.get(target, Page()).ids:
                    errors.append(f"{name}: không có #{u.fragment} trong {target}")

    sitemap = (OUT / "sitemap.xml").read_text(encoding="utf-8")
    for loc in re.findall(r"<loc>https?://[^/]+/([^<]*)</loc>", sitemap):
        if not (OUT / (loc or "index.html")).exists():
            errors.append(f"sitemap.xml: không có trang {loc}")

    for e in errors:
        print("✗", e)
    print(f"Đã kiểm tra {len(pages)} trang: {'không có lỗi' if not errors else f'{len(errors)} lỗi'}")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
