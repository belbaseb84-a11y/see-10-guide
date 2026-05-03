/* ===================================================
   see2083 — Chapter Page Logic
   Renders chapter dashboard + study options
   =================================================== */

(function () {
  const medium = getParam("medium") || getCurrentMedium() || "english";
  const subjectId = getParam("subject") || "science";
  const chapterId = getParam("chapter") || "scientific-study";

  if (typeof setMedium === "function") {
    setMedium(medium);
  }

  if (typeof pageInit === "function") {
    pageInit("subjects");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np";

  const labels = {
    home: isNp ? "गृहपृष्ठ" : "Home",
    medium: isNp ? "माध्यम" : "Medium",
    subjects: isNp ? "विषयहरू" : "Subjects",
    chapter: isNp ? "अध्याय" : "Chapter",
    save: isNp ? "अध्याय सुरक्षित गर्नुहोस्" : "Save Chapter",
    saved: isNp ? "सुरक्षित भयो" : "Saved",
    viewOptions: isNp ? "अध्ययन विकल्प हेर्नुहोस् ↓" : "View Study Options ↓",
    studyOptions: isNp ? "अध्ययन विकल्पहरू" : "Study Options",
    studyOptionsSub: isNp
      ? "यो अध्यायमा के अध्ययन गर्ने छान्नुहोस्।"
      : "Choose what you want to do in this chapter.",
    pathTitle: isNp ? "सुझाव गरिएको अध्ययन क्रम" : "Recommended study path",
    pathSub: isNp
      ? "राम्रो revision का लागि यो क्रम पालना गर्नुहोस्।"
      : "Follow this order for better revision.",
    chapterInfo: isNp ? "अध्याय जानकारी" : "Chapter info",
    contentNotice: isNp
      ? "📝 अध्ययन सामग्री तयार भइरहेछ। तपाईं अध्याय संरचना हेर्न र नमूना प्रश्नहरू अभ्यास गर्न सक्नुहुन्छ।"
      : "📝 Study materials are being prepared. You can explore the chapter structure and practice sample questions.",
    open: isNp ? "खोल्नुहोस्" : "Open",
    start: isNp ? "सुरु गर्नुहोस्" : "Start",
    soon: isNp ? "चाँडै" : "Soon",
    ready: isNp ? "Ready" : "Ready",
    demo: isNp ? "Demo" : "Demo",
    notFound: isNp ? "अध्याय भेटिएन" : "Chapter not found",
    notFoundSub: isNp
      ? "यो अध्याय भेटिएन। कृपया विषय पृष्ठमा फर्कनुहोस्।"
      : "This chapter was not found. Please go back to the subject page.",
    backToSubject: isNp ? "विषयमा फर्कनुहोस्" : "Back to subject"
  };

  const subjectIconEl = document.getElementById("chapter-subject-icon");
  const metaEl = document.getElementById("chapter-meta");
  const titleEl = document.getElementById("chapter-title");
  const summaryEl = document.getElementById("chapter-summary");
  const bookmarkBtn = document.getElementById("bookmark-btn");
  const bmLabel = document.getElementById("bm-label");
  const viewOptionsBtn = document.getElementById("view-options-btn");
  const contentNotice = document.getElementById("content-notice");
  const pathTitle = document.getElementById("path-title");
  const pathSubtitle = document.getElementById("path-subtitle");
  const pathList = document.getElementById("study-path-list");
  const chapterInfoTitle = document.getElementById("chapter-info-title");
  const chapterInfoList = document.getElementById("chapter-info-list");
  const optionsTitle = document.getElementById("study-options-title");
  const optionsSubtitle = document.getElementById("study-options-subtitle");
  const optionsGrid = document.getElementById("study-options-grid");

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

  function getChapterObject() {
    if (!hasS2083Data()) return null;

    if (typeof S2083.getChapter === "function") {
      return S2083.getChapter(subjectId, chapterId);
    }

    if (!S2083.chapters || !Array.isArray(S2083.chapters[subjectId])) {
      return null;
    }

    return S2083.chapters[subjectId].find(function (item) {
      return item.id === chapterId;
    }) || null;
  }

  function getSubjectName(subject) {
    return isNp ? (subject.nameNp || subject.name) : subject.name;
  }

  function getChapterTitle(chapter) {
    return isNp ? (chapter.titleNp || chapter.title) : chapter.title;
  }

  function getChapterSummary(chapter) {
    return isNp
      ? (chapter.summaryNp || chapter.summary || "")
      : (chapter.summary || "");
  }

  function getOptionUrl(optionId) {
    const base =
      "subject=" + encodeURIComponent(subjectId) +
      "&chapter=" + encodeURIComponent(chapterId) +
      "&medium=" + encodeURIComponent(medium);

    const links = {
      "mcq-practice": "quiz.html?" + base,
      "mock-test": "mock-test.html?" + base,
      "handwritten-note": "notes.html?" + base + "&type=handwritten",
      "easy-note": "notes.html?" + base + "&type=easy",
      "infographic": "notes.html?" + base + "&type=infographic",
      "slide": "notes.html?" + base + "&type=slide",
      "short-questions": "notes.html?" + base + "&type=short",
      "important-questions": "notes.html?" + base + "&type=important",
      "past-questions": "notes.html?" + base + "&type=past",
      "overview": "notes.html?" + base + "&type=overview",
      "theory": "notes.html?" + base + "&type=theory",
      "practical": "notes.html?" + base + "&type=practical",
      "past": "notes.html?" + base + "&type=past"
    };

    return links[optionId] || "notes.html?" + base;
  }

  function getStandardOptions() {
    if (hasS2083Data() && Array.isArray(S2083.studyOptions)) {
      return S2083.studyOptions;
    }

    return [
      {
        id: "easy-note",
        icon: "📝",
        title: "Easy Note",
        titleNp: "सजिलो नोट",
        desc: "Read simplified notes for this chapter.",
        descNp: "यो अध्यायका सजिला नोट पढ्नुहोस्।"
      },
      {
        id: "mcq-practice",
        icon: "✅",
        title: "MCQ Practice",
        titleNp: "MCQ अभ्यास",
        desc: "Practice objective questions.",
        descNp: "वस्तुगत प्रश्न अभ्यास गर्नुहोस्।"
      },
      {
        id: "mock-test",
        icon: "🎯",
        title: "Mock Test",
        titleNp: "मोक टेस्ट",
        desc: "Take a timed practice test.",
        descNp: "समय मिलाएर अभ्यास टेस्ट दिनुहोस्।"
      }
    ];
  }

  function getElectricalOptions() {
    return [
      {
        id: "overview",
        icon: "📘",
        title: "Overview",
        titleNp: "अवलोकन",
        desc: "Understand the main idea and scope of this chapter.",
        descNp: "यो अध्यायको मुख्य विचार र क्षेत्र बुझ्नुहोस्।"
      },
      {
        id: "theory",
        icon: "📖",
        title: "Theory",
        titleNp: "सिद्धान्त",
        desc: "Study core theory, formulas, and definitions.",
        descNp: "मुख्य सिद्धान्त, सूत्र र परिभाषा अध्ययन गर्नुहोस्।"
      },
      {
        id: "practical",
        icon: "🛠️",
        title: "Practical",
        titleNp: "व्यावहारिक",
        desc: "Review practical tasks, tools, and safety points.",
        descNp: "व्यावहारिक काम, उपकरण र सुरक्षा बुँदा हेर्नुहोस्।"
      },
      {
        id: "past",
        icon: "📋",
        title: "Past Questions",
        titleNp: "पुराना प्रश्नहरू",
        desc: "Practice previous exam-style questions.",
        descNp: "पुराना परीक्षा शैलीका प्रश्न अभ्यास गर्नुहोस्।"
      },
      {
        id: "mcq-practice",
        icon: "✅",
        title: "MCQ Practice",
        titleNp: "MCQ अभ्यास",
        desc: "Practice objective questions.",
        descNp: "वस्तुगत प्रश्न अभ्यास गर्नुहोस्।"
      },
      {
        id: "mock-test",
        icon: "🎯",
        title: "Mock Test",
        titleNp: "मोक टेस्ट",
        desc: "Take a timed practice test.",
        descNp: "समय मिलाएर अभ्यास टेस्ट दिनुहोस्।"
      }
    ];
  }

  function getOptions(subject) {
    if (subject && subject.mediumGroup === "electrical") {
      return getElectricalOptions();
    }

    return getStandardOptions();
  }

  function getOptionName(option) {
    return isNp ? (option.titleNp || option.title) : option.title;
  }

  function getOptionDesc(option) {
    return isNp ? (option.descNp || option.desc || "") : (option.desc || "");
  }

  function getOptionStatus(optionId) {
    if (optionId === "mcq-practice" || optionId === "mock-test") {
      return labels.demo;
    }

    if (
      optionId === "easy-note" ||
      optionId === "overview" ||
      optionId === "theory" ||
      optionId === "practical"
    ) {
      return labels.ready;
    }

    return labels.soon;
  }

  function isPrimaryOption(optionId) {
    return optionId === "mcq-practice" || optionId === "mock-test";
  }

  function renderBreadcrumbs(subject, chapter) {
    const mediumLabel = getMediumLabel();
    const subjectName = subject ? getSubjectName(subject) : labels.subjects;
    const chapterTitle = chapter ? getChapterTitle(chapter) : labels.notFound;

    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: labels.home, href: "index.html" },
      { label: mediumLabel, href: "subjects.html?medium=" + encodeURIComponent(medium) },
      {
        label: subjectName,
        href:
          "chapters.html?subject=" +
          encodeURIComponent(subjectId) +
          "&medium=" +
          encodeURIComponent(medium)
      },
      { label: chapterTitle }
    ]);
  }

  function renderStudyPath(subject) {
    if (!pathList) return;

    const path = subject && subject.mediumGroup === "electrical"
      ? [
          { icon: "📘", title: isNp ? "अवलोकन" : "Overview", url: getOptionUrl("overview") },
          { icon: "📖", title: isNp ? "सिद्धान्त" : "Theory", url: getOptionUrl("theory") },
          { icon: "🛠️", title: isNp ? "व्यावहारिक" : "Practical", url: getOptionUrl("practical") },
          { icon: "🎯", title: isNp ? "मोक टेस्ट" : "Mock Test", url: getOptionUrl("mock-test") }
        ]
      : [
          { icon: "📝", title: isNp ? "सजिलो नोट" : "Easy Note", url: getOptionUrl("easy-note") },
          { icon: "✅", title: isNp ? "MCQ अभ्यास" : "MCQ Practice", url: getOptionUrl("mcq-practice") },
          { icon: "⭐", title: isNp ? "महत्त्वपूर्ण प्रश्न" : "Important Questions", url: getOptionUrl("important-questions") },
          { icon: "🎯", title: isNp ? "मोक टेस्ट" : "Mock Test", url: getOptionUrl("mock-test") }
        ];

    pathList.innerHTML = "";

    path.forEach(function (item, index) {
      const link = document.createElement("a");
      link.className = "study-path-item";
      link.href = item.url;

      link.innerHTML =
        '<span class="study-path-step">' + (index + 1) + '</span>' +
        '<span class="study-path-icon">' + escapeHTML(item.icon) + '</span>' +
        '<strong>' + escapeHTML(item.title) + '</strong>';

      pathList.appendChild(link);
    });
  }

  function renderChapterInfo(subject, chapter) {
    if (!chapterInfoList) return;

    const subjectName = getSubjectName(subject);

    chapterInfoList.innerHTML =
      '<div>' +
        '<span>' + (isNp ? "विषय" : "Subject") + '</span>' +
        '<strong>' + escapeHTML(subjectName) + '</strong>' +
      '</div>' +
      '<div>' +
        '<span>' + labels.chapter + '</span>' +
        '<strong>' + escapeHTML(chapter.number || "—") + '</strong>' +
      '</div>' +
      '<div>' +
        '<span>' + (isNp ? "माध्यम" : "Medium") + '</span>' +
        '<strong>' + escapeHTML(getMediumLabel()) + '</strong>' +
      '</div>';
  }

  function renderStudyOptions(subject) {
    if (!optionsGrid) return;

    const options = getOptions(subject);

    optionsGrid.innerHTML = "";

    options.forEach(function (option) {
      const card = document.createElement("a");

      const title = getOptionName(option);
      const desc = getOptionDesc(option);
      const status = getOptionStatus(option.id);
      const primary = isPrimaryOption(option.id);

      card.href = getOptionUrl(option.id);
      card.className = "study-option-card chapter-option-card";

      card.innerHTML =
        '<div class="chapter-option-main">' +
          '<div class="study-option-icon">' + escapeHTML(option.icon) + '</div>' +
          '<div class="study-option-info">' +
            '<div class="study-option-title-row">' +
              '<div class="study-option-title">' + escapeHTML(title) + '</div>' +
              '<span class="option-status">' + escapeHTML(status) + '</span>' +
            '</div>' +
            '<div class="study-option-desc">' + escapeHTML(desc) + '</div>' +
          '</div>' +
        '</div>' +
        '<span class="btn btn-sm ' + (primary ? "btn-primary" : "btn-ghost") + '" style="pointer-events:none;flex-shrink:0">' +
          (primary ? labels.start : labels.open) +
        ' →</span>';

      optionsGrid.appendChild(card);
    });
  }

  function setupBookmark(subject, chapter) {
    if (!bookmarkBtn || !bmLabel) return;

    const subjectName = getSubjectName(subject);
    const chapterTitle = getChapterTitle(chapter);
    const bmKey = "chapter-" + subjectId + "-" + chapterId;

    function updateButton() {
      const saved = Bookmarks.isBookmarked(bmKey);

      bmLabel.textContent = saved ? labels.saved : labels.save;
      bookmarkBtn.classList.toggle("bookmarked", saved);
    }

    bookmarkBtn.addEventListener("click", function () {
      const added = Bookmarks.toggle({
        id: bmKey,
        type: "chapter",
        title: chapterTitle,
        subjectTitle: subjectName,
        url:
          "chapter.html?subject=" +
          encodeURIComponent(subjectId) +
          "&chapter=" +
          encodeURIComponent(chapterId) +
          "&medium=" +
          encodeURIComponent(medium)
      });

      updateButton();

      if (typeof showToast === "function") {
        showToast(
          added
            ? (isNp ? "अध्याय सुरक्षित भयो" : "Chapter saved")
            : (isNp ? "हटाइयो" : "Removed")
        );
      }
    });

    updateButton();
  }

  function renderNotFound() {
    document.title = labels.notFound + " — see2083";

    if (subjectIconEl) subjectIconEl.textContent = "📚";
    if (metaEl) metaEl.innerHTML = '<span class="badge badge-gray">' + labels.notFound + '</span>';
    if (titleEl) titleEl.textContent = labels.notFound;
    if (summaryEl) summaryEl.textContent = labels.notFoundSub;
    if (contentNotice) contentNotice.textContent = labels.notFoundSub;
    if (pathTitle) pathTitle.textContent = labels.pathTitle;
    if (pathSubtitle) pathSubtitle.textContent = labels.pathSub;
    if (chapterInfoTitle) chapterInfoTitle.textContent = labels.chapterInfo;
    if (optionsTitle) optionsTitle.textContent = labels.studyOptions;
    if (optionsSubtitle) optionsSubtitle.textContent = labels.studyOptionsSub;
    if (pathList) pathList.innerHTML = "";
    if (chapterInfoList) chapterInfoList.innerHTML = "";
    if (optionsGrid) {
      optionsGrid.innerHTML =
        '<div class="empty-state">' +
          '<div class="empty-icon">📚</div>' +
          '<h3>' + labels.notFound + '</h3>' +
          '<p>' + labels.notFoundSub + '</p>' +
          '<a class="btn btn-primary" href="subjects.html?medium=' + encodeURIComponent(medium) + '">' +
            labels.backToSubject +
          '</a>' +
        '</div>';
    }

    renderBreadcrumbs(null, null);
  }

  function renderPage() {
    const subject = getSubjectObject();
    const chapter = getChapterObject();

    if (!subject || !chapter) {
      renderNotFound();
      return;
    }

    const subjectName = getSubjectName(subject);
    const chapterTitle = getChapterTitle(chapter);
    const summary = getChapterSummary(chapter);

    document.title = chapterTitle + " — see2083";

    if (subjectIconEl) subjectIconEl.textContent = subject.icon || "📚";

    if (metaEl) {
      metaEl.innerHTML =
        '<span class="badge badge-blue">' +
          escapeHTML(subject.icon || "📚") + " " + escapeHTML(subjectName) +
        '</span>' +
        '<span class="badge badge-gray">' +
          escapeHTML(labels.chapter) + " " + escapeHTML(chapter.number || "") +
        '</span>';
    }

    if (titleEl) titleEl.textContent = chapterTitle;
    if (summaryEl) summaryEl.textContent = summary;

    if (bookmarkBtn) {
      bookmarkBtn.setAttribute("type", "button");
    }

    if (viewOptionsBtn) {
      viewOptionsBtn.textContent = labels.viewOptions;
    }

    if (contentNotice) contentNotice.textContent = labels.contentNotice;
    if (pathTitle) pathTitle.textContent = labels.pathTitle;
    if (pathSubtitle) pathSubtitle.textContent = labels.pathSub;
    if (chapterInfoTitle) chapterInfoTitle.textContent = labels.chapterInfo;
    if (optionsTitle) optionsTitle.textContent = labels.studyOptions;
    if (optionsSubtitle) optionsSubtitle.textContent = labels.studyOptionsSub;

    renderBreadcrumbs(subject, chapter);
    renderStudyPath(subject);
    renderChapterInfo(subject, chapter);
    renderStudyOptions(subject);
    setupBookmark(subject, chapter);
  }

  renderPage();
})();