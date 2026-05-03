/* ===================================================
   see2083 — Theme (Light / Dark Mode)
   =================================================== */

const Theme = (() => {
  const KEY = "s2083_theme";
  let current = localStorage.getItem(KEY) || "light";

  function apply(theme) {
    current = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
    // Update all toggle buttons
    document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
      btn.setAttribute("title", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
    });
  }

  function toggle() {
    apply(current === "dark" ? "light" : "dark");
  }

  function init() {
    // Respect system preference if no stored preference
    if (!localStorage.getItem(KEY)) {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        current = "dark";
      }
    }
    apply(current);
  }

  return { init, toggle, current: () => current, apply };
})();
