/* ===================================================
   see2083 — Homepage Logic
   Renders homepage dynamic sections
   =================================================== */

(function () {
  if (typeof pageInit === "function") {
    pageInit("home");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np";
  const medium = getCurrentMedium();

  function updateHomeStats() {
    const subjectEl = document.getElementById("stat-subjects");
    const chapterEl = document.getElementById("stat-chapters");
    const streamEl = document.getElementById("stat-streams");
    const optionEl = document.getElementById("stat-options");

    if (!hasS2083Data()) {
      if (subjectEl) subjectEl.textContent = "—";
      if (chapterEl) chapterEl.textContent = "—";
      if (streamEl) streamEl.textContent = "3";
      if (optionEl) optionEl.textContent = "9";
      return;
    }

    const subjectCount = safeArray(S2083.subjects).length;

    const chapterCount = S2083.chapters
      ? Object.values(S2083.chapters).reduce(function (total, chapters) {
          return total + safeArray(chapters).length;
        }, 0)
      : 0;

    const streamCount = safeArray(S2083.mediums).length || 3;
    const optionCount = safeArray(S2083.studyOptions).length || 9;

    if (subjectEl) subjectEl.textContent = subjectCount;
    if (chapterEl) chapterEl.textContent = chapterCount;
    if (streamEl) streamEl.textContent = streamCount;
    if (optionEl) optionEl.textContent = optionCount;
  }

  function initHeroSearch() {
    const heroInput = document.getElementById("hero-search-input");
    const heroResults = document.getElementById("hero-search-results");

    if (!heroInput || !heroResults) return;

    heroInput.placeholder = isNp
      ? "विषय वा अध्याय खोज्नुहोस्..."
      : "Search subjects or chapters...";

    heroInput.addEventListener("input", function () {
      const query = heroInput.value.trim();

      if (query.length < 2) {
        heroResults.innerHTML = "";
        return;
      }

      if (typeof Search === "undefined" || typeof Search.query !== "function") {
        heroResults.innerHTML =
          '<p style="font-size:13px;color:var(--text-muted);text-align:center;padding:12px">Search is loading...</p>';
        return;
      }

      const results = Search.query(query).slice(0, 5);

      if (!results.length) {
        heroResults.innerHTML =
          '<p style="font-size:13px;color:var(--text-muted);text-align:center;padding:12px">' +
          (isNp ? "कुनै नतिजा भेटिएन।" : "No results found.") +
          '</p>';
        return;
      }

      heroResults.innerHTML =
        '<div class="search-results-list">' +
        results.map(function (result) {
          return (
            '<a href="' + escapeHTML(result.url) + '" class="search-result-item">' +
              '<span class="search-result-icon">' + escapeHTML(result.icon) + '</span>' +
              '<div class="search-result-info">' +
                '<div class="search-result-title">' + escapeHTML(result.display) + '</div>' +
                '<div class="search-result-meta">' +
                  escapeHTML(result.typeLabel) +
                  (result.subjectTitle ? " · " + escapeHTML(result.subjectTitle) : "") +
                '</div>' +
              '</div>' +
            '</a>'
          );
        }).join("") +
        '</div>';
    });

    heroInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && heroInput.value.trim()) {
        window.location.href =
          "search.html?q=" + encodeURIComponent(heroInput.value.trim());
      }
    });
  }

  function renderMediumCards() {
    const mediumCardsHome = document.getElementById("medium-cards-home");
    if (!mediumCardsHome) return;

    mediumCardsHome.innerHTML = "";

    if (!hasS2083Data() || !Array.isArray(S2083.mediums)) {
      mediumCardsHome.innerHTML =
        '<div class="card">' +
          '<h3>Mediums are loading</h3>' +
          '<p>Please check that js/data.js is linked before js/home.js.</p>' +
        '</div>';
      return;
    }

    S2083.mediums.forEach(function (item) {
      const card = document.createElement("a");

      card.href = "subjects.html?medium=" + encodeURIComponent(item.id);
      card.className = "medium-card" + (item.id === "english" ? " featured" : "");

      card.innerHTML =
        '<div class="medium-card-icon">' + escapeHTML(item.icon) + '</div>' +
        '<div class="medium-card-title">' + escapeHTML(item.label) + '</div>' +
        '<div class="medium-card-subtitle">' + escapeHTML(item.labelNp) + '</div>' +
        '<div class="medium-card-tag">' + escapeHTML(item.tag) + '</div>';

      card.addEventListener("click", function () {
        if (typeof setMedium === "function") {
          setMedium(item.id);
        }
      });

      mediumCardsHome.appendChild(card);
    });
  }

  function renderPopularSubjects() {
    const previewSubjectIds = [
      "science",
      "math",
      "english",
      "computer",
      "social",
      "nepali"
    ];

    const subjectGrid = document.getElementById("home-subject-grid");
    if (!subjectGrid) return;

    subjectGrid.innerHTML = "";

    if (!hasS2083Data()) {
      subjectGrid.innerHTML =
        '<div class="card">' +
          '<h3>Subjects are loading</h3>' +
          '<p>Please check that js/data.js is linked correctly.</p>' +
        '</div>';
      return;
    }

    previewSubjectIds.forEach(function (subjectId) {
      const subject = getSubjectById(subjectId);
      if (!subject) return;

      const name = isNp ? (subject.nameNp || subject.name) : subject.name;
      const desc = isNp
        ? (subject.descriptionNp || subject.description)
        : subject.description;

      const chapterCount =
        getChapterCountForSubject(subject.id) || subject.units || 0;

      const chapterLabel = isNp ? "अध्याय" : "chapters";

      const card = document.createElement("a");

      card.href =
        "chapters.html?subject=" +
        encodeURIComponent(subject.id) +
        "&medium=" +
        encodeURIComponent(medium);

      card.className = "card card-link subject-card";

      card.innerHTML =
        '<div class="subject-card-icon">' + escapeHTML(subject.icon) + '</div>' +
        '<div class="subject-card-meta">' +
          escapeHTML(chapterCount) + ' ' + chapterLabel +
        '</div>' +
        '<div class="subject-card-title">' + escapeHTML(name) + '</div>' +
        '<div class="subject-card-desc">' + escapeHTML(desc || "") + '</div>' +
        '<div class="subject-card-footer">' +
          '<span class="btn btn-outline btn-sm" style="pointer-events:none">' +
            (isNp ? "खोल्नुहोस्" : "Open") +
          ' →</span>' +
        '</div>';

      subjectGrid.appendChild(card);
    });
  }

  function renderStudyTools() {
    const toolsGrid = document.getElementById("study-tools-grid");
    if (!toolsGrid) return;

    const studyTools = [
      {
        icon: "📝",
        title: isNp ? "Notes" : "Notes",
        desc: isNp
          ? "Chapter-wise notes and revision materials."
          : "Chapter-wise notes and revision materials.",
        url: "subjects.html?medium=" + encodeURIComponent(medium)
      },
      {
        icon: "✅",
        title: isNp ? "MCQ Practice" : "MCQ Practice",
        desc: isNp
          ? "Practice objective questions quickly."
          : "Practice objective questions quickly.",
        url: "quiz.html"
      },
      {
        icon: "🎯",
        title: isNp ? "Mock Tests" : "Mock Tests",
        desc: isNp
          ? "Prepare with timed test sections."
          : "Prepare with timed test sections.",
        url: "mock-test.html"
      },
      {
        icon: "🔖",
        title: isNp ? "Bookmarks" : "Bookmarks",
        desc: isNp
          ? "Save important chapters for revision."
          : "Save important chapters for revision.",
        url: "bookmarks.html"
      }
    ];

    toolsGrid.innerHTML = "";

    studyTools.forEach(function (tool) {
      const card = document.createElement("a");

      card.className = "home-tool-card";
      card.href = tool.url;

      card.innerHTML =
        '<div class="home-tool-icon">' + escapeHTML(tool.icon) + '</div>' +
        '<div class="home-tool-title">' + escapeHTML(tool.title) + '</div>' +
        '<p class="home-tool-desc">' + escapeHTML(tool.desc) + '</p>';

      toolsGrid.appendChild(card);
    });
  }

  initHeroSearch();
  renderMediumCards();
  renderPopularSubjects();
  renderStudyTools();
  updateHomeStats();
})();