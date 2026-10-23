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
  { cat: 'Hàng hải', name: 'Panasonic TX 400 – Máy hàn inverter', code: 'TX 400', desc: 'Thiết bị hàn công nghiệp cho xưởng đóng mới và sửa chữa tàu; cấu hình xác nhận theo yêu cầu.' },
  { cat: 'Hàng hải', name: 'Sơn hàng hải và vật tư bảo trì tàu', code: 'Theo hệ sơn', desc: 'Sơn chống hà, chống ăn mòn, sơn boong và vật tư phục vụ đóng mới, sửa chữa tàu.' },
  { cat: 'Hàng hải', name: 'Echo WP-8000 – Máy bơm nước', code: 'WP-8000', desc: 'Máy bơm nước di động; lựa chọn phụ kiện ống theo nhu cầu sử dụng.' },
  { cat: 'Công nghiệp', name: 'Fini MK103-90-3M – Máy nén khí', code: 'MK103-90-3M', desc: 'Máy nén khí 3 HP, bình 90 L; dùng cho xưởng sản xuất và bảo trì.' },
  { cat: 'Công nghiệp', name: 'Máy phát điện công nghiệp', code: 'Theo công suất', desc: 'Máy phát điện dự phòng và di động; tư vấn công suất theo phụ tải thực tế.' },
  { cat: 'Công nghiệp', name: 'Thiết bị nâng – ép – kích thủy lực', code: 'Theo tải trọng', desc: 'Kích thủy lực, máy ép, thiết bị nâng cho xưởng cơ khí và sửa chữa ô tô.' },
  { cat: 'Công nghiệp', name: 'Makita DTW700 – Máy siết bu lông', code: 'DTW700', desc: 'Máy siết bu lông dùng pin; cấu hình bộ pin và sạc theo đơn hàng.' },
  { cat: 'Công nghiệp', name: 'Makita GB602 – Máy mài 2 đá', code: 'GB602', desc: 'Máy mài bàn phục vụ gia công, bảo dưỡng và sửa chữa.' },
  { cat: 'Công nghiệp', name: 'KUMISAI KMS12S – Bơm mỡ điện', code: 'KMS12S', desc: 'Bơm mỡ điện dung tích 12 L cho công tác bôi trơn, bảo dưỡng.' },
  { cat: 'PCCC', name: 'Thiết bị và phương tiện PCCC', code: 'Theo công trình', desc: 'Bình chữa cháy, vòi, lăng, tủ PCCC, báo cháy theo yêu cầu công trình và dự án.' },
  { cat: 'Cứu hộ', name: 'Trang thiết bị cứu hộ – cứu nạn', code: 'Theo nhiệm vụ', desc: 'Thiết bị tìm kiếm, cứu hộ và ứng phó sự cố cho lực lượng chuyên trách.' },
  { cat: 'UAV', name: 'UAV / Drone – Giải pháp ứng dụng', code: 'Theo cấu hình', desc: 'Tư vấn cấu hình cho quan sát, khảo sát, giám sát, kiểm tra theo mục tiêu sử dụng.' },
  { cat: 'Robot', name: 'Robot và tự động hóa', code: 'Theo dự án', desc: 'Kết nối công nghệ, tư vấn và chuyển giao giải pháp robot cho doanh nghiệp.' },
  { cat: 'Công nghệ', name: 'Thiết bị điện – điện tử – công nghệ', code: 'Theo danh mục', desc: 'Thiết bị điện, điện tử, máy tính và sản phẩm công nghệ cho văn phòng, nhà xưởng.' }
];

