/* =========================================================
   Cấu hình form
   - Để trống FORM_ENDPOINT: form sẽ mở ứng dụng email với nội dung điền sẵn.
   - Khi có tài khoản Formspree (https://formspree.io), dán link dạng
     "https://formspree.io/f/xxxxxxx" vào đây để form gửi thẳng về email.
   ========================================================= */
const FORM_ENDPOINT = '';
const COMPANY_EMAIL = 'Phamgia.jsc2019@gmail.com';

document.documentElement.classList.add('js');

/* ---------- Danh mục sản phẩm tham khảo ---------- */
const products = [
  { cat: 'Hàng hải', icon: 'bolt', name: 'Panasonic TX 400 – Máy hàn inverter', code: 'TX 400', desc: 'Thiết bị hàn công nghiệp cho xưởng đóng mới và sửa chữa tàu; cấu hình xác nhận theo yêu cầu.' },
  { cat: 'Hàng hải', icon: 'paint', name: 'Sơn hàng hải & vật tư bảo trì tàu', code: 'MARINE', desc: 'Các dòng sơn chống hà, chống ăn mòn, sơn boong và vật tư phục vụ đóng mới, sửa chữa tàu.' },
  { cat: 'Hàng hải', icon: 'pump', name: 'Echo WP-8000 – Máy bơm nước', code: 'WP-8000', desc: 'Máy bơm nước di động; lựa chọn phụ kiện ống theo nhu cầu sử dụng.' },
  { cat: 'Công nghiệp', icon: 'gear', name: 'Fini MK103-90-3M – Máy nén khí', code: 'MK103-90-3M', desc: 'Máy nén khí 3 HP, bình 90 L; dùng cho xưởng sản xuất và bảo trì.' },
  { cat: 'Công nghiệp', icon: 'bolt', name: 'Máy phát điện công nghiệp', code: 'GENSET', desc: 'Máy phát điện dự phòng và di động; tư vấn công suất theo phụ tải thực tế.' },
  { cat: 'Công nghiệp', icon: 'lift', name: 'Thiết bị nâng – ép – kích thủy lực', code: 'HYDRAULIC', desc: 'Kích thủy lực, máy ép, thiết bị nâng cho xưởng cơ khí và sửa chữa ô tô.' },
  { cat: 'Công nghiệp', icon: 'tool', name: 'Makita DTW700 – Máy siết bu lông', code: 'DTW700', desc: 'Máy siết bu lông dùng pin; cấu hình bộ pin/sạc theo đơn hàng.' },
  { cat: 'Công nghiệp', icon: 'tool', name: 'Makita GB602 – Máy mài 2 đá', code: 'GB602', desc: 'Máy mài bàn phục vụ gia công, bảo dưỡng và sửa chữa.' },
  { cat: 'Công nghiệp', icon: 'pump', name: 'KUMISAI KMS12S – Bơm mỡ điện', code: 'KMS12S', desc: 'Bơm mỡ điện dung tích 12 L cho công tác bôi trơn, bảo dưỡng.' },
  { cat: 'PCCC', icon: 'fire', name: 'Thiết bị & phương tiện PCCC', code: 'PCCC', desc: 'Bình chữa cháy, vòi, lăng, tủ PCCC, báo cháy theo yêu cầu công trình và dự án.' },
  { cat: 'Cứu hộ', icon: 'life', name: 'Trang thiết bị cứu hộ – cứu nạn', code: 'RESCUE', desc: 'Thiết bị tìm kiếm, cứu hộ và ứng phó sự cố cho lực lượng chuyên trách.' },
  { cat: 'UAV', icon: 'drone', name: 'UAV / Drone – Giải pháp ứng dụng', code: 'UAV', desc: 'Tư vấn cấu hình cho quan sát, khảo sát, giám sát, kiểm tra theo mục tiêu sử dụng.' },
  { cat: 'Robot', icon: 'robot', name: 'Robot & Tự động hóa', code: 'ROBOT', desc: 'Kết nối công nghệ, tư vấn và chuyển giao giải pháp robot cho doanh nghiệp.' },
  { cat: 'Công nghệ', icon: 'chip', name: 'Thiết bị điện – điện tử – công nghệ', code: 'TECH', desc: 'Thiết bị điện, điện tử, máy tính và sản phẩm công nghệ cho văn phòng, nhà xưởng.' }
];
const categories = ['Tất cả', ...new Set(products.map(p => p.cat))];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const grid = $('#productGrid');
const chips = $('#filterChips');
const productSearch = $('#productSearch');
let activeCat = 'Tất cả';

