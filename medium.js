/* ===================================================
   see2083 — Medium Page Logic
   Renders medium selection cards
   =================================================== */

(function () {
  if (typeof pageInit === "function") {
    pageInit("home");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np";

  const titleEl = document.getElementById("medium-page-title");
  const subtitleEl = document.getElementById("medium-page-subtitle");
  const noteTextEl = document.getElementById("medium-page-note-text");
  const grid = document.getElementById("medium-grid");

  if (titleEl) {
    titleEl.textContent = isNp ? "माध्यम छान्नुहोस्" : "Choose your medium";
  }

  if (subtitleEl) {
    subtitleEl.textContent = isNp
      ? "आफ्नो विद्यालयसँग मिल्ने stream छान्नुहोस्। तपाईं पछि पनि परिवर्तन गर्न सक्नुहुन्छ।"
      : "Select the stream that matches your school. You can switch anytime.";
  }

  if (noteTextEl) {
    noteTextEl.textContent = isNp
      ? "English, Nepali र technical stream मा केही common subjects साझा हुन्छन्।"
      : "Common subjects are shared between English, Nepali, and technical streams.";
  }

  function getMediumDescription(item) {
    if (isNp) {
      return item.descNp || item.desc || "";
    }

    return item.desc || "";
  }

  function renderMediumCards() {
    if (!grid) return;

    grid.innerHTML = "";

    if (!hasS2083Data() || !Array.isArray(S2083.mediums)) {
      grid.innerHTML =
        '<div class="card">' +
          '<h3>Medium data not found</h3>' +
          '<p>Please check that js/data.js is linked correctly.</p>' +
        '</div>';
      return;
    }

    S2083.mediums.forEach(function (item) {
      const card = document.createElement("a");

      card.href = "subjects.html?medium=" + encodeURIComponent(item.id);
      card.className = "medium-card" + (item.id === "english" ? " featured" : "");

      card.addEventListener("click", function () {
        if (typeof setMedium === "function") {
          setMedium(item.id);
        }
      });

      card.innerHTML =
        '<div class="medium-card-icon">' + escapeHTML(item.icon) + '</div>' +
        '<div class="medium-card-title">' +
          escapeHTML(isNp ? (item.labelNp || item.label) : item.label) +
        '</div>' +
        '<div class="medium-card-subtitle">' +
          escapeHTML(isNp ? item.label : (item.labelNp || "")) +
        '</div>' +
        '<p class="medium-card-desc">' + escapeHTML(getMediumDescription(item)) + '</p>' +
        '<div class="medium-card-footer">' +
          '<span class="btn btn-primary btn-sm" style="pointer-events:none">' +
            (isNp ? "छान्नुहोस्" : "Select") +
          ' →</span>' +
        '</div>';

      grid.appendChild(card);
    });
  }

  renderMediumCards();
})();