/* Nhóm lọc trên trang Sản phẩm; slug dùng cho đường dẫn san-pham.html?nhom=... */
const groups = [
  { slug: '', label: 'Tất cả', cats: null },
  { slug: 'hang-hai', label: 'Hàng hải', cats: ['Hàng hải'] },
  { slug: 'cong-nghiep', label: 'Công nghiệp', cats: ['Công nghiệp'] },
  { slug: 'pccc', label: 'PCCC và cứu hộ', cats: ['PCCC', 'Cứu hộ'] },
  { slug: 'uav', label: 'UAV, robot, công nghệ', cats: ['UAV', 'Robot', 'Công nghệ'] }
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- BOQ: danh sách thiết bị khách chọn, giữ trong trình duyệt ---------- */
const BOQ_KEY = 'pg-boq';
let boq = [];
try { boq = JSON.parse(localStorage.getItem(BOQ_KEY)) || []; } catch { boq = []; }
const saveBoq = () => { try { localStorage.setItem(BOQ_KEY, JSON.stringify(boq)); } catch { /* chế độ riêng tư */ } };
const inBoq = name => boq.some(i => i.name === name);

function syncBoq() {
  const n = boq.length;
  $$('[data-boq-count]').forEach(el => { el.textContent = n ? n : ''; el.dataset.n = n; });
  $$('[data-boq-count-text]').forEach(el => { el.textContent = n ? `BOQ của bạn: ${n} thiết bị` : 'BOQ của bạn đang trống'; });
  $$('[data-boq-add]').forEach(b => {
    const on = inBoq(b.dataset.boqAdd);
    b.setAttribute('aria-pressed', String(on));
    b.firstChild.textContent = on ? 'Đã có trong BOQ ' : 'Thêm vào BOQ ';
    b.lastElementChild.textContent = on ? '−' : '+';
  });
  const box = $('#boqBox');
  if (box) {
    box.hidden = !n;
    $('#boqItems').innerHTML = boq.map((it, i) => `
      <li><span>${esc(it.name)}</span>
        <label class="sr-only" for="boq-q${i}">Số lượng ${esc(it.name)}</label>
        <input id="boq-q${i}" type="number" min="1" value="${it.qty}" data-boq-qty="${i}">
        <button type="button" data-boq-remove="${i}" aria-label="Bỏ ${esc(it.name)} khỏi BOQ">×</button></li>`).join('');
  }
}

document.addEventListener('click', e => {
  const add = e.target.closest('[data-boq-add]');
  if (add) {
    const name = add.dataset.boqAdd;
    boq = inBoq(name) ? boq.filter(i => i.name !== name) : [...boq, { name, qty: 1 }];
    saveBoq(); syncBoq();
  }
  const rm = e.target.closest('[data-boq-remove]');
  if (rm) { boq.splice(+rm.dataset.boqRemove, 1); saveBoq(); syncBoq(); }
});
document.addEventListener('change', e => {
  const q = e.target.closest('[data-boq-qty]');
  if (q) { boq[+q.dataset.boqQty].qty = Math.max(1, parseInt(q.value, 10) || 1); saveBoq(); }
});

/* ---------- Trang Sản phẩm: lọc, tìm, bảng ---------- */
const rows = $('#productRows');
if (rows) {
  const tiles = $('#groupTiles');
  const search = $('#productSearch');
  const count = $('#resultCount');
  const empty = $('#productEmpty');
  const params = new URLSearchParams(location.search);
  let group = groups.find(g => g.slug === (params.get('nhom') || '')) || groups[0];
  search.value = params.get('q') || '';

  const syncUrl = () => {
    const p = new URLSearchParams();
    if (group.slug) p.set('nhom', group.slug);
    if (search.value.trim()) p.set('q', search.value.trim());
    history.replaceState(null, '', p.toString() ? `?${p}` : location.pathname);
  };

  const render = () => {
    $$('button', tiles).forEach(b => b.classList.toggle('active', b.dataset.slug === group.slug));
    const q = norm(search.value.trim());
    const list = products.filter(p => (!group.cats || group.cats.includes(p.cat)) && norm(`${p.name} ${p.cat} ${p.code} ${p.desc}`).includes(q));
    count.textContent = `${list.length} thiết bị${group.cats ? ` trong nhóm ${group.label}` : ''}${q ? ` khớp “${search.value.trim()}”` : ''}`;
    rows.innerHTML = list.map(p => `
      <tr><td class="p-name">${esc(p.name)}</td><td>${esc(p.cat)}</td><td>${esc(p.code)}</td><td class="p-desc">${esc(p.desc)}</td>
      <td class="p-act"><button class="add-boq" type="button" data-boq-add="${esc(p.name)}" aria-pressed="false">Thêm vào BOQ <span aria-hidden="true">+</span></button></td></tr>`).join('');
    empty.innerHTML = list.length ? '' : `<div class="empty"><p class="lead-text">Không có “${esc(search.value)}” trong danh mục tham khảo.</p><p>Ghi vào yêu cầu, Phạm Gia Global sẽ tìm nguồn hàng phù hợp.</p><button class="btn btn-ink" data-open-rfq data-product="${esc(search.value)}">Gửi yêu cầu tìm hàng</button></div>`;
    syncBoq();
  };

  tiles.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    group = groups.find(g => g.slug === b.dataset.slug);
    render(); syncUrl();
  });
  search.addEventListener('input', () => { render(); syncUrl(); });
  $('#productSearchForm').addEventListener('submit', e => { e.preventDefault(); render(); syncUrl(); });
  render();
}

