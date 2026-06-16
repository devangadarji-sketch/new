// ─── Product Catalog ────────────────────────────────────────────────────────
const PRODUCTS = [
  { id:1,  name:'Organic Cotton Tee',      price:39.99,  original:54.99,  category:'clothing',     rating:4.8, reviews:124, bg:'#bbf7d0', icon:'👕', badge:'Bestseller',
    desc:'Crafted from 100% GOTS-certified organic cotton. Breathable, durable, and kind to the planet. Available in six sizes.',
    colors:['#2d6a4f','#1e3a5f','#fff8f0','#e74c3c'], sizes:['XS','S','M','L','XL','XXL'] },
  { id:2,  name:'Bamboo Water Bottle',     price:29.99,  original:null,   category:'accessories',  rating:4.6, reviews:89,  bg:'#bae6fd', icon:'💧', badge:null,
    desc:'Double-walled bamboo insulation keeps drinks cold 24 h and hot 12 h. BPA-free stainless steel interior.',
    colors:['#0369a1','#064e3b','#7c3aed'], sizes:['500ml','750ml','1L'] },
  { id:3,  name:'Recycled Yoga Mat',       price:89.99,  original:109.99, category:'sports',       rating:4.9, reviews:212, bg:'#e9d5ff', icon:'🧘', badge:'New',
    desc:'6mm thick mat made from recycled rubber. Non-slip surface, alignment guides, and eco carry strap included.',
    colors:['#7c3aed','#059669','#f59e0b'], sizes:['Standard','Wide'] },
  { id:4,  name:'Hemp Canvas Backpack',    price:119.99, original:null,   category:'bags',         rating:4.7, reviews:67,  bg:'#fef3c7', icon:'🎒', badge:null,
    desc:'Made from 100% hemp canvas with recycled PET lining. 28L capacity, laptop sleeve, and lifetime repair guarantee.',
    colors:['#92400e','#1f2937','#064e3b'], sizes:['One Size'] },
  { id:5,  name:'Solar Phone Charger',     price:59.99,  original:79.99,  category:'electronics',  rating:4.5, reviews:145, bg:'#fde68a', icon:'⚡', badge:'Sale',
    desc:'20,000 mAh portable solar panel charger. Charges two devices simultaneously. IP67 waterproof rating.',
    colors:['#1f2937','#065f46'], sizes:['One Size'] },
  { id:6,  name:'Eco Running Shoes',       price:149.99, original:null,   category:'footwear',     rating:4.8, reviews:198, bg:'#99f6e4', icon:'👟', badge:'Bestseller',
    desc:'Upper made from recycled ocean plastic bottles. Algae-based midsole foam. Carbon-neutral production.',
    colors:['#0f766e','#1e3a5f','#f97316','#111827'], sizes:['6','7','8','9','10','11','12'] },
  { id:7,  name:'Bamboo Sunglasses',       price:49.99,  original:64.99,  category:'accessories',  rating:4.4, reviews:54,  bg:'#fed7aa', icon:'🕶️', badge:null,
    desc:'Handcrafted bamboo frames with polarised UV400 lenses. Lightweight and hypoallergenic. Comes in a recycled case.',
    colors:['#92400e','#1f2937','#7c2d12'], sizes:['One Size'] },
  { id:8,  name:'Organic Face Serum',      price:34.99,  original:null,   category:'beauty',       rating:4.9, reviews:301, bg:'#fce7f3', icon:'✨', badge:'Top Rated',
    desc:'Cold-pressed rosehip and jojoba oil serum. Cruelty-free, vegan, certified organic. 30ml glass dropper bottle.',
    colors:['#be185d','#7c3aed'], sizes:['30ml','50ml'] },
  { id:9,  name:'Recycled Fleece Hoodie',  price:79.99,  original:99.99,  category:'clothing',     rating:4.7, reviews:88,  bg:'#e2e8f0', icon:'🧥', badge:'Sale',
    desc:'Made from 100% recycled post-consumer plastic bottles. Warm, soft, and machine washable. Unisex fit.',
    colors:['#334155','#064e3b','#7c2d12','#1e40af'], sizes:['XS','S','M','L','XL','XXL'] },
  { id:10, name:'Wooden Watch',            price:199.99, original:249.99, category:'accessories',  rating:4.8, reviews:156, bg:'#d6b89a', icon:'⌚', badge:null,
    desc:'Handcrafted from sustainably sourced maple wood. Japanese Miyota movement. Hypoallergenic, water-resistant to 30m.',
    colors:['#92400e','#1f2937','#064e3b'], sizes:['One Size'] },
  { id:11, name:'Cork Yoga Block',         price:19.99,  original:null,   category:'sports',       rating:4.6, reviews:43,  bg:'#ffedd5', icon:'🧱', badge:null,
    desc:'Dense cork yoga block provides firm, stable support. Naturally antimicrobial and moisture-resistant.',
    colors:['#c2410c'], sizes:['Standard'] },
  { id:12, name:'Beeswax Wrap Set',        price:24.99,  original:29.99,  category:'kitchen',      rating:4.7, reviews:189, bg:'#fef08a', icon:'🌍', badge:'Eco Pick',
    desc:'Set of 3 reusable beeswax food wraps (S/M/L). Replaces cling film. Washable and compostable.',
    colors:['#a16207','#166534'], sizes:['S/M/L Set'] },
];

