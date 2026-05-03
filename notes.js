/* ===================================================
   see2083 — Notes Page Logic
   Renders chapter study material page
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

  const subject = getSubjectObject();
  const chapter = getChapterObject();
  const isElectrical = subject && subject.mediumGroup === "electrical";

  const standardTabs = [
    { id: "easy", icon: "📝", en: "Easy Note", np: "सजिलो नोट" },
    { id: "handwritten", icon: "✍️", en: "Handwritten Note", np: "हस्तलिखित नोट" },
    { id: "infographic", icon: "📊", en: "Infographic", np: "इन्फोग्राफिक" },
    { id: "slide", icon: "🖼️", en: "Slide", np: "स्लाइड" },
    { id: "short", icon: "❓", en: "Short Questions", np: "छोटा प्रश्नहरू" },
    { id: "important", icon: "⭐", en: "Important Questions", np: "महत्त्वपूर्ण प्रश्नहरू" },
    { id: "past", icon: "📋", en: "Past Questions", np: "पुराना प्रश्नहरू" }
  ];

  const electricalTabs = [
    { id: "overview", icon: "📘", en: "Overview", np: "अवलोकन" },
    { id: "theory", icon: "📖", en: "Theory", np: "सिद्धान्त" },
    { id: "practical", icon: "🛠️", en: "Practical", np: "व्यावहारिक" },
    { id: "past", icon: "📋", en: "Past Questions", np: "पुराना प्रश्नहरू" }
  ];

  const tabs = isElectrical ? electricalTabs : standardTabs;
  const requestedType = getParam("type") || tabs[0].id;
  const currentTab = tabs.find(function (tab) {
    return tab.id === requestedType;
  }) || tabs[0];

  const type = currentTab.id;

  const labels = {
    home: isNp ? "गृहपृष्ठ" : "Home",
    backChapter: isNp ? "← अध्यायमा फर्कनुहोस्" : "← Back to Chapter",
    studyMaterial: isNp ? "अध्ययन सामग्री" : "Study Material",
    studySections: isNp ? "अध्ययन खण्डहरू" : "Study sections",
    chooseMaterial: isNp ? "सामग्री प्रकार छान्नुहोस्।" : "Choose a material type.",
    chapterOverview: isNp ? "अध्याय परिचय" : "Chapter Overview",
    keyPoints: isNp ? "मुख्य बुँदाहरू" : "Key Points",
    comingSoon: isNp
      ? "यो खण्डका विस्तृत सामग्री तयार भइरहेछ।"
      : "Detailed study material for this section is being prepared.",
    comingSoonSub: isNp
      ? "अहिले demo structure मात्र राखिएको छ। पछि वास्तविक नोट, प्रश्न र सामग्री थपिनेछ।"
      : "For now, this page shows the study structure. Real notes, questions, and materials will be added later.",
    practiceMcq: isNp ? "MCQ अभ्यास" : "Practice MCQs",
    mockTest: isNp ? "मोक टेस्ट" : "Mock Test",
    notFound: isNp ? "सामग्री भेटिएन" : "Material not found",
    notFoundSub: isNp
      ? "विषय वा अध्याय भेटिएन। कृपया विषय पृष्ठमा फर्कनुहोस्।"
      : "Subject or chapter was not found. Please go back to the subjects page.",
    backSubjects: isNp ? "विषयहरूमा फर्कनुहोस्" : "Back to subjects"
  };

  const notesKickerEl = document.getElementById("notes-kicker");
  const notesTitleEl = document.getElementById("notes-title");
  const notesSubtitleEl = document.getElementById("notes-subtitle");
  const backChapterBtn = document.getElementById("back-chapter-btn");
  const tabsTitleEl = document.getElementById("tabs-title");
  const tabsSubtitleEl = document.getElementById("tabs-subtitle");
  const tabsEl = document.getElementById("type-tabs");
  const area = document.getElementById("notes-content-area");

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

  function getMediumLabel() {
    if (!hasS2083Data()) return medium;

    const mediumObj = safeArray(S2083.mediums).find(function (item) {
      return item.id === medium;
    });

    if (!mediumObj) return medium;

    return isNp ? (mediumObj.labelNp || mediumObj.label) : mediumObj.label;
  }

  function getSubjectName() {
    if (!subject) return "";
    return isNp ? (subject.nameNp || subject.name) : subject.name;
  }

  function getChapterTitle() {
    if (!chapter) return "";
    return isNp ? (chapter.titleNp || chapter.title) : chapter.title;
  }

  function getChapterSummary() {
    if (!chapter) return "";
    return isNp ? (chapter.summaryNp || chapter.summary || "") : (chapter.summary || "");
  }

  function getTabLabel(tab) {
    return isNp ? tab.np : tab.en;
  }

  function getBaseQuery() {
    return (
      "subject=" + encodeURIComponent(subjectId) +
      "&chapter=" + encodeURIComponent(chapterId) +
      "&medium=" + encodeURIComponent(medium)
    );
  }

  function renderBreadcrumbs() {
    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: labels.home, href: "index.html" },
      { label: getMediumLabel(), href: "subjects.html?medium=" + encodeURIComponent(medium) },
      {
        label: getSubjectName(),
        href: "chapters.html?subject=" + encodeURIComponent(subjectId) + "&medium=" + encodeURIComponent(medium)
      },
      {
        label: getChapterTitle(),
        href: "chapter.html?" + getBaseQuery()
      },
      { label: getTabLabel(currentTab) }
    ]);
  }

  function renderTabs() {
    if (!tabsEl) return;

    tabsEl.innerHTML = "";

    tabs.forEach(function (tab) {
      const link = document.createElement("a");

      link.href = "notes.html?" + getBaseQuery() + "&type=" + encodeURIComponent(tab.id);
      link.className = "notes-tab-link" + (tab.id === type ? " active" : "");
      link.setAttribute("role", "tab");
      link.setAttribute("aria-selected", tab.id === type ? "true" : "false");

      link.innerHTML =
        '<span>' + escapeHTML(tab.icon) + '</span>' +
        '<strong>' + escapeHTML(getTabLabel(tab)) + '</strong>';

      tabsEl.appendChild(link);
    });
  }

  function renderNotFound() {
    document.title = labels.notFound + " — see2083";

    if (notesKickerEl) notesKickerEl.textContent = labels.studyMaterial;
    if (notesTitleEl) notesTitleEl.textContent = labels.notFound;
    if (notesSubtitleEl) notesSubtitleEl.textContent = labels.notFoundSub;
    if (tabsTitleEl) tabsTitleEl.textContent = labels.studySections;
    if (tabsSubtitleEl) tabsSubtitleEl.textContent = labels.chooseMaterial;

    if (backChapterBtn) {
      backChapterBtn.textContent = labels.backSubjects;
      backChapterBtn.href = "subjects.html?medium=" + encodeURIComponent(medium);
    }

    if (tabsEl) tabsEl.innerHTML = "";

    if (area) {
      area.innerHTML =
        '<div class="notes-content notes-reader-card">' +
          '<div class="empty-state">' +
            '<div class="empty-icon">📚</div>' +
            '<h3>' + escapeHTML(labels.notFound) + '</h3>' +
            '<p>' + escapeHTML(labels.notFoundSub) + '</p>' +
            '<a href="subjects.html?medium=' + encodeURIComponent(medium) + '" class="btn btn-primary">' +
              escapeHTML(labels.backSubjects) +
            '</a>' +
          '</div>' +
        '</div>';
    }
  }

  function renderComingSoonContent() {
    const chapterTitle = getChapterTitle();
    const subjectName = getSubjectName();
    const summary = getChapterSummary();
    const typeLabel = getTabLabel(currentTab);

    const mcqUrl = "quiz.html?subject=" + encodeURIComponent(subjectId) + "&chapter=" + encodeURIComponent(chapterId);
    const mockUrl = "mock-test.html?subject=" + encodeURIComponent(subjectId) + "&chapter=" + encodeURIComponent(chapterId);
    const backUrl = "chapter.html?" + getBaseQuery();

    const keyPoints = isNp
      ? [
          "यो अध्यायका आधारभूत अवधारणाहरू बुझ्नुहोस्।",
          "महत्त्वपूर्ण परिभाषा, सूत्र र सिद्धान्तहरू याद गर्नुहोस्।",
          "MCQ, छोटा प्रश्न र महत्वपूर्ण प्रश्न अभ्यास गर्नुहोस्।",
          "विगतका परीक्षा प्रश्नहरू समीक्षा गर्नुहोस्।"
        ]
      : [
          "Understand the basic concepts of this chapter.",
          "Memorize important definitions, formulas, and principles.",
          "Practice MCQs, short questions, and important questions.",
          "Review previous exam-style questions."
        ];

    area.innerHTML =
      '<article class="notes-content notes-reader-card">' +
        '<div class="notes-content-head">' +
          '<span class="notes-content-badge">' + escapeHTML(typeLabel) + '</span>' +
          '<h2>' + escapeHTML(chapterTitle || typeLabel) + '</h2>' +
          '<p>' + escapeHTML(subjectName) + '</p>' +
        '</div>' +

        '<div class="content-notice notes-content-notice">' +
          '<strong>📚 ' + escapeHTML(labels.comingSoon) + '</strong>' +
          '<span>' + escapeHTML(labels.comingSoonSub) + '</span>' +
        '</div>' +

        '<section class="notes-block">' +
          '<h3>' + escapeHTML(labels.chapterOverview) + '</h3>' +
          '<p>' + escapeHTML(summary) + '</p>' +
        '</section>' +

        '<section class="notes-block">' +
          '<h3>' + escapeHTML(labels.keyPoints) + '</h3>' +
          '<ul>' +
            keyPoints.map(function (point) {
              return '<li>' + escapeHTML(point) + '</li>';
            }).join("") +
          '</ul>' +
        '</section>' +

        '<div class="notes-action-row">' +
          '<a href="' + escapeHTML(mcqUrl) + '" class="btn btn-primary btn-sm">' +
            escapeHTML(labels.practiceMcq) +
          '</a>' +
          '<a href="' + escapeHTML(mockUrl) + '" class="btn btn-outline btn-sm">' +
            escapeHTML(labels.mockTest) +
          '</a>' +
          '<a href="' + escapeHTML(backUrl) + '" class="btn btn-ghost btn-sm">' +
            escapeHTML(labels.backChapter) +
          '</a>' +
        '</div>' +
      '</article>';
  }

  function initPage() {
    if (!subject || !chapter) {
      renderNotFound();
      return;
    }

    const typeLabel = getTabLabel(currentTab);
    const chapterTitle = getChapterTitle();
    const subjectName = getSubjectName();

    document.title = typeLabel + " — " + chapterTitle + " — see2083";

    if (notesKickerEl) notesKickerEl.textContent = labels.studyMaterial;
    if (notesTitleEl) notesTitleEl.textContent = typeLabel;
    if (notesSubtitleEl) notesSubtitleEl.textContent = chapterTitle + " · " + subjectName;

    if (backChapterBtn) {
      backChapterBtn.textContent = labels.backChapter;
      backChapterBtn.href = "chapter.html?" + getBaseQuery();
    }

    if (tabsTitleEl) tabsTitleEl.textContent = labels.studySections;
    if (tabsSubtitleEl) tabsSubtitleEl.textContent = labels.chooseMaterial;

    renderBreadcrumbs();
    renderTabs();
    renderComingSoonContent();
  }

  initPage();
})();