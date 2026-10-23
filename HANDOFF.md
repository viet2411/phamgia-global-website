# Bàn giao phiên làm việc – Website Phạm Gia Global

*Cập nhật: 23/10/2026. Đọc file này trước khi làm tiếp; nó thay cho lịch sử chat của phiên trước.*

## 1. Mục tiêu dự án

Làm website giới thiệu công ty để thay web WordPress cũ (đã hết hạn hosting tại iNET), giữ tên miền và email, đưa web tĩnh lên **OneSite Free** của iNET qua kết nối GitHub.

- Repo: https://github.com/viet2411/phamgia-global-website (public, nhánh `main`)
- Thư mục trên máy cũ: `F:\Research\PHAMGIA\website`
- Tài liệu gốc (nằm ngoài repo, trên máy cũ, trong `F:\Research\PHAMGIA\`): `boi_canh_website_cong_ty.md`, `HSNL PHẠM GIA.docx` (hồ sơ năng lực), `logo.jpg`, `sơ đồ tổ chức.jpg`, `hồ sơ năng lực.jpg`, bản prototype cũ `PHAM_GIA_GLOBAL_B2B_WEBSITE_2026/`.

## 2. Thông tin công ty (đã dùng trên web)

| | |
|---|---|
| Tên | Công ty Cổ phần Đầu tư Thương mại và Công nghệ số Toàn cầu Phạm Gia |
| Tên quốc tế / viết tắt | Pham Gia Global Digital Technology and Trading Investment JSC / PGDTTI., JSC |
| Thương hiệu | Phạm Gia Global – “Kết nối giá trị – Kiến tạo tương lai” |
| MST | 0110183412 · thành lập 17/11/2022 |
| Người đại diện | Bùi Viết Dũng |
| Trụ sở | Số 23 Nguyễn Ngọc Doãn, Phường Kim Liên, TP Hà Nội |
| Điện thoại / Zalo | 098 404 1978 (**chưa xác nhận**, lấy từ prototype cũ) |
| Email | Phamgia.jsc2019@gmail.com |
| Tên miền dự kiến | phamgiaglobal.com.vn (theo hồ sơ năng lực, **chưa xác nhận**) |
| Lĩnh vực | 8 nhóm, trọng tâm **đóng tàu – hàng hải**; còn lại: thiết bị công nghiệp, PCCC, cứu hộ, UAV, robot, AI, đào tạo công nghệ |
| Màu thương hiệu | navy `#082c54`, xanh `#0a6fb8`, xanh lá `#4fb12a` (theo logo) · font Be Vietnam Pro |

## 3. Hiện trạng website

Web tĩnh HTML/CSS/JS, 7 trang, menu có dropdown, đã kiểm tra desktop và mobile (không tràn ngang).

| Trang | Nội dung chính |
|---|---|
| `index.html` | Hero ảnh nền + ô tìm thiết bị, số liệu, giới thiệu, năng lực cốt lõi, 8 lĩnh vực, thiết bị tiêu biểu, BOQ, dự án, quy trình, CTA |
| `gioi-thieu.html` | Tổng quan, thư ngỏ, tầm nhìn – sứ mệnh, 4 trụ cột, sơ đồ tổ chức, cam kết |
| `linh-vuc.html` | 8 lĩnh vực, mỗi mục có ảnh, `#dong-tau`, `#cong-nghiep`, `#pccc`, `#cuu-ho`, `#uav`, `#robot`, `#ai`, `#dao-tao` |
| `san-pham.html` | Danh mục tham khảo, tìm kiếm, lọc qua `?nhom=hang-hai|cong-nghiep|pccc|uav` và `?q=` |
| `nang-luc.html` | Quy trình 7 bước, phương thức cung cấp, kỹ thuật, logistics, chất lượng |
| `du-an.html` | 4 dự án tiêu biểu |
| `lien-he.html` | Thông tin liên hệ, bản đồ Google, form |

Tính năng: popup “Yêu cầu báo giá” (RFQ/BOQ) mở từ mọi nút, nút Zalo/gọi nổi, form hiện **mở ứng dụng email** (mailto) vì chưa có Formspree.

### Cấu trúc và cách sửa

- **Các file `.html` ở gốc được tạo tự động – không sửa trực tiếp.** Sửa trong `_build/pages/` (nội dung từng trang) hoặc `_build/partials/` (header/menu, footer, popup, CTA, BOQ, quy trình, icon), rồi chạy:
  ```bash
  python _build/build.py
  ```
- `_build/build.py` còn tự sinh danh sách nguồn ảnh ở footer từ `assets/credits.json`.
- `script.js`: đầu file có `FORM_ENDPOINT` (Formspree) và mảng `products` (danh mục sản phẩm).
- `style.css`: toàn bộ giao diện; khối “Chiều sâu” gần cuối file chứa phần ảnh nền, lớp chồng, bóng đổ.
- Xem thử trên máy: `python -m http.server 5173` trong thư mục repo rồi mở http://localhost:5173.

### Ảnh

- 14 ảnh minh họa ngành lấy từ Wikimedia Commons (public domain, CC0, CC BY, CC BY-SA), đã chuyển đen trắng và nén WebP, phủ màu navy bằng CSS. **Bắt buộc giữ phần “Nguồn ảnh minh họa” ở footer** (giấy phép CC BY/BY-SA yêu cầu ghi nguồn). Danh sách đầy đủ trong `assets/credits.json`.
- Đây là ảnh minh họa ngành, **không phải ảnh công trình của Phạm Gia**. Khi công ty có ảnh thật, nên thay vào (nhất là hero và trang Dự án).
- Ảnh của công ty: `logo-mark.png`, `logo-full.webp`, `favicon.png`, `ho-so-nang-luc.webp` (bìa hồ sơ), `so-do-to-chuc.webp`, `og-image.webp`.

### Nhánh git

- `main`: bản hiện hành (khung giao diện cũ + chiều sâu). **Đây là bản dùng.**
- `thu-nghiem-giao-dien-tile`: thử nghiệm giao diện dạng bảng ô theo skill taste-skill, chưa hoàn thiện. Chủ dự án đã chọn **không dùng**; giữ lại để tham khảo.

### Quyết định đã chốt trong phiên trước

- Giữ khung giao diện cũ (nhiều trang, dropdown, thẻ bo góc, nền navy), chỉ làm đẹp và thêm chiều sâu; không theo phong cách “bảng ô” tối giản.
- Hosting: OneSite Free của iNET (không phải đổi nameserver, không động bản ghi MX của email). Dự phòng: Netlify, Cloudflare Pages.
- Form: dự kiến dùng Formspree (gói miễn phí ~50 lượt/tháng, không nhận file đính kèm nên popup có ô “Link BOQ”).

## 4. Việc còn lại

### Chủ dự án cần làm / xác nhận

1. **Gấp:** gia hạn tên miền và gói email tại iNET (với tên miền .vn: trước 17h00 ngày thứ 25 sau ngày hết hạn). Hotline iNET 1900 9250. Hỏi kèm: ngày hết hạn chính xác; OneSite Free có thời hạn không; AI của OneSite có miễn phí không; tạo tài khoản OneSite có cần tên miền còn hạn không; lấy được bản sao lưu WordPress cũ không.
2. Xác nhận với công ty:
   - Có công khai tên khách hàng trong phần dự án không (Trung đoàn 910 & 915 – BTL PK-KQ, Công ty TNHH MTV Thanh Bình / Bộ Công an, MAJ Việt Nam, G-Group).
   - Số điện thoại / Zalo 098 404 1978.
   - Email hiển thị: Gmail hiện tại hay email tên miền.
   - Tên miền chính xác (phamgiaglobal.com.vn?).
   - Danh mục sản phẩm trong `script.js` (một số nhóm là mẫu: sơn hàng hải, PCCC, máy phát điện…; giá và tồn kho chưa có).
   - Ảnh thật của công ty, nếu có.
3. Đăng ký Formspree bằng email công ty, gửi link `https://formspree.io/f/...`.
4. Kích hoạt OneSite Free, kết nối repo này, gắn tên miền.

### Việc kỹ thuật có thể làm ngay

- Gắn Formspree: dán link vào `FORM_ENDPOINT` trong `script.js`, gửi thử cả popup lẫn form trang Liên hệ.
- Tạo `sitemap.xml` và `robots.txt`; sau khi web chạy thì đăng ký Google Search Console, gửi sitemap.
- Cân nhắc tách phần web ra thư mục riêng (vd. `public/`) để OneSite không đăng kèm `_build/`, `README.md`, `HANDOFF.md` (không có gì nhạy cảm, chỉ là cho gọn).
- Nếu tên miền khác `phamgiaglobal.com.vn`: sửa `_build/partials/head.html` (canonical, og:url, og:image) và `_build/partials/schema.html`, rồi build lại.
- Sau khi lên tên miền thật: kiểm tra HTTPS, form, và email công ty vẫn gửi/nhận bình thường.
- Tùy chọn: Google Analytics.

## 5. Công cụ trên máy cũ (để tham khảo)

- Python 3.11 + Pillow (dùng xử lý ảnh), Node.js 24 LTS, GitHub CLI (`gh`, đăng nhập tài khoản `viet2411`).
- Skill `taste-skill` (design-taste-frontend) đã cài ở `~/.claude/skills/taste-skill`; script `assets.mjs` của nó dùng để tìm ảnh giấy phép mở. Thư mục làm việc `.taste-skill/` đã được `.gitignore`.
