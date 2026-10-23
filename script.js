/* =========================================================
   Cấu hình form
   - Để trống FORM_ENDPOINT: form sẽ mở ứng dụng email với nội dung điền sẵn.
   - Khi có tài khoản Formspree (https://formspree.io), dán link dạng
     "https://formspree.io/f/xxxxxxx" vào đây để form gửi thẳng về email.
   ========================================================= */
const FORM_ENDPOINT = '';
const COMPANY_EMAIL = 'Phamgia.jsc2019@gmail.com';

/* ---------- Danh mục sản phẩm tham khảo ----------
   featured: true  -> hiện ở mục "Thiết bị tiêu biểu" trên trang chủ */
const products = [
  { cat: 'Hàng hải', icon: 'bolt', featured: true, name: 'Panasonic TX 400 – Máy hàn inverter', code: 'TX 400', desc: 'Thiết bị hàn công nghiệp cho xưởng đóng mới và sửa chữa tàu; cấu hình xác nhận theo yêu cầu.' },
  { cat: 'Hàng hải', icon: 'paint', featured: true, name: 'Sơn hàng hải & vật tư bảo trì tàu', code: 'MARINE', desc: 'Các dòng sơn chống hà, chống ăn mòn, sơn boong và vật tư phục vụ đóng mới, sửa chữa tàu.' },
  { cat: 'Hàng hải', icon: 'pump', name: 'Echo WP-8000 – Máy bơm nước', code: 'WP-8000', desc: 'Máy bơm nước di động; lựa chọn phụ kiện ống theo nhu cầu sử dụng.' },
  { cat: 'Công nghiệp', icon: 'gear', featured: true, name: 'Fini MK103-90-3M – Máy nén khí', code: 'MK103-90-3M', desc: 'Máy nén khí 3 HP, bình 90 L; dùng cho xưởng sản xuất và bảo trì.' },
  { cat: 'Công nghiệp', icon: 'bolt', name: 'Máy phát điện công nghiệp', code: 'GENSET', desc: 'Máy phát điện dự phòng và di động; tư vấn công suất theo phụ tải thực tế.' },
  { cat: 'Công nghiệp', icon: 'lift', name: 'Thiết bị nâng – ép – kích thủy lực', code: 'HYDRAULIC', desc: 'Kích thủy lực, máy ép, thiết bị nâng cho xưởng cơ khí và sửa chữa ô tô.' },
  { cat: 'Công nghiệp', icon: 'tool', name: 'Makita DTW700 – Máy siết bu lông', code: 'DTW700', desc: 'Máy siết bu lông dùng pin; cấu hình bộ pin/sạc theo đơn hàng.' },
  { cat: 'Công nghiệp', icon: 'tool', name: 'Makita GB602 – Máy mài 2 đá', code: 'GB602', desc: 'Máy mài bàn phục vụ gia công, bảo dưỡng và sửa chữa.' },
  { cat: 'Công nghiệp', icon: 'pump', name: 'KUMISAI KMS12S – Bơm mỡ điện', code: 'KMS12S', desc: 'Bơm mỡ điện dung tích 12 L cho công tác bôi trơn, bảo dưỡng.' },
  { cat: 'PCCC', icon: 'fire', name: 'Thiết bị & phương tiện PCCC', code: 'PCCC', desc: 'Bình chữa cháy, vòi, lăng, tủ PCCC, báo cháy theo yêu cầu công trình và dự án.' },
  { cat: 'Cứu hộ', icon: 'life', name: 'Trang thiết bị cứu hộ – cứu nạn', code: 'RESCUE', desc: 'Thiết bị tìm kiếm, cứu hộ và ứng phó sự cố cho lực lượng chuyên trách.' },
  { cat: 'UAV', icon: 'drone', featured: true, name: 'UAV / Drone – Giải pháp ứng dụng', code: 'UAV', desc: 'Tư vấn cấu hình cho quan sát, khảo sát, giám sát, kiểm tra theo mục tiêu sử dụng.' },
  { cat: 'Robot', icon: 'robot', name: 'Robot & Tự động hóa', code: 'ROBOT', desc: 'Kết nối công nghệ, tư vấn và chuyển giao giải pháp robot cho doanh nghiệp.' },
  { cat: 'Công nghệ', icon: 'chip', name: 'Thiết bị điện – điện tử – công nghệ', code: 'TECH', desc: 'Thiết bị điện, điện tử, máy tính và sản phẩm công nghệ cho văn phòng, nhà xưởng.' }
];