chips.innerHTML = categories.map(c => `<button type="button" data-cat="${c}"${c === activeCat ? ' class="active"' : ''}>${c}</button>`).join('');

function renderProducts() {
  const q = norm(productSearch.value.trim());
  const list = products.filter(p =>
    (activeCat === 'Tất cả' || p.cat === activeCat) &&
    norm(`${p.name} ${p.cat} ${p.code} ${p.desc}`).includes(q));
  grid.innerHTML = list.length
    ? list.map(p => `
      <article class="product">
        <div class="product-top"><span class="product-code">${p.code}</span><svg class="ic-lg"><use href="#i-${p.icon}"/></svg></div>
        <div class="product-body">
          <div class="product-tag">${p.cat}</div>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="product-foot"><span class="price">Liên hệ báo giá</span><button type="button" data-open-rfq data-product="${esc(p.name)}">Yêu cầu báo giá</button></div>
        </div>
      </article>`).join('')
    : `<div class="empty">Không tìm thấy “${esc(productSearch.value)}” trong danh mục tham khảo.<br>Hãy gửi yêu cầu hoặc BOQ – Phạm Gia Global sẽ tìm phương án phù hợp.<br><button class="btn btn-primary" data-open-rfq data-product="${esc(productSearch.value)}">Gửi yêu cầu tìm hàng</button></div>`;
}

function setCategory(cat) {
  activeCat = categories.includes(cat) ? cat : 'Tất cả';
  $$('button', chips).forEach(b => b.classList.toggle('active', b.dataset.cat === activeCat));
  renderProducts();
}

chips.addEventListener('click', e => { const b = e.target.closest('button'); if (b) setCategory(b.dataset.cat); });
productSearch.addEventListener('input', renderProducts);
$('#productSearchForm').addEventListener('submit', e => { e.preventDefault(); renderProducts(); });

function searchFromHero(q) {
  productSearch.value = q;
  activeCat = 'Tất cả';
  setCategory('Tất cả');
  $('#products').scrollIntoView({ behavior: 'smooth' });
}
$('#heroSearchForm').addEventListener('submit', e => { e.preventDefault(); searchFromHero($('#heroSearch').value); });
$$('.quick-tags button').forEach(b => b.addEventListener('click', () => { $('#heroSearch').value = b.textContent; searchFromHero(b.dataset.query); }));
$$('[data-filter]').forEach(a => a.addEventListener('click', () => { productSearch.value = ''; setCategory(a.dataset.filter); }));

renderProducts();

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

/* ---------- Menu & header ---------- */
const nav = $('.nav');
const toggle = $('#menuToggle');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = modal.classList.contains('open') ? 'hidden' : ''; }
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
$$('.nav-links a').forEach(a => a.addEventListener('click', closeMenu));

const header = $('#siteHeader');
const toTop = $('#toTop');
const onScroll = () => {
  header.classList.toggle('scrolled', scrollY > 10);
  toTop.classList.toggle('show', scrollY > 700);
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

/* Đánh dấu mục menu theo vùng đang xem */
const navMap = new Map($$('.nav-links a').map(a => [a.getAttribute('href').slice(1), a]));
const spy = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) navMap.forEach((a, id) => a.classList.toggle('active', id === en.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

/* Hiệu ứng xuất hiện khi cuộn */
const reveal = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); reveal.unobserve(en.target); }
}), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach(el => reveal.observe(el));

$('#year').textContent = new Date().getFullYear();
