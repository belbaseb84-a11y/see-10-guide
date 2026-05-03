/* ===================================================
   see2083 — Main UI / Shared Rendering
   =================================================== */

// ─── URL Params Helper ────────────────────────────────
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// ─── Medium state ─────────────────────────────────────
function getMedium() {
  return getParam("medium") || sessionStorage.getItem("s2083_medium") || "english";
}
function setMedium(m) {
  sessionStorage.setItem("s2083_medium", m);
}

// ─── Navbar ───────────────────────────────────────────
function renderNavbar(activePage) {
  const lang = Lang.current();
  const medium = getMedium();
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const links = [
    { href: "index.html", key: "home", icon: "🏠" },
    { href: `subjects.html?medium=${medium}`, key: "subjects", icon: "📚" },
    { href: "search.html", key: "search", icon: "🔍" },
    { href: "bookmarks.html", key: "bookmarks", icon: "🔖" },
    { href: "about.html", key: "about", icon: "ℹ️" }
  ];

  nav.innerHTML = `
    <div class="container">
      <a href="index.html" class="navbar-brand">see<span>2083</span></a>
      <nav class="navbar-nav-desktop" aria-label="Main navigation">
        ${links.map(l => `
          <a href="${l.href}" class="${activePage === l.key ? "active" : ""}">${Lang.t(l.key)}</a>
        `).join("")}
      </nav>
      <div class="navbar-actions">
        <button class="icon-btn" data-lang-toggle title="Switch language" onclick="Lang.toggle()" aria-label="Switch language">
          ${lang === "np" ? "English" : "नेपाली"}
        </button>
        <button class="icon-btn" data-theme-toggle title="Toggle theme" onclick="Theme.toggle()" aria-label="Toggle dark mode">🌙</button>
      </div>
    </div>
  `;
  // Re-apply theme icon
  Theme.apply(Theme.current());
}

// ─── Bottom Navigation (mobile) ───────────────────────
function renderBottomNav(activePage) {
  const medium = getMedium();
  const nav = document.getElementById("bottom-nav");
  if (!nav) return;

  const items = [
    { href: "index.html", key: "home", icon: "🏠" },
    { href: `subjects.html?medium=${medium}`, key: "subjects", icon: "📚" },
    { href: "search.html", key: "search", icon: "🔍" },
    { href: "bookmarks.html", key: "bookmarks", icon: "🔖" },
  ];

  nav.innerHTML = items.map(item => `
    <a href="${item.href}" class="${activePage === item.key ? "active" : ""}" aria-label="${Lang.t(item.key)}">
      <span class="bnav-icon">${item.icon}</span>
      <span>${Lang.t(item.key)}</span>
    </a>
  `).join("");
}

// ─── Footer ───────────────────────────────────────────
function renderFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-inner">
        <span class="footer-brand">see2083</span>
        <div class="footer-links">
          <a href="about.html">About</a>
          <a href="design-system.html">Design</a>
        </div>
        <span class="footer-copy">Built for SEE students in Nepal.</span>
      </div>
    </div>
  `;
}

// ─── Breadcrumb ───────────────────────────────────────
function renderBreadcrumb(el, crumbs) {
  // crumbs: [{label, href}] — last item has no href
  if (!el) return;
  el.innerHTML = crumbs.map((c, i) => {
    if (i === crumbs.length - 1) return `<span>${c.label}</span>`;
    return `<a href="${c.href}">${c.label}</a><span class="breadcrumb-sep">›</span>`;
  }).join("");
}

// ─── Page init helper ─────────────────────────────────
function pageInit(activePage) {
  Theme.init();
  Lang.init();
  const medium = getMedium();
  if (medium) setMedium(medium);
  renderNavbar(activePage);
  renderBottomNav(activePage);
  renderFooter();
}

// ─── Subject icon map ─────────────────────────────────
function subjectColor(subjectId) {
  const map = {
    english: "blue-bg", nepali: "teal-bg", math: "purple-bg",
    science: "green-bg", social: "amber-bg", computer: "blue-bg",
    account: "teal-bg", economics: "amber-bg", "opt-math": "purple-bg",
    env: "green-bg", "eng-drawing": "blue-bg", "elec-measure": "amber-bg",
    "elec-util": "amber-bg", electronics: "purple-bg", "elec-machine": "teal-bg",
    industrial: "green-bg"
  };
  return map[subjectId] || "blue-bg";
}