/* Nhóm lọc trên trang Sản phẩm; slug dùng cho đường dẫn san-pham.html?nhom=... */
const groups = [
  { slug: '', label: 'Tất cả', cats: null },
  { slug: 'hang-hai', label: 'Hàng hải', cats: ['Hàng hải'] },
  { slug: 'cong-nghiep', label: 'Công nghiệp', cats: ['Công nghiệp'] },
  { slug: 'pccc', label: 'PCCC & Cứu hộ', cats: ['PCCC', 'Cứu hộ'] },
  { slug: 'uav', label: 'UAV – Robot – Công nghệ', cats: ['UAV', 'Robot', 'Công nghệ'] }
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const productCard = p => `
  <article class="product">
    <div class="product-top"><span class="product-code">${p.code}</span><svg class="ic-lg"><use href="#i-${p.icon}"/></svg></div>
    <div class="product-body">
      <div class="product-tag">${p.cat}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="product-foot"><span class="price">Liên hệ báo giá</span><button type="button" data-open-rfq data-product="${esc(p.name)}">Yêu cầu báo giá</button></div>
    </div>
  </article>`;

/* ---------- Trang chủ: thiết bị tiêu biểu ---------- */
const featuredGrid = $('#featuredGrid');
if (featuredGrid) featuredGrid.innerHTML = products.filter(p => p.featured).map(productCard).join('');

/* ---------- Trang Sản phẩm: tìm kiếm & lọc ---------- */
const grid = $('#productGrid');
if (grid) {
  const chips = $('#filterChips');
  const search = $('#productSearch');
  const count = $('#resultCount');
  const params = new URLSearchParams(location.search);
  let group = groups.find(g => g.slug === (params.get('nhom') || '')) || groups[0];
  search.value = params.get('q') || '';

  chips.innerHTML = groups.map(g => `<button type="button" data-slug="${g.slug}">${g.label}</button>`).join('');

  const syncUrl = () => {
    const p = new URLSearchParams();
    if (group.slug) p.set('nhom', group.slug);
    if (search.value.trim()) p.set('q', search.value.trim());
    history.replaceState(null, '', p.toString() ? `?${p}` : location.pathname);
  };

  const render = () => {
    $$('button', chips).forEach(b => b.classList.toggle('active', b.dataset.slug === group.slug));
    const q = norm(search.value.trim());
    const list = products.filter(p =>
      (!group.cats || group.cats.includes(p.cat)) &&
      norm(`${p.name} ${p.cat} ${p.code} ${p.desc}`).includes(q));
    count.textContent = `${list.length} sản phẩm${group.cats ? ` trong nhóm ${group.label}` : ''}${q ? ` khớp “${search.value.trim()}”` : ''}`;
    grid.innerHTML = list.length
      ? list.map(productCard).join('')
      : `<div class="empty">Không tìm thấy “${esc(search.value)}” trong danh mục tham khảo.<br>Hãy gửi yêu cầu hoặc BOQ – Phạm Gia Global sẽ tìm phương án phù hợp.<br><button class="btn btn-primary" data-open-rfq data-product="${esc(search.value)}">Gửi yêu cầu tìm hàng</button></div>`;
  };

  chips.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    group = groups.find(g => g.slug === b.dataset.slug);
    render(); syncUrl();
  });
  search.addEventListener('input', () => { render(); syncUrl(); });
  $('#productSearchForm').addEventListener('submit', e => { e.preventDefault(); render(); syncUrl(); });
  render();
}

