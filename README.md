# Website Phạm Gia Global

Website giới thiệu công ty **Công ty Cổ phần Đầu tư Thương mại và Công nghệ số Toàn cầu Phạm Gia** (Phạm Gia Global).

Web tĩnh (HTML/CSS/JS thuần), không cần build: đưa nguyên thư mục lên OneSite, Netlify, Cloudflare Pages hoặc GitHub Pages là chạy.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Toàn bộ nội dung trang |
| `style.css` | Giao diện, responsive desktop/mobile |
| `script.js` | Danh mục sản phẩm, tìm kiếm, popup báo giá, gửi form |
| `assets/` | Logo, ảnh (đã nén WebP, mỗi file < 200 KB) |

## Xem thử trên máy

```bash
python -m http.server 5173
```

Mở http://localhost:5173

## Việc cần làm trước khi chạy chính thức

- **Form liên hệ:** mặc định mở ứng dụng email. Để form gửi thẳng về hộp thư, tạo form trên [Formspree](https://formspree.io) rồi dán link vào `FORM_ENDPOINT` đầu file `script.js`.
- **Sản phẩm:** sửa mảng `products` đầu file `script.js`.
- **Tên miền:** nếu tên miền không phải `phamgiaglobal.com.vn`, sửa các thẻ `canonical`, `og:url`, `og:image` và khối `application/ld+json` trong `index.html`.
- **Liên hệ:** số điện thoại, email, Zalo nằm trong `index.html` (tìm `0984041978` và `Phamgia.jsc2019`).
