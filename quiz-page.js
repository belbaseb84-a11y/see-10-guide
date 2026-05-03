/* ===================================================
   see2083 — Quiz Page Logic
   Sets up MCQ practice filters and page labels
   =================================================== */

(function () {
  const medium = getParam("medium") || getCurrentMedium() || "english";
  const requestedSubject = getParam("subject") || "all";
  const requestedChapter = getParam("chapter") || "";

  if (typeof setMedium === "function") {
    setMedium(medium);
  }

  if (typeof pageInit === "function") {
    pageInit("subjects");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np";

  let activeSubject = requestedSubject || "all";

  const labels = {
    home: isNp ? "गृहपृष्ठ" : "Home",
    practice: isNp ? "अभ्यास" : "Practice",
    title: isNp ? "MCQ अभ्यास" : "MCQ Practice",
    sub: isNp
      ? "प्रत्येक प्रश्नको उत्तर दिनुहोस्, तत्काल प्रतिक्रिया पाउनुहोस् र व्याख्यासहित सिक्नुहोस्।"
      : "Answer each question, get instant feedback, and learn with explanations.",
    chooseSubject: isNp ? "विषय छान्नुहोस्" : "Choose subject",
    filterSub: isNp ? "विषय अनुसार प्रश्नहरू फिल्टर गर्नुहोस्।" : "Filter questions by subject.",
    browseSubjects: isNp ? "विषयहरू हेर्नुहोस्" : "Browse subjects",
    practiceInfo: isNp ? "अभ्यास जानकारी" : "Practice info",
    questions: isNp ? "प्रश्नहरू" : "Questions",
    selected: isNp ? "छानिएको" : "Selected",
    mode: isNp ? "मोड" : "Mode",
    instantFeedback: isNp ? "तत्काल प्रतिक्रिया" : "Instant feedback",
    all: isNp ? "सबै" : "All",
    noQuestions: isNp
      ? "यस विषय वा अध्यायमा MCQ प्रश्नहरू छिट्टै थपिनेछन्।"
      : "MCQ questions for this subject or chapter are coming soon.",
    noQuestionsSub: isNp
      ? "अहिले demo questions मात्र उपलब्ध छन्।"
      : "For now, only demo questions are available."
  };

  const titleEl = document.getElementById("quiz-page-title");
  const subEl = document.getElementById("quiz-page-sub");
  const kickerEl = document.getElementById("practice-kicker");
  const selectorLabelEl = document.getElementById("selector-label");
  const selectorSubtitleEl = document.getElementById("selector-subtitle");
  const backLink = document.getElementById("back-link");
  const filterContainer = document.getElementById("subject-filter-btns");
  const quizContainer = document.getElementById("quiz-container");
  const infoTitleEl = document.getElementById("practice-info-title");
  const infoListEl = document.getElementById("practice-info-list");

  function getMediumLabel() {
    if (!hasS2083Data()) return medium;

    const mediumObj = safeArray(S2083.mediums).find(function (item) {
      return item.id === medium;
    });

    if (!mediumObj) return medium;

    return isNp ? (mediumObj.labelNp || mediumObj.label) : mediumObj.label;
  }

  function getSubjectName(subjectId) {
    if (subjectId === "all") return labels.all;

    const subject = getSubjectById(subjectId);

    if (!subject) return subjectId;

    return isNp ? (subject.nameNp || subject.name) : subject.name;
  }

  function getAvailableSubjects() {
    if (!hasS2083Data()) return ["all"];

    const ids = safeArray(S2083.sampleMCQs)
      .map(function (question) {
        return question.subject;
      })
      .filter(Boolean);

    const uniqueIds = Array.from(new Set(ids));

    return ["all"].concat(uniqueIds);
  }

  function getQuestions() {
    if (!hasS2083Data() || !Array.isArray(S2083.sampleMCQs)) {
      return [];
    }

    let questions = S2083.sampleMCQs;

    if (activeSubject !== "all") {
      questions = questions.filter(function (question) {
        return question.subject === activeSubject;
      });
    }

    if (requestedChapter) {
      const chapterQuestions = questions.filter(function (question) {
        return question.chapter === requestedChapter;
      });

      if (chapterQuestions.length) {
        return chapterQuestions;
      }
    }

    return questions;
  }

  function updateInfo(questions) {
    if (!infoListEl) return;

    infoListEl.innerHTML =
      '<div>' +
        '<span>' + escapeHTML(labels.questions) + '</span>' +
        '<strong>' + escapeHTML(questions.length) + '</strong>' +
      '</div>' +
      '<div>' +
        '<span>' + escapeHTML(labels.selected) + '</span>' +
        '<strong>' + escapeHTML(getSubjectName(activeSubject)) + '</strong>' +
      '</div>' +
      '<div>' +
        '<span>' + escapeHTML(labels.mode) + '</span>' +
        '<strong>' + escapeHTML(labels.instantFeedback) + '</strong>' +
      '</div>';
  }

  function renderNoQuestions() {
    if (!quizContainer) return;

    quizContainer.innerHTML =
      '<div class="empty-state">' +
        '<div class="empty-icon">✅</div>' +
        '<h3>' + escapeHTML(labels.noQuestions) + '</h3>' +
        '<p>' + escapeHTML(labels.noQuestionsSub) + '</p>' +
        '<a href="subjects.html?medium=' + encodeURIComponent(medium) + '" class="btn btn-primary">' +
          escapeHTML(labels.browseSubjects) +
        '</a>' +
      '</div>';
  }

  function loadQuiz() {
    const questions = getQuestions();

    updateInfo(questions);

    if (!questions.length) {
      renderNoQuestions();
      return;
    }

    Quiz.init(questions, lang);
  }

  function renderFilters() {
    if (!filterContainer) return;

    const subjects = getAvailableSubjects();

    if (!subjects.includes(activeSubject)) {
      activeSubject = "all";
    }

    filterContainer.innerHTML = "";

    subjects.forEach(function (subjectId) {
      const button = document.createElement("button");

      button.className = "filter-btn" + (subjectId === activeSubject ? " active" : "");
      button.type = "button";
      button.textContent = getSubjectName(subjectId);

      button.addEventListener("click", function () {
        activeSubject = subjectId;

        document.querySelectorAll("#subject-filter-btns .filter-btn").forEach(function (btn) {
          btn.classList.remove("active");
        });

        button.classList.add("active");
        loadQuiz();
      });

      filterContainer.appendChild(button);
    });
  }

  function renderBreadcrumbs() {
    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: labels.home, href: "index.html" },
      { label: getMediumLabel(), href: "subjects.html?medium=" + encodeURIComponent(medium) },
      { label: labels.title }
    ]);
  }

  function initPage() {
    document.title = labels.title + " — see2083";

    if (titleEl) titleEl.textContent = labels.title;
    if (subEl) subEl.textContent = labels.sub;
    if (kickerEl) kickerEl.textContent = labels.practice;
    if (selectorLabelEl) selectorLabelEl.textContent = labels.chooseSubject;
    if (selectorSubtitleEl) selectorSubtitleEl.textContent = labels.filterSub;
    if (infoTitleEl) infoTitleEl.textContent = labels.practiceInfo;

    if (backLink) {
      backLink.href = "subjects.html?medium=" + encodeURIComponent(medium);
      backLink.textContent = labels.browseSubjects;
    }

    renderBreadcrumbs();
    renderFilters();
    loadQuiz();
  }

  initPage();
})();