/* ---------- Popup báo giá ---------- */
const modal = $('#rfqModal');
let lastFocus = null;
function openModal(product) {
  lastFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (product) $('#r-product').value = product;
  setTimeout(() => $('#r-company').focus(), 50);
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}
document.addEventListener('click', e => {
  const opener = e.target.closest('[data-open-rfq]');
  if (opener) { e.preventDefault(); closeMenu(); openModal(opener.dataset.product); }
  if (e.target.closest('[data-close-modal]')) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

/* ---------- Gửi form ---------- */
const labels = { company: 'Doanh nghiệp', contact: 'Người liên hệ', phone: 'Điện thoại', email: 'Email', product: 'Sản phẩm', qty: 'Số lượng', location: 'Địa điểm giao', brand: 'Thương hiệu', spec: 'Yêu cầu kỹ thuật', file_link: 'Link BOQ', need: 'Nhu cầu' };

$$('.lead-form').forEach(form => form.addEventListener('submit', async e => {
  e.preventDefault();
  const status = $('.form-status', form);
  const btn = $('button[type="submit"]', form);
  const data = new FormData(form);
  if (data.get('_gotcha')) return;
  data.delete('_gotcha');
  const subject = `[Website] ${form.dataset.formName} – ${data.get('company') || ''}`;
  status.className = 'form-status';

  if (!FORM_ENDPOINT) {
    const body = [...data.entries()].filter(([, v]) => v).map(([k, v]) => `${labels[k] || k}: ${v}`).join('\n');
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.classList.add('ok');
    status.textContent = 'Đang mở ứng dụng email để gửi yêu cầu. Nếu không thấy, vui lòng gọi 098 404 1978.';
    return;
  }

  btn.disabled = true;
  status.textContent = 'Đang gửi...';
  data.append('_subject', subject);
  try {
    const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    status.classList.add('ok');
    status.textContent = '✓ Đã gửi yêu cầu. Phạm Gia Global sẽ liên hệ lại sớm nhất.';
  } catch {
    status.classList.add('err');
    status.textContent = `Gửi chưa thành công. Vui lòng thử lại hoặc email ${COMPANY_EMAIL}.`;
  } finally {
    btn.disabled = false;
  }
}));

/* ---------- Menu ---------- */
const nav = $('.nav');
const toggle = $('#menuToggle');
function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = modal.classList.contains('open') ? 'hidden' : '';
}
toggle.addEventListener('click', () => {
  /* Menu mobile bắt đầu ngay dưới header (topbar có thể đang hiện hoặc đã cuộn khuất) */
  $('#navMenu').style.top = `${$('#siteHeader').getBoundingClientRect().bottom}px`;
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
/* Mobile: nút mũi tên mở/đóng menu con */
$$('.dd-toggle').forEach(btn => btn.addEventListener('click', () => {
  const li = btn.closest('.has-dd');
  const open = li.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
}));
$$('.nav-menu a').forEach(a => a.addEventListener('click', () => { closeMenu(); a.blur(); }));

/* ---------- Header & nút lên đầu trang ---------- */
const header = $('#siteHeader');
const toTop = $('#toTop');
const onScroll = () => {
  header.classList.toggle('scrolled', scrollY > 10);
  toTop.classList.toggle('show', scrollY > 700);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* Hiệu ứng xuất hiện khi cuộn */
const reveal = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); reveal.unobserve(en.target); }
}), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
/* Các thẻ cùng một nhóm hiện lần lượt, cách nhau 80ms */
$$('.reveal').forEach(el => {
  const i = [...el.parentElement.children].filter(c => c.classList.contains('reveal')).indexOf(el);
  el.style.transitionDelay = `${Math.min(i, 6) * 80}ms`;
  reveal.observe(el);
});

/* Ảnh nền ở phần dưới trang: chỉ tải khi còn cách màn hình khoảng 600px */
const lazyBg = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('bg-in'); lazyBg.unobserve(en.target); }
}), { rootMargin: '600px 0px' });
$$('.section-photo, .industry').forEach(el => lazyBg.observe(el));

/* Mở từ trang khác với #mục (VD: linh-vuc.html#uav): đảm bảo cuộn đúng mục sau khi trang dựng xong */
if (location.hash) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) addEventListener('load', () => target.scrollIntoView({ behavior: 'auto' }));
}

$('#year').textContent = new Date().getFullYear();
