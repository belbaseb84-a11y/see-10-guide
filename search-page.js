/* ===================================================
   see2083 — Search Page Logic
   Controls search page UI and filtering
   =================================================== */

(function () {
  if (typeof pageInit === "function") {
    pageInit("search");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np";

  let activeType = "all";

  const labels = {
    kicker: isNp ? "खोजी" : "Search",
    title: isNp ? "आफूलाई चाहिएको कुरा खोज्नुहोस्।" : "Find what you need.",
    sub: isNp
      ? "English वा Nepali मा विषय, अध्याय, MCQ र अध्ययन खण्डहरू खोज्नुहोस्।"
      : "Search subjects, chapters, MCQs, and study sections in English or Nepali.",
    start: isNp ? "पढ्न सुरु गर्नुहोस्" : "Start learning",
    placeholder: isNp ? "विषय, अध्याय वा keyword खोज्नुहोस्..." : "Search subjects, chapters, or keywords...",
    all: isNp ? "सबै" : "All",
    subjects: isNp ? "विषयहरू" : "Subjects",
    chapters: isNp ? "अध्यायहरू" : "Chapters",
    mcq: isNp ? "MCQ" : "MCQ",
    initialTitle: isNp ? "खोजी सुरु गर्नुहोस्" : "Start searching",
    initialText: isNp
      ? "विषय, अध्याय वा keyword लेखेर खोज्नुहोस्।"
      : "Type a subject, chapter, or keyword to search.",
    noResult: isNp ? "कुनै नतिजा भेटिएन।" : "No results found.",
    tryDifferent: isNp ? "अर्को keyword प्रयोग गर्नुहोस्।" : "Try a different keyword.",
    resultsFound: isNp ? "नतिजा भेटियो" : "results found"
  };

  const searchKicker = document.getElementById("search-kicker");
  const searchTitle = document.getElementById("search-title");
  const searchSub = document.getElementById("search-sub");
  const searchStartLink = document.getElementById("search-start-link");
  const searchInput = document.getElementById("search-input");
  const statusEl = document.getElementById("search-status");
  const listEl = document.getElementById("search-results-list");
  const initialState = document.getElementById("initial-state");
  const initialTitle = document.getElementById("initial-title");
  const initialText = document.getElementById("initial-text");

  const tfAll = document.getElementById("tf-all");
  const tfSubject = document.getElementById("tf-subject");
  const tfChapter = document.getElementById("tf-chapter");
  const tfMcq = document.getElementById("tf-mcq");

  function setLabels() {
    document.title = labels.kicker + " — see2083";

    if (searchKicker) searchKicker.textContent = labels.kicker;
    if (searchTitle) searchTitle.textContent = labels.title;
    if (searchSub) searchSub.textContent = labels.sub;
    if (searchStartLink) searchStartLink.textContent = labels.start;
    if (searchInput) searchInput.placeholder = labels.placeholder;

    if (tfAll) tfAll.textContent = labels.all;
    if (tfSubject) tfSubject.textContent = labels.subjects;
    if (tfChapter) tfChapter.textContent = labels.chapters;
    if (tfMcq) tfMcq.textContent = labels.mcq;

    if (initialTitle) initialTitle.textContent = labels.initialTitle;
    if (initialText) initialText.textContent = labels.initialText;
  }

  function getQueryFromUrl() {
    return new URLSearchParams(window.location.search).get("q") || "";
  }

  function clearResults() {
    if (listEl) listEl.innerHTML = "";
    if (statusEl) statusEl.textContent = "";
    if (initialState) initialState.style.display = "flex";
  }

  function renderNoResults() {
    if (!listEl) return;

    listEl.innerHTML =
      '<div class="empty-state search-empty-state">' +
        '<div class="empty-icon">🔍</div>' +
        '<h3>' + escapeHTML(labels.noResult) + '</h3>' +
        '<p>' + escapeHTML(labels.tryDifferent) + '</p>' +
      '</div>';
  }

  function renderResults(results) {
    if (!listEl) return;

    listEl.innerHTML = results.map(function (result) {
      return (
        '<a href="' + escapeHTML(result.url) + '" class="search-result-item search-page-result">' +
          '<span class="search-result-icon">' + escapeHTML(result.icon || "🔎") + '</span>' +
          '<div class="search-result-info">' +
            '<div class="search-result-title">' + escapeHTML(result.display || result.title || "") + '</div>' +
            '<div class="search-result-meta">' +
              escapeHTML(result.typeLabel || "") +
              (result.subjectTitle ? " · " + escapeHTML(result.subjectTitle) : "") +
            '</div>' +
          '</div>' +
          '<span class="search-result-arrow">→</span>' +
        '</a>'
      );
    }).join("");
  }

  function doSearch() {
    if (!searchInput || !statusEl || !initialState) return;

    const query = searchInput.value.trim();

    if (query.length < 2) {
      clearResults();
      return;
    }

    initialState.style.display = "none";

    if (typeof Search === "undefined" || typeof Search.query !== "function") {
      statusEl.textContent = "Search is loading...";
      return;
    }

    let results = Search.query(query);

    if (activeType !== "all") {
      results = results.filter(function (result) {
        return result.type === activeType;
      });
    }

    statusEl.textContent = results.length
      ? results.length + " " + labels.resultsFound
      : "";

    if (!results.length) {
      renderNoResults();
      return;
    }

    renderResults(results);
  }

  function initFilters() {
    const filterButtons = document.querySelectorAll("#type-filter .tab-btn");

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });

        button.classList.add("active");
        activeType = button.dataset.type || "all";
        doSearch();
      });
    });
  }

  function initSearchInput() {
    if (!searchInput) return;

    const prefilledQuery = getQueryFromUrl();

    if (prefilledQuery) {
      searchInput.value = prefilledQuery;
    }

    searchInput.addEventListener("input", doSearch);

    if (prefilledQuery) {
      doSearch();
    } else {
      clearResults();
    }
  }

  setLabels();
  initFilters();
  initSearchInput();
})();