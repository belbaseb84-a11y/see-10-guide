/* ===================================================
   see2083 — Subjects Page Logic
   Renders subjects by medium and category
   Electrical medium shows ONLY 4 technical subjects
   =================================================== */

(function () {
  const medium = getParam("medium") || getCurrentMedium() || "english";

  if (typeof setMedium === "function") {
    setMedium(medium);
  }

  if (typeof pageInit === "function") {
    pageInit("subjects");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np" || medium === "nepali";

  const labels = {
    title: isNp ? "विषयहरू" : "Subjects",

    standardSub: isNp
      ? "अध्याय र अध्ययन सामग्री हेर्न विषय छान्नुहोस्।"
      : "Choose a subject to view its chapters and study materials.",

    electricalSub: isNp
      ? "Grade 10 Electrical Engineering का technical subjects मात्र। Common SEE subjects English Medium मा उपलब्ध छन्।"
      : "Grade 10 technical subjects only. Common SEE subjects are available from English/Nepali medium.",

    all: isNp ? "सबै" : "All",
    compulsory: isNp ? "अनिवार्य" : "Compulsory",
    optional: isNp ? "ऐच्छिक" : "Optional",
    technical: isNp ? "प्राविधिक" : "Technical",

    technicalTitle: isNp
      ? "Electrical Engineering विषयहरू"
      : "Electrical Engineering subjects",

    technicalSub: isNp
      ? "Grade 10 का 4 technical subjects।"
      : "Grade 10 technical subjects only. Common SEE subjects are available from English/Nepali medium.",

    viewChapters: isNp ? "अध्यायहरू हेर्नुहोस्" : "View chapters",
    changeMedium: isNp ? "माध्यम परिवर्तन गर्नुहोस्" : "Change medium",

    noSubjects: isNp
      ? "यस फिल्टरका लागि कुनै विषय भेटिएन।"
      : "No subjects found for this filter.",

    home: isNp ? "गृहपृष्ठ" : "Home",
    medium: isNp ? "माध्यम" : "Medium",
    units: isNp ? "एकाइ" : "units"
  };

  const mediumObj = hasS2083Data()
    ? safeArray(S2083.mediums).find(function (item) {
        return item.id === medium;
      })
    : null;

  const mediumLabel = mediumObj
    ? (isNp ? (mediumObj.labelNp || mediumObj.label) : mediumObj.label)
    : medium;

  const pageTitle = document.getElementById("page-title");
  const pageSub = document.getElementById("page-sub");
  const kicker = document.getElementById("subjects-kicker");
  const changeMediumBtn = document.getElementById("change-medium-btn");

  if (pageTitle) pageTitle.textContent = labels.title;
  if (pageSub) {
    pageSub.textContent = medium === "electrical" ? labels.electricalSub : labels.standardSub;
  }
  if (kicker) kicker.textContent = mediumLabel;
  if (changeMediumBtn) changeMediumBtn.textContent = labels.changeMedium;

  const filterAll = document.getElementById("filter-all");
  const filterCompulsory = document.getElementById("filter-compulsory");
  const filterOptional = document.getElementById("filter-optional");
  const noSubjectsText = document.getElementById("no-subjects-text");

  if (filterAll) filterAll.textContent = labels.all;
  if (filterCompulsory) filterCompulsory.textContent = labels.compulsory;
  if (filterOptional) filterOptional.textContent = labels.optional;
  if (noSubjectsText) noSubjectsText.textContent = labels.noSubjects;

  const technicalTitle = document.getElementById("technical-title");
  const technicalSubtitle = document.getElementById("technical-subtitle");

  if (technicalTitle) technicalTitle.textContent = labels.technicalTitle;
  if (technicalSubtitle) technicalSubtitle.textContent = labels.technicalSub;

  document.title = labels.title + " — " + mediumLabel + " — see2083";

  renderBreadcrumb(document.getElementById("breadcrumb"), [
    { label: labels.home, href: "index.html" },
    { label: labels.medium, href: "medium.html" },
    { label: mediumLabel }
  ]);

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

  function getChapterCount(subject) {
    if (hasS2083Data() && typeof S2083.getChapters === "function") {
      const chapters = safeArray(S2083.getChapters(subject.id, medium));
      if (chapters.length) return chapters.length;
    }

    const chapterCount = getChapterCountForSubject(subject.id);
    return chapterCount || subject.units || 0;
  }

  function createSubjectCard(subject) {
    const name = getSubjectName(subject);
    const desc = getSubjectDescription(subject);
    const categoryLabel = getCategoryLabel(subject);
    const chapterCount = getChapterCount(subject);

    const card = document.createElement("a");

    card.className = "card card-link subject-card subject-page-card";

    card.href =
      "chapters.html?subject=" +
      encodeURIComponent(subject.id) +
      "&medium=" +
      encodeURIComponent(medium);

    card.innerHTML =
      '<div class="subject-card-top">' +
        '<div class="subject-card-icon">' + escapeHTML(subject.icon || "📚") + '</div>' +
        '<span class="subject-category-pill">' + escapeHTML(categoryLabel) + '</span>' +
      '</div>' +

      '<div class="subject-card-meta">' +
        escapeHTML(chapterCount) + " " + escapeHTML(labels.units) +
      '</div>' +

      '<div class="subject-card-title">' + escapeHTML(name) + '</div>' +

      '<div class="subject-card-desc">' + escapeHTML(desc) + '</div>' +

      '<div class="subject-card-footer">' +
        '<span class="btn btn-outline btn-sm" style="pointer-events:none">' +
          escapeHTML(labels.viewChapters) +
        ' →</span>' +
      '</div>';

    return card;
  }

  function getCommonSubjects() {
    if (!hasS2083Data()) return [];

    return safeArray(S2083.subjects).filter(function (subject) {
      return subject.mediumGroup === "common";
    });
  }

  function getElectricalSubjects() {
    if (!hasS2083Data()) return [];

    return safeArray(S2083.subjects).filter(function (subject) {
      return subject.mediumGroup === "electrical";
    });
  }

  function renderSubjectList(subjects, container) {
    if (!container) return;

    container.innerHTML = "";

    subjects.forEach(function (subject) {
      container.appendChild(createSubjectCard(subject));
    });
  }

  function renderStandardSubjects(filter) {
    const subjectGrid = document.getElementById("subject-grid");
    const noSubjects = document.getElementById("no-subjects");
    const subjectsCount = document.getElementById("subjects-count");

    let subjects = getCommonSubjects();

    if (filter !== "all") {
      subjects = subjects.filter(function (subject) {
        return subject.category === filter;
      });
    }

    renderSubjectList(subjects, subjectGrid);

    if (subjectsCount) {
      subjectsCount.textContent =
        subjects.length + " " + (isNp ? "विषय" : "subjects");
    }

    if (noSubjects) {
      noSubjects.style.display = subjects.length ? "none" : "flex";
    }
  }

  function initStandardFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });

        button.classList.add("active");
        renderStandardSubjects(button.dataset.filter || "all");
      });
    });
  }

  function renderElectricalSubjectsOnly() {
    const techGrid = document.getElementById("electrical-tech-grid");

    const technicalSubjects = getElectricalSubjects();

    renderSubjectList(technicalSubjects, techGrid);

    const expectedSubjectIds = [
      "electrical-machine",
      "basic-electronics",
      "industrial-installation-maintenance",
      "utilization-electrical-energy"
    ];

    const hasCorrectFour =
      technicalSubjects.length === 4 &&
      expectedSubjectIds.every(function (id) {
        return technicalSubjects.some(function (subject) {
          return subject.id === id;
        });
      });

    if (!hasCorrectFour && techGrid) {
      console.warn(
        "Electrical Engineering should contain only 4 Grade 10 technical subjects:",
        expectedSubjectIds
      );
    }
  }

  function initPage() {
    const standardSections = document.getElementById("standard-sections");
    const electricalSections = document.getElementById("electrical-sections");

    if (!hasS2083Data()) {
      if (standardSections) {
        standardSections.innerHTML =
          '<div class="empty-state">' +
            '<div class="empty-icon">📚</div>' +
            '<h3>Subject data not found</h3>' +
            '<p>Please check that js/data.js is loaded correctly.</p>' +
          '</div>';
      }
      return;
    }

    if (medium === "electrical") {
      if (standardSections) standardSections.style.display = "none";
      if (electricalSections) electricalSections.style.display = "block";

      renderElectricalSubjectsOnly();
      return;
    }

    if (standardSections) standardSections.style.display = "block";
    if (electricalSections) electricalSections.style.display = "none";

    initStandardFilters();
    renderStandardSubjects("all");
  }

  initPage();
})();