const CATEGORIES = [
  { id:'all',         label:'All Products',  icon:'🌿' },
  { id:'clothing',    label:'Clothing',      icon:'👕' },
  { id:'accessories', label:'Accessories',   icon:'🎁' },
  { id:'sports',      label:'Sports',        icon:'🏃' },
  { id:'bags',        label:'Bags',          icon:'🎒' },
  { id:'electronics', label:'Electronics',   icon:'⚡' },
  { id:'footwear',    label:'Footwear',      icon:'👟' },
  { id:'beauty',      label:'Beauty',        icon:'✨' },
  { id:'kitchen',     label:'Kitchen',       icon:'🌍' },
];

// ─── Auth ────────────────────────────────────────────────────────────────────
const Auth = {
  login(user)  { localStorage.setItem('eco_user', JSON.stringify(user)); },
  logout()     { localStorage.removeItem('eco_user'); window.location.href = 'login.html'; },
  user()       { try { return JSON.parse(localStorage.getItem('eco_user')); } catch { return null; } },
  guard()      { if (!this.user()) { window.location.href = 'login.html'; return false; } return true; },
};

// ─── Cart ────────────────────────────────────────────────────────────────────
const Cart = {
  get()  { try { return JSON.parse(localStorage.getItem('eco_cart') || '[]'); } catch { return []; } },
  save(items) { localStorage.setItem('eco_cart', JSON.stringify(items)); this.updateBadge(); },

  add(product, qty = 1, variant = {}) {
    const items = this.get();
    const key = `${product.id}|${variant.color || ''}|${variant.size || ''}`;
    const existing = items.find(i => i.key === key);
    if (existing) existing.qty += qty;
    else items.push({ key, product, qty, variant });
    this.save(items);
    showToast(`<strong>${product.name}</strong> added to cart`, 'success');
  },

  remove(key) {
    this.save(this.get().filter(i => i.key !== key));
  },

  updateQty(key, qty) {
    const items = this.get();
    const item = items.find(i => i.key === key);
    if (item) { item.qty = Math.max(1, qty); }
    this.save(items);
  },

  count()  { return this.get().reduce((s, i) => s + i.qty, 0); },
  subtotal() { return this.get().reduce((s, i) => s + i.product.price * i.qty, 0); },
  clear()  { localStorage.removeItem('eco_cart'); this.updateBadge(); },

  updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const n = this.count();
    badge.textContent = n;
    badge.style.display = n > 0 ? 'flex' : 'none';
  },
};

// ─── Utilities ───────────────────────────────────────────────────────────────
function fmt(n)       { return '$' + Number(n).toFixed(2); }
function pct(a, b)    { return Math.round((1 - a / b) * 100); }
function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx){ return [...(ctx || document).querySelectorAll(sel)]; }

function stars(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    const full = i < Math.floor(rating);
    const half = !full && i < rating;
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="${full || half ? '#f59e0b' : '#e2e8f0'}" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
  }).join('');
}

function showToast(html, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.innerHTML = html;
  document.getElementById('toasts')?.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 350); }, 3200);
}

function productCard(p) {
  const disc = p.original ? `<span class="badge badge--sale">-${pct(p.price, p.original)}%</span>` : '';
  const badg = p.badge && !p.original ? `<span class="badge badge--${p.badge === 'Bestseller' ? 'best' : p.badge === 'New' ? 'new' : p.badge === 'Top Rated' ? 'top' : 'eco'}">${p.badge}</span>` : '';
  return `
  <article class="product-card" data-id="${p.id}">
    <a href="product.html?id=${p.id}" class="product-card__img-wrap">
      <div class="product-card__img" style="background:${p.bg}">
        <span>${p.icon}</span>
      </div>
      <div class="product-card__badges">${disc}${badg}</div>
      <button class="product-card__quick" onclick="event.preventDefault();Cart.add(PRODUCTS.find(x=>x.id===${p.id}),1,{})" aria-label="Add to cart">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        Add to cart
      </button>
    </a>
    <div class="product-card__body">
      <span class="product-card__cat">${p.category}</span>
      <h3 class="product-card__name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="product-card__meta">
        <div class="product-card__stars">${stars(p.rating)}<span>${p.rating} (${p.reviews})</span></div>
        <div class="product-card__price">
          ${p.original ? `<s>${fmt(p.original)}</s>` : ''}
          <strong>${fmt(p.price)}</strong>
        </div>
      </div>
    </div>
  </article>`;
}

// ─── Header ──────────────────────────────────────────────────────────────────
function initHeader() {
  Cart.updateBadge();
  const user = Auth.user();
  const userWrap = document.getElementById('user-area');
  if (!userWrap) return;
  if (user) {
    userWrap.innerHTML = `
      <div class="user-menu">
        <button class="user-menu__trigger">
          <span class="user-menu__avatar">${user.name.charAt(0).toUpperCase()}</span>
          <span>${user.name.split(' ')[0]}</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="user-menu__drop">
          <a href="confirmation.html">My Orders</a>
          <a href="#" onclick="Auth.logout()">Logout</a>
        </div>
      </div>`;
    userWrap.querySelector('.user-menu__trigger').addEventListener('click', () => {
      userWrap.querySelector('.user-menu__drop').classList.toggle('open');
    });
  } else {
    userWrap.innerHTML = `<a href="login.html" class="btn btn--outline btn--sm">Login</a>`;
  }

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  toggle?.addEventListener('click', () => navLinks?.classList.toggle('open'));
}

// ─── Checkout flow state ─────────────────────────────────────────────────────
const Checkout = {
  save(data)   { localStorage.setItem('eco_checkout', JSON.stringify(data)); },
  get()        { try { return JSON.parse(localStorage.getItem('eco_checkout') || '{}'); } catch { return {}; } },
  saveOrder(o) { localStorage.setItem('eco_order', JSON.stringify(o)); },
  getOrder()   { try { return JSON.parse(localStorage.getItem('eco_order') || '{}'); } catch { return {}; } },
};
