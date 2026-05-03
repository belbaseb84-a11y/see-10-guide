/* ===================================================
   see2083 — Chapters Page Logic
   Renders chapter list for selected subject
   =================================================== */

(function () {
  const medium = getParam("medium") || getCurrentMedium() || "english";
  const subjectId = getParam("subject") || "science";

  if (typeof setMedium === "function") {
    setMedium(medium);
  }

  if (typeof pageInit === "function") {
    pageInit("subjects");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np" || medium === "nepali";

  const labels = {
    home: isNp ? "गृहपृष्ठ" : "Home",
    medium: isNp ? "माध्यम" : "Medium",
    subjects: isNp ? "विषयहरू" : "Subjects",
    subjectChapters: isNp ? "विषयका अध्यायहरू" : "Subject chapters",
    chapterList: isNp ? "अध्याय सूची" : "Chapter list",
    chapterListSub: isNp ? "पढ्न सुरु गर्न अध्याय खोल्नुहोस्।" : "Open a chapter to start studying.",
    openChapter: isNp ? "अध्याय खोल्नुहोस्" : "Open chapter",
    backSubjects: isNp ? "← विषयहरू" : "← Subjects",
    noChaptersTitle: isNp ? "अध्यायहरू तयार भइरहेछन्" : "Chapters are being prepared",
    noChaptersText: isNp
      ? "यस विषयका अध्यायहरू तयार भइरहेछन्। छिट्टै उपलब्ध हुनेछ।"
      : "Chapters for this subject are being prepared. Check back soon.",
    backToSubjects: isNp ? "विषयहरूमा फर्कनुहोस्" : "Back to subjects",
    compulsory: isNp ? "अनिवार्य" : "Compulsory",
    optional: isNp ? "ऐच्छिक" : "Optional",
    technical: isNp ? "प्राविधिक" : "Technical",
    units: isNp ? "एकाइ" : "units",
    chapters: isNp ? "अध्याय" : "chapters",
    notFound: isNp ? "विषय भेटिएन" : "Subject not found",
    notFoundSub: isNp
      ? "यो विषय भेटिएन। कृपया विषय पृष्ठमा फर्कनुहोस्।"
      : "This subject was not found. Please go back to the subjects page."
  };

  const subjectIconEl = document.getElementById("subject-icon");
  const subjectTitleEl = document.getElementById("subject-title");
  const subjectDescEl = document.getElementById("subject-desc");
  const chaptersKickerEl = document.getElementById("chapters-kicker");
  const chaptersMetaRowEl = document.getElementById("chapters-meta-row");
  const chapterListTitleEl = document.getElementById("chapter-list-title");
  const chapterListSubtitleEl = document.getElementById("chapter-list-subtitle");
  const chaptersCountEl = document.getElementById("chapters-count");
  const chaptersGridEl = document.getElementById("chapters-grid");
  const noChaptersEl = document.getElementById("no-chapters");
  const noChaptersTitleEl = document.getElementById("no-chapters-title");
  const noChaptersTextEl = document.getElementById("no-ch-text");
  const noChaptersBtnEl = document.getElementById("no-chapters-btn");
  const backSubjectsBtnEl = document.getElementById("back-subjects-btn");

  function getMediumObject() {
    if (!hasS2083Data()) return null;

    return safeArray(S2083.mediums).find(function (item) {
      return item.id === medium;
    }) || null;
  }

  function getMediumLabel() {
    const mediumObj = getMediumObject();

    if (!mediumObj) return medium;

    return isNp ? (mediumObj.labelNp || mediumObj.label) : mediumObj.label;
  }

  function getSubjectObject() {
    if (!hasS2083Data()) return null;

    if (typeof S2083.getSubject === "function") {
      return S2083.getSubject(subjectId);
    }

    return getSubjectById(subjectId);
  }

  function getChaptersForSubject() {
    if (!hasS2083Data()) return [];

    if (typeof S2083.getChapters === "function") {
      return safeArray(S2083.getChapters(subjectId, medium));
    }

    if (S2083.chapters && Array.isArray(S2083.chapters[subjectId])) {
      return S2083.chapters[subjectId];
    }

    return [];
  }

  function getSubjectName(subject) {
    return isNp ? (subject.nameNp || subject.name) : subject.name;
  }

  function getSubjectDescription(subject) {
    return isNp
      ? (subject.descriptionNp || subject.description || "")
      : (subject.description || "");
  }

  function getCategoryLabel(subject) {
    if (subject.category === "compulsory") return labels.compulsory;
    if (subject.category === "technical") return labels.technical;
    return labels.optional;
  }

  function getChapterTitle(chapter) {
    return isNp ? (chapter.titleNp || chapter.title) : chapter.title;
  }

  function getChapterSummary(chapter) {
    return isNp
      ? (chapter.summaryNp || chapter.summary || "")
      : (chapter.summary || "");
  }

  function renderSubtopics(chapter) {
    const subtopics = safeArray(chapter.subtopics).slice(0, 5);

    if (!subtopics.length) return "";

    return (
      '<div class="subtopic-list" aria-label="Subtopics">' +
      subtopics.map(function (subtopic) {
        return '<span class="subtopic-tag">' + escapeHTML(subtopic) + '</span>';
      }).join("") +
      '</div>'
    );
  }

  function createChapterCard(chapter) {
    const title = getChapterTitle(chapter);
    const summary = getChapterSummary(chapter);

    const card = document.createElement("a");

    card.href =
      "chapter.html?subject=" +
      encodeURIComponent(subjectId) +
      "&chapter=" +
      encodeURIComponent(chapter.id) +
      "&medium=" +
      encodeURIComponent(medium);

    card.className = "card card-link chapter-card chapter-page-card";

    card.innerHTML =
      '<div class="chapter-card-number">' +
        escapeHTML(chapter.number || "") +
      '</div>' +
      '<div class="chapter-card-content">' +
        '<div class="chapter-card-label">' +
          (isNp ? "अध्याय" : "Chapter") + " " + escapeHTML(chapter.number || "") +
        '</div>' +
        '<h3 class="chapter-card-title">' + escapeHTML(title) + '</h3>' +
        '<p class="chapter-card-desc">' + escapeHTML(summary) + '</p>' +
        renderSubtopics(chapter) +
        '<div class="chapter-card-footer">' +
          '<span class="btn btn-outline btn-sm" style="pointer-events:none">' +
            escapeHTML(labels.openChapter) +
          ' →</span>' +
        '</div>' +
      '</div>';

    return card;
  }

  function renderBreadcrumbs(subject) {
    const mediumLabel = getMediumLabel();
    const subjectName = subject ? getSubjectName(subject) : labels.notFound;

    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: labels.home, href: "index.html" },
      { label: labels.medium, href: "medium.html" },
      { label: mediumLabel, href: "subjects.html?medium=" + encodeURIComponent(medium) },
      { label: subjectName }
    ]);
  }

  function renderNotFound() {
    document.title = labels.notFound + " — see2083";

    if (subjectIconEl) subjectIconEl.textContent = "📚";
    if (chaptersKickerEl) chaptersKickerEl.textContent = labels.subjectChapters;
    if (subjectTitleEl) subjectTitleEl.textContent = labels.notFound;
    if (subjectDescEl) subjectDescEl.textContent = labels.notFoundSub;
    if (chapterListTitleEl) chapterListTitleEl.textContent = labels.chapterList;
    if (chapterListSubtitleEl) chapterListSubtitleEl.textContent = labels.chapterListSub;
    if (chaptersCountEl) chaptersCountEl.textContent = "";
    if (chaptersGridEl) chaptersGridEl.innerHTML = "";
    if (noChaptersEl) noChaptersEl.style.display = "flex";
    if (noChaptersTitleEl) noChaptersTitleEl.textContent = labels.notFound;
    if (noChaptersTextEl) noChaptersTextEl.textContent = labels.notFoundSub;
    if (noChaptersBtnEl) noChaptersBtnEl.textContent = labels.backToSubjects;
    if (noChaptersBtnEl) noChaptersBtnEl.href = "subjects.html?medium=" + encodeURIComponent(medium);
    if (backSubjectsBtnEl) {
      backSubjectsBtnEl.textContent = labels.backSubjects;
      backSubjectsBtnEl.href = "subjects.html?medium=" + encodeURIComponent(medium);
    }

    renderBreadcrumbs(null);
  }

  function renderPage() {
    const subject = getSubjectObject();

    if (!subject) {
      renderNotFound();
      return;
    }

    const chapters = getChaptersForSubject();
    const subjectName = getSubjectName(subject);
    const subjectDescription = getSubjectDescription(subject);
    const categoryLabel = getCategoryLabel(subject);
    const mediumLabel = getMediumLabel();

    document.title = subjectName + " — Chapters — see2083";

    if (subjectIconEl) subjectIconEl.textContent = subject.icon || "📚";
    if (chaptersKickerEl) chaptersKickerEl.textContent = mediumLabel;
    if (subjectTitleEl) subjectTitleEl.textContent = subjectName;

    if (subjectDescEl) {
      subjectDescEl.textContent = subjectDescription;
    }

    if (chaptersMetaRowEl) {
      chaptersMetaRowEl.innerHTML =
        '<span class="badge badge-blue">' +
          escapeHTML(chapters.length || subject.units || 0) + " " + escapeHTML(labels.units) +
        '</span>' +
        '<span class="badge badge-gray">' +
          escapeHTML(categoryLabel) +
        '</span>';
    }

    if (chapterListTitleEl) chapterListTitleEl.textContent = labels.chapterList;
    if (chapterListSubtitleEl) chapterListSubtitleEl.textContent = labels.chapterListSub;

    if (chaptersCountEl) {
      chaptersCountEl.textContent =
        chapters.length + " " + (isNp ? "अध्याय" : "chapters");
    }

    if (backSubjectsBtnEl) {
      backSubjectsBtnEl.textContent = labels.backSubjects;
      backSubjectsBtnEl.href = "subjects.html?medium=" + encodeURIComponent(medium);
    }

    if (noChaptersTitleEl) noChaptersTitleEl.textContent = labels.noChaptersTitle;
    if (noChaptersTextEl) noChaptersTextEl.textContent = labels.noChaptersText;
    if (noChaptersBtnEl) {
      noChaptersBtnEl.textContent = labels.backToSubjects;
      noChaptersBtnEl.href = "subjects.html?medium=" + encodeURIComponent(medium);
    }

    renderBreadcrumbs(subject);

    if (!chaptersGridEl) return;

    chaptersGridEl.innerHTML = "";

    if (!chapters.length) {
      if (noChaptersEl) noChaptersEl.style.display = "flex";
      return;
    }

    if (noChaptersEl) noChaptersEl.style.display = "none";

    chapters.forEach(function (chapter) {
      chaptersGridEl.appendChild(createChapterCard(chapter));
    });
  }

  renderPage();
})();
