/* ===================================================
   see2083 — Language (English / Nepali)
   =================================================== */

const Lang = (() => {
  const KEY = "s2083_lang";
  let current = localStorage.getItem(KEY) || "en";

  function apply(lang) {
    current = lang;
    localStorage.setItem(KEY, lang);
    document.documentElement.setAttribute("lang", lang === "np" ? "ne" : "en");
    document.body.classList.toggle("lang-np", lang === "np");
    // Update toggle buttons
    document.querySelectorAll("[data-lang-toggle]").forEach(btn => {
      btn.textContent = lang === "np" ? "English" : "नेपाली";
      btn.setAttribute("title", lang === "np" ? "Switch to English" : "नेपालीमा जानुहोस्");
    });
  }

  function toggle() {
    apply(current === "en" ? "np" : "en");
    // Reload page so language-aware renders update
    window.location.reload();
  }

  function t(key) {
    const labels = S2083.labels[current] || S2083.labels["en"];
    return labels[key] || key;
  }

  // Return display string for an object with name/nameNp
  function display(obj, enKey = "name", npKey = "nameNp") {
    if (current === "np" && obj[npKey]) return obj[npKey];
    return obj[enKey] || obj[npKey] || "";
  }

  function init() {
    apply(current);
  }

  return { init, toggle, t, display, current: () => current };
})();
