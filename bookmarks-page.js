/* ===================================================
   see2083 — Bookmarks Page Logic
   Renders saved chapters and MCQ questions
   =================================================== */

(function () {
  if (typeof pageInit === "function") {
    pageInit("bookmarks");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np";

  let activeFilter = "all";

  const labels = {
    home: isNp ? "गृहपृष्ठ" : "Home",
    bookmarks: isNp ? "बुकमार्कहरू" : "Bookmarks",
    savedItems: isNp ? "सुरक्षित सामग्री" : "Saved items",
    sub: isNp ? "तपाईंका सुरक्षित अध्याय र प्रश्नहरू।" : "Your saved chapters and questions.",
    startLearning: isNp ? "पढ्न सुरु गर्नुहोस्" : "Start learning",
    all: isNp ? "सबै" : "All",
    chapters: isNp ? "अध्यायहरू" : "Chapters",
    mcqs: isNp ? "MCQ प्रश्नहरू" : "MCQ Questions",
    saved: isNp ? "सुरक्षित" : "saved",
    noSaved: isNp ? "अहिलेसम्म केही सुरक्षित छैन" : "Nothing saved yet",
    noSavedSub: isNp
      ? "छिटो revision का लागि अध्याय वा प्रश्नहरू सुरक्षित गर्नुहोस्।"
      : "Save chapters or questions for quick revision.",
    open: isNp ? "खोल्नुहोस्" : "Open",
    remove: isNp ? "हटाउनुहोस्" : "Remove",
    removed: isNp ? "बुकमार्क हटाइयो" : "Bookmark removed",
    chapter: isNp ? "अध्याय" : "Chapter",
    mcq: isNp ? "MCQ" : "MCQ",
    item: isNp ? "सामग्री" : "Item"
  };

  const titleEl = document.getElementById("page-title");
  const subEl = document.getElementById("page-sub");
  const kickerEl = document.getElementById("bookmarks-kicker");
  const startLink = document.getElementById("start-link");
  const tabAll = document.getElementById("tab-all");
  const tabChapters = document.getElementById("tab-chapters");
  const tabMcqs = document.getElementById("tab-mcqs");
  const countEl = document.getElementById("bookmarks-count");
  const listEl = document.getElementById("bookmark-list");
  const emptyState = document.getElementById("empty-state");
  const emptyTitle = document.getElementById("empty-title");
  const emptySub = document.getElementById("empty-sub");
  const emptyStartBtn = document.getElementById("empty-start-btn");

  function setLabels() {
    document.title = labels.bookmarks + " — see2083";

    if (titleEl) titleEl.textContent = labels.bookmarks;
    if (subEl) subEl.textContent = labels.sub;
    if (kickerEl) kickerEl.textContent = labels.savedItems;
    if (startLink) startLink.textContent = labels.startLearning;

    if (tabAll) tabAll.textContent = labels.all;
    if (tabChapters) tabChapters.textContent = labels.chapters;
    if (tabMcqs) tabMcqs.textContent = labels.mcqs;

    if (emptyTitle) emptyTitle.textContent = labels.noSaved;
    if (emptySub) emptySub.textContent = labels.noSavedSub;
    if (emptyStartBtn) emptyStartBtn.textContent = labels.startLearning;
  }

  function renderBreadcrumbs() {
    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: labels.home, href: "index.html" },
      { label: labels.bookmarks }
    ]);
  }

  function getBookmarkType(item) {
    if (!item || !item.type) return labels.item;

    if (item.type === "chapter") return labels.chapter;
    if (item.type === "mcq") return labels.mcq;

    return item.type;
  }

  function getBookmarkTitle(item) {
    if (!item) return "";

    if (isNp && item.titleNp) return item.titleNp;

    return item.title || item.chapter || item.question || labels.item;
  }

  function getBookmarkMeta(item) {
    if (!item) return "";

    const subject =
      (isNp && item.subjectNp)
        ? item.subjectNp
        : (item.subjectTitle || item.subject || "");

    const chapter =
      (isNp && item.chapterNp)
        ? item.chapterNp
        : (item.chapterTitle || item.chapter || "");

    const parts = [];

    if (subject) parts.push(subject);
    if (chapter && chapter !== subject) parts.push(chapter);

    return parts.join(" · ");
  }

  function getBookmarkIcon(item) {
    if (!item || !item.type) return "🔖";

    if (item.type === "chapter") return "📚";
    if (item.type === "mcq") return "✅";

    return "🔖";
  }

  function getBookmarkUrl(item) {
    return item && item.url ? item.url : "index.html";
  }

  function formatSavedTime(item) {
    if (!item || !item.savedAt) return "";

    const date = new Date(item.savedAt);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function getFilteredBookmarks() {
    const all = Bookmarks.getAll();

    if (activeFilter === "all") return all;

    return all.filter(function (item) {
      return item.type === activeFilter;
    });
  }

  function renderBookmarks() {
    if (!listEl || !emptyState) return;

    const bookmarks = getFilteredBookmarks();

    listEl.innerHTML = "";

    if (countEl) {
      countEl.textContent = bookmarks.length + " " + labels.saved;
    }

    if (!bookmarks.length) {
      emptyState.style.display = "flex";
      return;
    }

    emptyState.style.display = "none";

    bookmarks.forEach(function (item) {
      const article = document.createElement("article");

      article.className = "bookmark-page-card";
      article.dataset.id = item.id;

      const savedTime = formatSavedTime(item);

      article.innerHTML =
        '<div class="bookmark-card-icon">' + escapeHTML(getBookmarkIcon(item)) + '</div>' +

        '<div class="bookmark-card-main">' +
          '<div class="bookmark-card-top">' +
            '<span class="bookmark-type-pill">' + escapeHTML(getBookmarkType(item)) + '</span>' +
            (savedTime ? '<span class="bookmark-date">' + escapeHTML(savedTime) + '</span>' : '') +
          '</div>' +

          '<h3>' + escapeHTML(getBookmarkTitle(item)) + '</h3>' +

          '<p>' + escapeHTML(getBookmarkMeta(item)) + '</p>' +

          '<div class="bookmark-card-actions">' +
            '<a href="' + escapeHTML(getBookmarkUrl(item)) + '" class="btn btn-primary btn-sm">' +
              escapeHTML(labels.open) +
            ' →</a>' +

            '<button class="btn btn-ghost btn-sm bookmark-remove-btn" type="button" data-id="' + escapeHTML(item.id) + '">' +
              escapeHTML(labels.remove) +
            '</button>' +
          '</div>' +
        '</div>';

      listEl.appendChild(article);
    });
  }

  function initFilters() {
    const buttons = document.querySelectorAll("#filter-tabs .tab-btn");

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        buttons.forEach(function (btn) {
          btn.classList.remove("active");
        });

        button.classList.add("active");
        activeFilter = button.dataset.filter || "all";

        renderBookmarks();
      });
    });
  }

  function initRemoveButtons() {
    if (!listEl) return;

    listEl.addEventListener("click", function (event) {
      const button = event.target.closest(".bookmark-remove-btn");

      if (!button) return;

      const id = button.dataset.id;

      if (!id) return;

      Bookmarks.remove(id);
      renderBookmarks();

      if (typeof showToast === "function") {
        showToast(labels.removed);
      }
    });
  }

  setLabels();
  renderBreadcrumbs();
  initFilters();
  initRemoveButtons();
  renderBookmarks();
})();