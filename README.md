# Website Phạm Gia Global

Website giới thiệu công ty **Công ty Cổ phần Đầu tư Thương mại và Công nghệ số Toàn cầu Phạm Gia** (Phạm Gia Global).

Web tĩnh (HTML/CSS/JS thuần). **Thư mục đăng lên hosting là `public/`** (OneSite, Netlify, Cloudflare Pages: chọn thư mục xuất bản / publish directory là `public`).

## Các trang

| Trang | File | Menu con |
|---|---|---|
| Trang chủ | `index.html` | – |
| Giới thiệu | `gioi-thieu.html` | Tổng quan · Tầm nhìn & sứ mệnh · Sơ đồ tổ chức · Cam kết |
| Lĩnh vực | `linh-vuc.html` | 8 lĩnh vực (Đóng tàu, Công nghiệp, PCCC, Cứu hộ, UAV, Robot, AI, Đào tạo) |
| Sản phẩm | `san-pham.html` | Lọc theo nhóm qua `?nhom=hang-hai`, tìm qua `?q=...` |
| Năng lực | `nang-luc.html` | Quy trình · Phương thức · Kỹ thuật · Logistics · Chất lượng |
| Dự án | `du-an.html` | – |
| Liên hệ | `lien-he.html` | – |

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `public/` | **Thư mục đăng lên hosting** |
| `public/*.html`, `public/sitemap.xml`, `public/robots.txt` | **Được tạo tự động** – không sửa trực tiếp |
| `public/style.css` | Giao diện, responsive desktop/mobile |
| `public/script.js` | Danh mục sản phẩm, tìm kiếm, menu, popup báo giá, gửi form, tải ảnh nền khi cuộn tới |
| `public/assets/` | Logo, ảnh (đã nén WebP; ảnh hero có thêm bản `-800.webp` cho mobile) |
| `_build/pages/` | Nội dung riêng từng trang (gồm `404.html`) |
| `_build/partials/` | Phần dùng chung: `header.html` (menu), `footer.html`, `modal.html` (popup báo giá), `head.html`, `sprite.html` (icon), `cta.html`, `boq.html`, `process.html` |
| `_build/build.py` | Script ghép trang, sinh `sitemap.xml` và `robots.txt`; dòng `SITE = ...` là tên miền |
| `_build/check.py` | Kiểm tra link hỏng, #mục, title/description, h1, alt ảnh, sitemap |
| `_build/credits.json` | Nguồn ảnh minh họa, in ra footer |

## Sửa nội dung

1. Sửa file trong `_build/pages/` (nội dung trang) hoặc `_build/partials/` (menu, footer, popup... dùng chung cho mọi trang).
2. Chạy lệnh ghép trang rồi kiểm tra, ở thư mục gốc repo:

   ```bash
   python _build/build.py
   python _build/check.py
   ```

3. Xem thử, rồi commit và push.

## Xem thử trên máy

```bash
python -m http.server 5173 -d public
```

Mở http://localhost:5173

## Việc cần làm trước khi chạy chính thức

- **Form liên hệ:** mặc định mở ứng dụng email. Để form gửi thẳng về hộp thư, tạo form trên [Formspree](https://formspree.io) rồi dán link vào `FORM_ENDPOINT` đầu file `public/script.js`.
- **Sản phẩm:** sửa mảng `products` đầu file `public/script.js` (`featured: true` để hiện ở trang chủ).
- **Tên miền:** nếu tên miền không phải `phamgiaglobal.com.vn`, sửa dòng `SITE = ...` trong `_build/build.py`, rồi build lại (canonical, og, schema, sitemap, robots tự đổi theo).
- **Liên hệ:** số điện thoại, email, Zalo nằm trong `_build/partials/` và `_build/pages/lien-he.html` (tìm `0984041978` và `Phamgia.jsc2019`), cùng `public/script.js`.