/* ---------- Showcase: một ảnh cắt qua các tile ---------- */
const mosaic = $('[data-mosaic]');
if (mosaic) {
  const layout = () => {
    const box = mosaic.getBoundingClientRect();
    $$('.piece', mosaic).forEach(p => {
      const r = p.getBoundingClientRect();
      p.style.setProperty('--bs', `${box.width}px ${box.height}px`);
      p.style.setProperty('--bp', `${box.left - r.left}px ${box.top - r.top}px`);
    });
    mosaic.classList.add('js-mosaic');
  };
  layout();
  addEventListener('resize', layout);
}

/* ---------- Accordion quy trình ---------- */
$$('[data-acc]').forEach(acc => {
  const items = $$(':scope > li', acc);
  items.forEach(li => $('.acc-btn', li).addEventListener('click', () => {
    items.forEach(o => { o.classList.toggle('open', o === li); $('.acc-btn', o).setAttribute('aria-expanded', String(o === li)); });
  }));
});

/* ---------- Dải ảnh trôi: nhân đôi để chạy liền mạch ---------- */
$$('.strip').forEach(s => { s.innerHTML += s.innerHTML; });

/* ---------- Popup báo giá ---------- */
const modal = $('#rfqModal');
let lastFocus = null;
function openModal(product) {
  lastFocus = document.activeElement;
  syncBoq();
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
const labels = { company: 'Doanh nghiệp', contact: 'Người liên hệ', phone: 'Điện thoại', email: 'Email', product: 'Sản phẩm khác', location: 'Địa điểm giao', spec: 'Yêu cầu kỹ thuật', file_link: 'Link BOQ' };

$$('.lead-form').forEach(form => form.addEventListener('submit', async e => {
  e.preventDefault();
  const status = $('.form-status', form);
  const btn = $('button[type="submit"]', form);
  const data = new FormData(form);
  if (data.get('_gotcha')) return;
  data.delete('_gotcha');
  if (form.id === 'rfqForm' && boq.length) data.append('boq', boq.map(i => `- ${i.name}: ${i.qty}`).join('\n'));
  const subject = `[Website] ${form.dataset.formName} – ${data.get('company') || ''}`;
  status.className = 'form-status';

  if (!FORM_ENDPOINT) {
    const body = [...data.entries()].filter(([, v]) => v).map(([k, v]) => k === 'boq' ? `Danh mục BOQ:\n${v}` : `${labels[k] || k}: ${v}`).join('\n');
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
    status.textContent = 'Đã gửi yêu cầu. Phạm Gia Global sẽ liên hệ lại sớm nhất.';
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
  /* Menu mobile bắt đầu ngay dưới hàng header */
  $('#navMenu').style.top = `${$('#siteHeader').getBoundingClientRect().bottom + 6}px`;
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
$$('.dd-toggle').forEach(btn => btn.addEventListener('click', () => {
  const li = btn.closest('.has-dd');
  const open = li.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
}));
$$('.nav-menu a').forEach(a => a.addEventListener('click', () => { closeMenu(); a.blur(); }));

/* ---------- Xuất hiện khi cuộn: các phần trong một khối lần lượt cách nhau 70ms ---------- */
const reveal = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); reveal.unobserve(en.target); }
}), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
$$('section, .board').forEach(sec => $$(':scope > .reveal, :scope .reveal', sec).forEach((el, i) => {
  if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', `${Math.min(i, 6) * 70}ms`);
}));
$$('.reveal').forEach(el => reveal.observe(el));

/* Mở từ trang khác với #mục: cuộn đúng mục sau khi trang dựng xong */
if (location.hash) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) addEventListener('load', () => target.scrollIntoView({ behavior: 'auto' }));
}

syncBoq();
$('#year').textContent = new Date().getFullYear();
