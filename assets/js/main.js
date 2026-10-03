/* =========================================================================
   Canopy Hollow — site behaviour
   Content lives in site-data.js; you normally don't need to edit this file.
   ========================================================================= */
(function () {
  "use strict";

  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const has = (v) => v !== null && v !== undefined && String(v).trim() !== "";
  const page = document.body.dataset.page;

  /* ---------- Icons ---------- */
  const I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4A21 21 0 0 0 14.3 4c-2.3 0-3.8 1.4-3.8 3.9v2.6H8v3h2.5V21z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v2.6a6.6 6.6 0 0 1-3.8-1.2v5.6c0 7-7.6 9.2-10.7 4.2-2-3.2-.8-8.9 5.6-9.1v2.9a5 5 0 0 0-1.4.4c-1.4.5-2.2 1.4-2 3 .5 3.1 6.1 4 5.7-2.1V3z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m9 5 7 7-7 7"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19c3-4 6-7 10-9"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7zM19 16c.2 1.5.8 2.1 2.3 2.3-1.5.2-2.1.8-2.3 2.3-.2-1.5-.8-2.1-2.3-2.3 1.5-.2 2.1-.8 2.3-2.3z"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>',
    drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/></svg>',
    bowl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 12h18a9 9 0 0 1-18 0zM9 8c0-2 2-2 2-4M14 8c0-2 2-2 2-4"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="8.5" r="3.2"/><path d="M3 19c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><circle cx="17" cy="9.5" r="2.5"/><path d="M16.5 14c2.4.2 4 1.7 4.5 4.5"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>',
  };
  window.ICONS = I;

  /* ---------- Logo mark (original marmoset face with ear tufts) ---------- */
  const LOGO = `<svg class="logo-mark" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
    <circle cx="24" cy="24" r="22.5" opacity=".55"/>
    <path d="M17 22c-3-1.5-6-4-8-8M16.5 24.5c-3.5-.5-7-2-9.5-4.5M17 27c-3 .5-6 0-8.5-1.5"/>
    <path d="M31 22c3-1.5 6-4 8-8M31.5 24.5c3.5-.5 7-2 9.5-4.5M31 27c3 .5 6 0 8.5-1.5"/>
    <path d="M24 16.5c4.4 0 7.5 3.6 7.5 8.2 0 5-3.4 8.8-7.5 8.8s-7.5-3.8-7.5-8.8c0-4.6 3.1-8.2 7.5-8.2z"/>
    <path d="M22 18.6c.6.9 1.3 1.3 2 1.3s1.4-.4 2-1.3" opacity=".8"/>
    <circle cx="21.2" cy="24.6" r="1.25" fill="currentColor" stroke="none"/>
    <circle cx="26.8" cy="24.6" r="1.25" fill="currentColor" stroke="none"/>
    <path d="M23 29.2c.6.4 1.4.4 2 0"/>
  </svg>`;
  const logoHTML = () => `<a class="logo" href="index.html" aria-label="${esc(S.brand.name)} home">${LOGO}
    <span class="logo-text"><span class="logo-name">${esc(S.brand.name)}</span><span class="logo-sub">${esc(S.brand.tagline)}</span></span></a>`;

  /* ---------- Photo placeholders ----------
     Any <img data-img="path"> (or one built by img()) falls back to a soft
     branded placeholder until the real photo is added to /images.          */
  const tones = [["#2f4a37", "#6a4a33"], ["#8b6a4f", "#e5d7c0"], ["#4c6b53", "#d6c3a3"], ["#23382a", "#8b6a4f"], ["#b8975a", "#f1e9db"]];
  const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  function placeholder(path) {
    const [a, b] = tones[hash(path) % tones.length];
    const file = path.split("/").pop();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
      <radialGradient id="r" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      <rect width="800" height="1000" fill="url(#g)"/><rect width="800" height="1000" fill="url(#r)"/>
      <g transform="translate(320 360) scale(3.35)" fill="none" stroke="#fffdf9" stroke-opacity=".55" stroke-width="1" stroke-linecap="round">
        <path d="M17 22c-3-1.5-6-4-8-8M16.5 24.5c-3.5-.5-7-2-9.5-4.5M17 27c-3 .5-6 0-8.5-1.5M31 22c3-1.5 6-4 8-8M31.5 24.5c3.5-.5 7-2 9.5-4.5M31 27c3 .5 6 0 8.5-1.5"/>
        <path d="M24 16.5c4.4 0 7.5 3.6 7.5 8.2 0 5-3.4 8.8-7.5 8.8s-7.5-3.8-7.5-8.8c0-4.6 3.1-8.2 7.5-8.2z"/>
        <circle cx="21.2" cy="24.6" r="1.1" fill="#fffdf9" fill-opacity=".55" stroke="none"/><circle cx="26.8" cy="24.6" r="1.1" fill="#fffdf9" fill-opacity=".55" stroke="none"/></g>
      <text x="400" y="560" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="30" fill="#fffdf9" fill-opacity=".75">Your photo here</text>
      <text x="400" y="600" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" letter-spacing="3" fill="#fffdf9" fill-opacity=".55">${esc(file).toUpperCase()}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function hydrate(img) {
    const path = img.dataset.img;
    if (!path || img.dataset.hydrated) return;
    img.dataset.hydrated = "1";
    img.onerror = () => { img.onerror = null; img.src = placeholder(path); img.classList.add("is-placeholder"); };
    img.src = path;
  }
  const img = (path, alt = "", attrs = "") =>
    `<img data-img="${esc(path)}" alt="${esc(alt)}" loading="lazy" decoding="async" ${attrs}>`;
  const hydrateAll = (root = document) => $$("img[data-img]", root).forEach(hydrate);

  /* ---------- Header / footer ---------- */
  const NAV = [
    ["home", "index.html", "Home"],
    ["babies", "available-babies.html", "Available Babies"],
    ["monkeys", "our-monkeys.html", "Our Monkeys"],
    ["about", "about-us.html", "About Us"],
    ["contact", "contact-us.html", "Contact Us"],
  ];
  const cur = (k) => (k === page ? ' aria-current="page"' : "");
  const C = S.contact;
  const waLink = (text) => `https://wa.me/${C.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
  const socialsHTML = () =>
    Object.entries(C.social || {}).filter(([, u]) => has(u))
      .map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${k}">${I[k] || ""}</a>`).join("");

  function buildHeader() {
    const mount = $("#site-header");
    if (!mount) return;
    const mode = document.body.dataset.header === "transparent" ? "is-transparent" : "is-solid";
    mount.outerHTML = `
      <header class="site-header ${mode}" id="header">
        <div class="wrap">
          ${logoHTML()}
          <nav class="nav" aria-label="Main">${NAV.map(([k, h, t]) => `<a href="${h}"${cur(k)}>${t}</a>`).join("")}</nav>
          <div class="header-actions">
            <button class="cart-toggle" aria-label="Open cart">${I.bag}<span class="cart-count is-empty">0</span></button>
            <a class="btn btn-primary header-cta" href="available-babies.html">Available Babies</a>
          </div>
          <button class="menu-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
        </div>
      </header>
      <div class="mobile-menu" aria-hidden="true">
        ${NAV.map(([k, h, t]) => `<a class="m-link" href="${h}"${cur(k)}>${t}</a>`).join("")}
        <div class="m-foot">
          <a class="btn btn-gold" href="available-babies.html">Available Babies</a>
          ${has(C.phone) ? `<a href="tel:${esc(C.phoneLink)}">${esc(C.phone)}</a>` : ""}
          ${has(C.email) ? `<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>` : ""}
        </div>
      </div>`;

    const header = $("#header");
    const transparent = mode === "is-transparent";
    const onScroll = () => {
      const scrolled = window.scrollY > 40;
      header.classList.toggle("is-scrolled", scrolled);
      if (transparent) header.classList.toggle("is-transparent", !scrolled);
      const fab = $(".fab-wa");
      if (fab) fab.classList.toggle("is-visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toggle = $(".menu-toggle");
    const setMenu = (open) => {
      document.documentElement.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      $(".mobile-menu").setAttribute("aria-hidden", !open);
    };
    toggle.addEventListener("click", () => setMenu(!document.documentElement.classList.contains("menu-open")));
    $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  }

  function buildFooter() {
    const mount = $("#site-footer");
    if (!mount) return;
    const year = new Date().getFullYear();
    mount.outerHTML = `
      <footer class="site-footer">
        <div class="wrap">
          <div class="footer-grid">
            <div>
              ${logoHTML()}
              <p style="max-width:38ch">${esc(S.brand.description)}</p>
              <div class="socials">${socialsHTML()}</div>
            </div>
            <div>
              <h5>Explore</h5>
              <ul>${NAV.map(([, h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h5>Get in touch</h5>
              <ul class="footer-contact">
                ${has(C.phone) ? `<li>${I.phone}<a href="tel:${esc(C.phoneLink)}">${esc(C.phone)}</a></li>` : ""}
                ${has(C.email) ? `<li>${I.mail}<a href="mailto:${esc(C.email)}">${esc(C.email)}</a></li>` : ""}
                ${has(C.whatsapp) ? `<li>${I.whatsapp}<a href="${waLink()}" target="_blank" rel="noopener">WhatsApp us</a></li>` : ""}
                ${has(C.location) ? `<li>${I.pin}<span>${esc(C.location)}</span></li>` : ""}
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; ${year} ${esc(S.brand.name)}. All rights reserved.</span>
            <nav><button data-policy="privacy">Privacy Policy</button><button data-policy="terms">Terms</button></nav>
          </div>
        </div>
      </footer>
      ${has(C.whatsapp) ? `<a class="fab-wa" href="${waLink("Hi! I'd like to learn more about your marmosets.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${I.whatsapp}</a>` : ""}`;
  }

  /* ---------- Privacy / Terms (dialogs — no extra pages) ---------- */
  const POLICIES = {
    privacy: `<h2>Privacy Policy</h2>
      <p><em>Template — please review and adapt to your situation and local law.</em></p>
      <h4>What we collect</h4><p>When you send an inquiry we receive the details you choose to share: your name, email, phone number, location and message.</p>
      <h4>How we use it</h4><p>We use this information only to reply to your inquiry and to communicate with you about our marmosets. We do not sell or rent your information.</p>
      <h4>Your choices</h4><p>You can ask us at any time to update or delete the information you have sent us by contacting ${esc(C.email)}.</p>`,
    terms: `<h2>Terms</h2>
      <p><em>Template — please review and adapt to your situation and local law.</em></p>
      <h4>Information on this site</h4><p>Descriptions, photos, availability and prices are provided for general information and may change at any time without notice.</p>
      <h4>Inquiries</h4><p>Submitting an inquiry does not reserve or purchase an animal. Every placement is discussed personally with us before any arrangement is made.</p>
      <h4>Regulations</h4><p>Laws concerning the ownership, transport and keeping of primates differ by country, state and municipality. Prospective owners are responsible for confirming that they may legally keep a marmoset where they live.</p>`,
  };
  function buildPolicy() {
    const el = document.createElement("div");
    el.className = "policy";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.innerHTML = `<div class="policy-box"><button class="detail-close" aria-label="Close">${I.close}</button><div class="policy-body"></div></div>`;
    document.body.appendChild(el);
    const close = () => el.classList.remove("is-open");
    el.addEventListener("click", (e) => { if (e.target === el || e.target.closest(".detail-close")) close(); });
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-policy]");
      if (!b) return;
      $(".policy-body", el).innerHTML = POLICIES[b.dataset.policy];
      el.classList.add("is-open");
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function reveal(root = document) {
    const els = $$(".reveal:not(.is-in)", root);
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("is-in"));
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Babies ---------- */
  const STATUS = { available: "Available", reserved: "Reserved", sold: "Sold Out", "coming-soon": "Coming Soon" };
  const statusTag = (s) => `<span class="status ${esc(s)}">${STATUS[s] || esc(s)}</span>`;
  const inquireHref = (b) => `contact-us.html?baby=${encodeURIComponent(b.id)}`;
  // Price comes from the baby's sex unless a custom price is set
  const priceOf = (b) => {
    if (b.status === "sold") return "";
    if (has(b.price)) return b.price;
    const p = S.pricing || {};
    const sex = String(b.sex || "").trim().toLowerCase();
    if (sex.startsWith("f")) return p.female;
    if (sex.startsWith("m")) return p.male;
    return has(p.male) && has(p.female) ? `${p.male} – ${p.female}` : "";
  };

  /* ---------- Cart ----------
     Stored in the visitor's browser. Checkout sends a reservation request
     to the breeder — no payment is taken on the site.                       */
  const CART_KEY = "canopy-hollow-cart";
  const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
    "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming",
  ];
  const COUNTRIES = [
    "United States", "Canada", "Mexico", "Puerto Rico", "United Kingdom", "Ireland", "Australia", "New Zealand",
    "Germany", "France", "Spain", "Italy", "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway",
    "Denmark", "Finland", "Poland", "Portugal", "Brazil", "Argentina", "Chile", "Colombia", "South Africa",
    "United Arab Emirates", "Saudi Arabia", "India", "Japan", "South Korea", "Singapore", "Philippines", "Other",
  ];
  const canBuy = (b) => b && b.status === "available";
  const cartIds = () => {
    let ids = [];
    try { ids = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch {}
    return ids.filter((id) => canBuy(S.babies.find((b) => b.id === id)));
  };
  const cartItems = () => cartIds().map((id) => S.babies.find((b) => b.id === id));
  const saveCart = (ids) => { try { localStorage.setItem(CART_KEY, JSON.stringify(ids)); } catch {} updateCartUI(); };
  const inCart = (id) => cartIds().includes(id);
  const toggleCart = (id) => {
    const ids = cartIds();
    saveCart(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
  };
  const cartTotal = (items) => {
    let sum = 0, unknown = false;
    items.forEach((b) => {
      const p = priceOf(b);
      if (!has(p) || p.includes("–")) unknown = true;
      else sum += parseInt(p.replace(/[^\d]/g, ""), 10) || 0;
    });
    return "$" + sum.toLocaleString("en-US") + (unknown ? " + TBC" : "");
  };
  const DEPOSIT = (S.pricing || {}).deposit;
  const depositRow = () => has(DEPOSIT) ? `<div class="cart-total cart-deposit"><span>Deposit</span><strong>${esc(DEPOSIT)}</strong></div>` : "";
  const cartBtn = (b, cls = "btn-primary") =>
    `<button type="button" class="btn ${cls} cart-btn" data-cart-add="${esc(b.id)}">${I.bag}<span>Add to Cart</span></button>`;

  function updateCartUI() {
    const n = cartIds().length;
    $$(".cart-count").forEach((el) => { el.textContent = n; el.classList.toggle("is-empty", !n); });
    $$("[data-cart-add]").forEach((btn) => {
      const on = inCart(btn.dataset.cartAdd);
      btn.classList.toggle("is-added", on);
      btn.innerHTML = on ? `${I.check}<span>In Cart</span>` : `${I.bag}<span>Add to Cart</span>`;
      btn.setAttribute("aria-pressed", on);
    });
    renderCartDrawer();
  }

  function buildCart() {
    const el = document.createElement("div");
    el.className = "cart-drawer";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Your cart");
    el.innerHTML = `<div class="detail-backdrop"></div><aside class="cart-panel"></aside>`;
    document.body.appendChild(el);
    document.addEventListener("click", (e) => {
      const add = e.target.closest("[data-cart-add]");
      if (add) {
        e.preventDefault();
        const adding = !inCart(add.dataset.cartAdd);
        toggleCart(add.dataset.cartAdd);
        if (adding) openCart();
        return;
      }
      const rm = e.target.closest("[data-cart-remove]");
      if (rm) { saveCart(cartIds().filter((x) => x !== rm.dataset.cartRemove)); return; }
      if (e.target.closest(".cart-toggle")) { openCart(); return; }
      if (e.target.closest(".cart-close") || (e.target.classList.contains("detail-backdrop") && e.target.parentElement === el)) closeCart();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });
  }
  function renderCartDrawer() {
    const panel = $(".cart-panel");
    if (!panel) return;
    const items = cartItems();
    panel.innerHTML = `
      <div class="cart-head"><h3>Your Cart <span>(${items.length})</span></h3><button class="detail-close cart-close" aria-label="Close cart">${I.close}</button></div>
      ${items.length ? `
        <ul class="cart-list">${items.map((b) => `
          <li class="cart-item">
            <div class="frame">${img(b.photos?.[0] || "", b.name)}</div>
            <div class="cart-item-info"><strong>${esc(b.name)}</strong><small>${esc([b.species, b.sex, b.age].filter(has).join(" · "))}</small><span class="cart-price">${esc(priceOf(b))}</span></div>
            <button class="cart-remove" data-cart-remove="${esc(b.id)}" aria-label="Remove ${esc(b.name)}">${I.close}</button>
          </li>`).join("")}
        </ul>
        <div class="cart-foot">
          <div class="cart-total"><span>Subtotal</span><strong>${cartTotal(items)}</strong></div>${depositRow()}
          <a class="btn btn-primary btn-block" href="contact-us.html?checkout=1">Proceed to Checkout ${I.arrow}</a>
          <a class="btn btn-outline btn-block" href="available-babies.html">Continue Browsing</a>
        </div>`
      : `<div class="cart-empty"><span class="value-icon">${I.bag}</span><p>Your cart is empty.</p><a class="btn btn-outline" href="available-babies.html">Browse Available Babies</a></div>`}`;
    hydrateAll(panel);
  }
  const openCart = () => { $(".cart-drawer").classList.add("is-open"); document.documentElement.style.overflow = "hidden"; };
  function closeCart() {
    const el = $(".cart-drawer");
    if (!el || !el.classList.contains("is-open")) return;
    el.classList.remove("is-open");
    if (!$("#baby-detail.is-open")) document.documentElement.style.overflow = "";
  }

  function babyCard(b, i, onHome) {
    const facts = [["Sex", b.sex], ["Age", b.age], ["Status", STATUS[b.status]]].filter(([, v]) => has(v));
    const detailsHref = `available-babies.html#${encodeURIComponent(b.id)}`;
    const price = priceOf(b);
    return `
      <article class="baby-card reveal reveal-d${i % 4}" data-status="${esc(b.status)}">
        <a class="frame" href="${detailsHref}" data-open="${esc(b.id)}" aria-label="View ${esc(b.name)}">
          ${statusTag(b.status)}${img(b.photos?.[0] || "", b.name)}
        </a>
        <div class="baby-body">
          <h3 class="baby-name">${esc(b.name)}</h3>
          ${has(b.species) ? `<div class="baby-species">${esc(b.species)}</div>` : ""}
          <dl class="facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
          ${onHome
            ? `<div class="baby-foot">${has(price) ? `<div class="price"><small>Price</small>${esc(price)}</div>` : "<span></span>"}
                 <a class="btn btn-outline" href="${detailsHref}">View Details</a></div>`
            : `<div class="baby-foot">${has(price) ? `<div class="price"><small>Price</small>${esc(price)}</div>` : ""}</div>
               <div class="baby-actions">
                 <a class="btn btn-outline" href="${detailsHref}" data-open="${esc(b.id)}">View Details</a>
                 ${canBuy(b)
                   ? cartBtn(b)
                   : b.status === "reserved" || b.status === "sold"
                     ? `<a class="btn btn-primary" href="contact-us.html?baby=waitlist">Join Waitlist</a>`
                     : `<a class="btn btn-primary" href="${inquireHref(b)}">Inquire Now</a>`}
               </div>`}
        </div>
      </article>`;
  }

  function renderFeatured() {
    const grid = $("#featured-babies");
    if (!grid) return;
    const list = S.babies.filter((b) => b.featured).slice(0, 4);
    grid.innerHTML = list.length ? list.map((b, i) => babyCard(b, i, true)).join("")
      : `<p class="empty-state">New babies will be announced here soon.</p>`;
  }

  function renderCatalogue() {
    const grid = $("#babies-grid");
    if (!grid) return;
    const filters = $("#baby-filters");
    const counts = S.babies.reduce((m, b) => ((m[b.status] = (m[b.status] || 0) + 1), m), {});
    const opts = [["all", "All", S.babies.length], ...Object.keys(STATUS).filter((k) => counts[k]).map((k) => [k, STATUS[k], counts[k]])];
    filters.innerHTML = opts.map(([k, t, n], i) => `<button class="filter${i ? "" : " is-active"}" data-filter="${k}">${t}<span class="count">${n}</span></button>`).join("");

    const draw = (f) => {
      const list = S.babies.filter((b) => f === "all" || b.status === f);
      grid.innerHTML = list.length ? list.map((b, i) => babyCard(b, i, false)).join("")
        : `<p class="empty-state">No babies in this category right now — please check back or contact us.</p>`;
      hydrateAll(grid);
      reveal(grid);
      updateCartUI();
    };
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", filters).forEach((x) => x.classList.toggle("is-active", x === b));
      draw(b.dataset.filter);
    });
    draw("all");

    // detail panel
    grid.addEventListener("click", (e) => {
      const a = e.target.closest("[data-open]");
      if (!a) return;
      e.preventDefault();
      history.replaceState(null, "", "#" + a.dataset.open);
      openDetail(a.dataset.open);
    });
    const fromHash = () => { const id = decodeURIComponent(location.hash.slice(1)); if (S.babies.some((b) => b.id === id)) openDetail(id); };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  }

  function openDetail(id) {
    const b = S.babies.find((x) => x.id === id);
    if (!b) return;
    let el = $("#baby-detail");
    if (!el) {
      el = document.createElement("div");
      el.id = "baby-detail";
      el.className = "detail";
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-modal", "true");
      document.body.appendChild(el);
      el.addEventListener("click", (e) => {
        if (e.target.closest(".detail-close") || e.target.classList.contains("detail-backdrop")) closeDetail();
      });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$(".lightbox.is-open")) closeDetail(); });
    }
    const photos = (b.photos || []).filter(has);
    const spec = [["Species", b.species], ["Sex", b.sex], ["Age", b.age], ["Date of Birth", b.dob], ["Status", STATUS[b.status]], ["Price", priceOf(b)]].filter(([, v]) => has(v));
    el.innerHTML = `
      <div class="detail-backdrop"></div>
      <div class="detail-panel">
        <button class="detail-close" aria-label="Close">${I.close}</button>
        <div class="detail-grid">
          <div class="detail-gallery">
            <div class="frame main" data-lb="0">${img(photos[0] || "", b.name)}</div>
            ${photos.length > 1 ? `<div class="thumbs">${photos.map((p, i) => `<button class="${i ? "" : "is-active"}" data-i="${i}" aria-label="Photo ${i + 1}">${img(p, "")}</button>`).join("")}</div>` : ""}
          </div>
          <div class="detail-info">
            ${statusTag(b.status)}
            <h2>${esc(b.name)}</h2>
            ${has(b.species) ? `<div class="baby-species">${esc(b.species)}</div>` : ""}
            <dl class="spec">${spec.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
            ${has(b.personality) ? `<h4>Personality</h4><p class="personality">${esc(b.personality)}</p>` : ""}
            ${(b.details || []).filter(has).length ? `<h4>Additional information</h4><ul>${b.details.filter(has).map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
            <div class="detail-cta">
              <p>Every placement starts with a personal conversation. Send us a message and we'll get back to you with more information about ${esc(b.name)}.</p>
              <div class="btn-row">
                ${canBuy(b) ? cartBtn(b, "btn-gold") : ""}
                ${b.status === "sold"
                  ? `<a class="btn btn-gold" href="contact-us.html?baby=waitlist">Ask About Future Babies ${I.arrow}</a>`
                  : `<a class="btn ${canBuy(b) ? "btn-ghost" : "btn-gold"}" href="${inquireHref(b)}">Inquire About This Baby ${I.arrow}</a>`}
                ${has(C.whatsapp) ? `<a class="btn btn-whatsapp" href="${waLink(`Hi! I'm interested in ${b.name}.`)}" target="_blank" rel="noopener">${I.whatsapp} WhatsApp</a>` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>`;
    hydrateAll(el);
    updateCartUI();
    let current = 0;
    const main = $(".frame.main", el);
    $$(".thumbs button", el).forEach((t) => t.addEventListener("click", () => {
      current = +t.dataset.i;
      $$(".thumbs button", el).forEach((x) => x.classList.toggle("is-active", x === t));
      const m = $("img", main);
      m.dataset.hydrated = ""; m.dataset.img = photos[current]; m.classList.remove("is-placeholder"); hydrate(m);
    }));
    main.addEventListener("click", () => openLightbox(photos.map((src) => ({ src, caption: b.name, group: STATUS[b.status] })), current));
    requestAnimationFrame(() => el.classList.add("is-open"));
    document.documentElement.style.overflow = "hidden";
    $(".detail-panel", el).scrollTop = 0;
    $(".detail-close", el).focus({ preventScroll: true });
  }
  function closeDetail() {
    const el = $("#baby-detail");
    if (!el || !el.classList.contains("is-open")) return;
    el.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    history.replaceState(null, "", location.pathname + location.search);
  }

  /* ---------- Lightbox ---------- */
  let lb, lbItems = [], lbIndex = 0;
  function ensureLightbox() {
    if (lb) return;
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML = `<div class="lb-stage"><img alt=""></div><div class="lb-caption"></div>
      <button class="lb-btn lb-close" aria-label="Close">${I.close}</button>
      <button class="lb-btn lb-prev" aria-label="Previous">${I.left}</button>
      <button class="lb-btn lb-next" aria-label="Next">${I.right}</button>`;
    document.body.appendChild(lb);
    $(".lb-close", lb).onclick = closeLightbox;
    $(".lb-prev", lb).onclick = () => showLb(lbIndex - 1);
    $(".lb-next", lb).onclick = () => showLb(lbIndex + 1);
    lb.addEventListener("click", (e) => { if (e.target.classList.contains("lb-stage")) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showLb(lbIndex - 1);
      if (e.key === "ArrowRight") showLb(lbIndex + 1);
    });
    let x0 = null;
    lb.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }
  function showLb(i) {
    lbIndex = (i + lbItems.length) % lbItems.length;
    const it = lbItems[lbIndex];
    const im = $(".lb-stage img", lb);
    im.dataset.hydrated = ""; im.dataset.img = it.src; im.alt = it.caption || ""; hydrate(im);
    $(".lb-caption", lb).innerHTML = `${it.group ? `<small>${esc(it.group)}</small>` : ""}${esc(it.caption || "")}`;
    const multi = lbItems.length > 1;
    $(".lb-prev", lb).style.display = $(".lb-next", lb).style.display = multi ? "" : "none";
  }
  function openLightbox(items, start = 0) {
    if (!items.length) return;
    ensureLightbox();
    lbItems = items;
    showLb(start);
    lb.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.classList.remove("is-open");
    if (!$("#baby-detail.is-open")) document.documentElement.style.overflow = "";
  }

  /* ---------- Home: life grid ---------- */
  function renderLife() {
    const grid = $("#life-grid");
    if (!grid) return;
    const items = S.life.slice(0, 4);
    grid.innerHTML = items.map((p, i) => `
      <figure class="reveal reveal-d${i}"><div class="frame">${img(p.src, p.caption)}</div>
      ${has(p.caption) ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}</figure>`).join("");
  }

  /* ---------- Our Monkeys gallery ---------- */
  const GROUPS = { babies: "Babies", adults: "Adult Monkeys", parents: "Parents", "daily-life": "Daily Life", enrichment: "Play & Enrichment" };
  function renderGallery() {
    const grid = $("#gallery");
    if (!grid) return;
    const filters = $("#gallery-filters");
    const used = Object.keys(GROUPS).filter((g) => S.gallery.some((p) => p.category === g));
    filters.innerHTML = [["all", "All"], ...used.map((g) => [g, GROUPS[g]])]
      .map(([k, t], i) => `<button class="filter${i ? "" : " is-active"}" data-filter="${k}">${t}</button>`).join("");

    grid.innerHTML = used.map((g) => `
      <div class="gallery-group-title" data-group="${g}"><h3>${GROUPS[g]}</h3><span></span></div>
      ${S.gallery.filter((p) => p.category === g).map((p) => `
        <figure class="g-item reveal ${esc(p.size || "")}${has(p.caption) ? " has-caption" : ""}" data-group="${g}" data-src="${esc(p.src)}" data-caption="${esc(p.caption || "")}" tabindex="0">
          <div class="frame">${img(p.src, p.caption || GROUPS[g])}</div>
          <span class="zoom">${I.zoom}</span>
          ${has(p.caption) ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}
        </figure>`).join("")}`).join("");

    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", filters).forEach((x) => x.classList.toggle("is-active", x === b));
      const f = b.dataset.filter;
      $$("[data-group]", grid).forEach((el) => el.classList.toggle("is-hidden", f !== "all" && el.dataset.group !== f));
      $$(".g-item:not(.is-hidden)", grid).forEach((el) => el.classList.add("is-in"));
      window.scrollTo({ top: grid.getBoundingClientRect().top + window.scrollY - 170, behavior: "smooth" });
    });
    const openAt = (fig) => {
      const visible = $$(".g-item:not(.is-hidden)", grid);
      openLightbox(visible.map((f) => ({ src: f.dataset.src, caption: f.dataset.caption, group: GROUPS[f.dataset.group] })), visible.indexOf(fig));
    };
    grid.addEventListener("click", (e) => { const f = e.target.closest(".g-item"); if (f) openAt(f); });
    grid.addEventListener("keydown", (e) => { const f = e.target.closest(".g-item"); if (f && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openAt(f); } });
  }

  /* ---------- About: growing together ---------- */
  function renderGrowing() {
    const el = $("#timeline");
    if (!el) return;
    el.innerHTML = S.growing.map((g, i) => `
      <div class="t-item reveal reveal-d${i % 4}" data-lb="${i}">
        <div class="frame" style="cursor:zoom-in">${img(g.src, g.label)}</div>
        <div class="dot"></div><div class="step">Stage ${String(i + 1).padStart(2, "0")}</div>
        <div class="label">${esc(g.label)}</div>
      </div>`).join("");
    el.addEventListener("click", (e) => {
      const t = e.target.closest(".t-item");
      if (t) openLightbox(S.growing.map((g) => ({ src: g.src, caption: g.label, group: "Growing Together" })), +t.dataset.lb);
    });
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    const cards = $("#contact-cards");
    if (cards) {
      const list = [
        has(C.phone) && ["phone", "Phone", C.phone, `tel:${C.phoneLink}`],
        has(C.email) && ["mail", "Email", C.email, `mailto:${C.email}`],
        has(C.whatsapp) && ["whatsapp", "WhatsApp", "Message us", waLink("Hi! I'd like to learn more about your marmosets.")],
        has(C.location) && ["pin", "Location", C.location, ""],
      ].filter(Boolean);
      cards.innerHTML = list.map(([ic, t, v, href]) => {
        const tag = href ? "a" : "div";
        const ext = href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
        return `<${tag} class="c-card"${href ? ` href="${esc(href)}"${ext}` : ""}><span class="value-icon">${I[ic]}</span><div><small>${t}</small><span>${esc(v)}</span></div></${tag}>`;
      }).join("");
      const soc = $("#contact-socials");
      if (soc) soc.innerHTML = socialsHTML();
      const wa = $("#wa-cta");
      if (wa) has(C.whatsapp) ? (wa.href = waLink("Hi! I'd like to learn more about your marmosets.")) : wa.remove();
    }

    const form = $("#inquiry-form");
    if (!form) return;
    const sel = form.elements.baby;
    sel.innerHTML = `<option value="">Select a baby (optional)</option>` +
      S.babies.filter((b) => b.status !== "sold").map((b) => `<option value="${esc(b.id)}">${esc(b.name)} — ${STATUS[b.status] || ""}</option>`).join("") +
      `<option value="waitlist">Future babies / waitlist</option><option value="general">General question</option>`;
    const pre = new URLSearchParams(location.search).get("baby");
    if (pre && [...sel.options].some((o) => o.value === pre)) sel.value = pre;

    // Checkout mode: arriving from the cart with babies selected
    const checkout = new URLSearchParams(location.search).has("checkout") && cartIds().length > 0;
    const submitLabel = checkout ? "Send Reservation Request" : "Send Inquiry";
    const cartLines = () => cartItems().map((b) => `- ${b.name} (${[b.species, b.sex, b.age].filter(has).join(", ")}) — ${priceOf(b)}`);
    if (checkout) {
      const items = cartItems();
      $("h2", form).textContent = "Checkout";
      $("h2", form).previousElementSibling.textContent = "Reserve Your Selection";
      $("h2", form).nextElementSibling.textContent = "Review your selection and tell us a little about yourself. We'll contact you to confirm availability and arrange next steps.";
      sel.closest(".field").style.display = "none";
      $(".form-grid", form).insertAdjacentHTML("beforebegin", `
        <div class="checkout-summary">
          <ul class="cart-list">${items.map((b) => `
            <li class="cart-item">
              <div class="frame">${img(b.photos?.[0] || "", b.name)}</div>
              <div class="cart-item-info"><strong>${esc(b.name)}</strong><small>${esc([b.species, b.sex, b.age].filter(has).join(" · "))}</small></div>
              <span class="cart-price">${esc(priceOf(b))}</span>
            </li>`).join("")}
          </ul>
          <div class="cart-total"><span>Subtotal</span><strong>${cartTotal(items)}</strong></div>${depositRow()}
          <button type="button" class="link-btn cart-toggle">Edit cart</button>
        </div>`);
      const field = (id, label, input, cls = "", err = "This field is required.") =>
        `<div class="field ${cls}"><label for="co-${id}">${label}</label>${input}<span class="err">${err}</span></div>`;
      $(".form-grid", form).innerHTML = [
        field("first", "First Name", `<input id="co-first" name="firstName" autocomplete="given-name" required>`),
        field("last", "Last Name", `<input id="co-last" name="lastName" autocomplete="family-name" required>`),
        field("email", "Email Address", `<input id="co-email" name="email" type="email" autocomplete="email" required>`, "", "Please enter a valid email."),
        field("phone", "Phone Number", `<input id="co-phone" name="phone" type="tel" autocomplete="tel" required>`, "", "Please enter a valid phone number."),
        field("country", "Country", `<select id="co-country" name="country" autocomplete="country-name">${COUNTRIES.map((c) => `<option${c === "United States" ? " selected" : ""}>${c}</option>`).join("")}</select>`, "full"),
        field("address", "Street Address", `<input id="co-address" name="address" autocomplete="street-address" placeholder="House number and street name" required>`, "full"),
        field("city", "City", `<input id="co-city" name="city" autocomplete="address-level2" required>`),
        field("state", "State",
          `<select id="co-state" name="state" autocomplete="address-level1"><option value="">Select a state</option>${US_STATES.map((s) => `<option>${s}</option>`).join("")}</select>` +
          `<input id="co-region" name="region" autocomplete="address-level1" placeholder="State / Province / Region" hidden>`, "", "Please select your state."),
        field("zip", "ZIP Code", `<input id="co-zip" name="zip" autocomplete="postal-code" inputmode="numeric" required>`, "", "Please enter your ZIP code."),
        `<div class="field full"><label for="co-notes">Order Notes <span class="opt">(optional)</span></label><textarea id="co-notes" name="message" placeholder="Anything you'd like us to know?"></textarea></div>`,
      ].join("");
      // Swap the state dropdown for a free-text region outside the US
      const country = form.elements.country, stateSel = form.elements.state, region = form.elements.region;
      country.addEventListener("change", () => {
        const us = country.value === "United States";
        stateSel.hidden = !us; region.hidden = us;
        stateSel.closest(".field").querySelector("label").textContent = us ? "State" : "State / Province / Region";
        form.elements.zip.closest(".field").querySelector("label").textContent = us ? "ZIP Code" : "Postal Code";
        stateSel.closest(".field").classList.remove("has-error");
      });
      $("button[type=submit]", form).textContent = submitLabel;
      requestAnimationFrame(() => form.scrollIntoView({ block: "start" }));
    }

    const status = $(".form-status", form);
    const setErr = (name, on) => form.elements[name].closest(".field").classList.toggle("has-error", on);
    form.addEventListener("input", (e) => e.target.closest(".field")?.classList.remove("has-error"));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      Object.keys(d).forEach((k) => (d[k] = String(d[k]).trim()));
      const filled = (v) => (v || "").length > 0;
      const isUS = d.country === "United States";
      const rules = checkout
        ? {
            firstName: filled, lastName: filled, address: filled, city: filled, zip: filled,
            email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            phone: (v) => v.replace(/\D/g, "").length >= 7,
            state: () => filled(isUS ? d.state : d.region),
          }
        : {
            name: (v) => v.length > 1,
            email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: (v) => v.length > 4,
          };
      let valid = true;
      Object.entries(rules).forEach(([k, ok]) => { const pass = ok(d[k] || ""); setErr(k, !pass); if (!pass) valid = false; });
      if (!valid) { $(".has-error input, .has-error select, .has-error textarea", form)?.focus(); return; }
      if (checkout) {
        d.name = `${d.firstName} ${d.lastName}`;
        const st = isUS ? d.state : d.region;
        d.location = `${d.address}, ${d.city}, ${st} ${d.zip}, ${d.country}`;
      }

      const babyLabel = sel.options[sel.selectedIndex]?.text || "";
      const btn = $("button[type=submit]", form);
      status.className = "form-status";

      if (!has(C.formEndpoint)) {
        status.className = "form-status bad";
        status.textContent = "The form is not configured to send. Please contact us directly by email.";
        return;
      }
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const fd = new FormData(form);
        if (checkout) {
          fd.delete("baby");
          fd.set("name", d.name);
          fd.set("address", d.location);
          fd.set("reservation", cartLines().join("\n"));
          fd.set("subtotal", cartTotal(cartItems())); if (has(DEPOSIT)) fd.set("deposit", DEPOSIT);
        } else fd.set("baby", babyLabel);
        fd.set("_subject", checkout
          ? `Reservation request — ${cartItems().map((b) => b.name).join(", ")}`
          : `Inquiry from ${d.name}`);
        fd.set("_replyto", d.email);
        const r = await fetch(C.formEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error();
        form.reset();
        if (checkout) saveCart([]);
        status.className = "form-status ok";
        status.textContent = checkout
          ? "Thank you! Your reservation request has been sent — we'll contact you shortly to confirm."
          : "Thank you! Your inquiry has been sent — we'll be in touch soon.";
      } catch {
        status.className = "form-status bad";
        status.textContent = `Sorry, your information could not be sent. Please try again or email us at ${C.email}.`;
      } finally { btn.disabled = false; btn.textContent = submitLabel; }
    });
  }

  /* ---------- Hero video (optional) ---------- */
  function heroVideo() {
    const media = $(".hero .hero-media");
    if (!media) return;
    const still = $("img", media);
    if (still && has(S.hero.image)) still.dataset.img = S.hero.image;
    if (!has(S.hero.video)) return;
    const v = document.createElement("video");
    Object.assign(v, { src: S.hero.video, muted: true, loop: true, autoplay: true, playsInline: true });
    v.setAttribute("aria-hidden", "true");
    v.addEventListener("error", () => v.remove());
    media.appendChild(v);
  }

  /* ---------- Init ---------- */
  buildHeader();
  buildFooter();
  buildPolicy();
  buildCart();
  renderFeatured();
  renderCatalogue();
  renderLife();
  renderGallery();
  renderGrowing();
  renderContact();
  heroVideo();
  $$("[data-icon]").forEach((el) => (el.innerHTML = I[el.dataset.icon] || ""));
  updateCartUI();
  hydrateAll();
  reveal();
})();
