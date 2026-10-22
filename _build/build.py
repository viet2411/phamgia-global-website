"""Ghép các trang HTML của website từ phần dùng chung.

Cách dùng (chạy ở thư mục gốc website):
    python _build/build.py

- _build/partials/  : phần dùng chung (head, header + menu, footer, popup báo giá, icon...)
- _build/pages/     : nội dung riêng từng trang; khối <!-- ... --> ở đầu file là thông tin trang
- Kết quả ghi ra thư mục gốc website (index.html, gioi-thieu.html, ...).

Không sửa trực tiếp các file .html ở thư mục gốc: lần build sau sẽ ghi đè.
"""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

BUILD = Path(__file__).resolve().parent
ROOT = BUILD.parent
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
    header = partial("header").replace(f'data-nav="{meta["nav"]}"', f'data-nav="{meta["nav"]}" aria-current="page"')

    html = "".join([
        head.replace('<html lang="vi">', '<html lang="vi">\n<!-- File được tạo tự động bởi _build/build.py. Sửa nội dung trong _build/ rồi chạy lại build. -->', 1),
        partial("sprite"), "\n",
        header, "\n",
        body.strip(), "\n\n",
        partial("footer"),
        partial("modal"),
        '<script src="script.js"></script>\n</body>\n</html>\n',
    ])
    left = re.findall(r"%%[A-Z_]+%%", html)
    if left:
        raise SystemExit(f"{path.name}: còn placeholder chưa thay {left}")
    (ROOT / path.name).write_text(html, encoding="utf-8", newline="\n")
    return path.name


if __name__ == "__main__":
    built = [build_page(p) for p in sorted(PAGES.glob("*.html"))]
    print("Đã tạo:", ", ".join(built))
