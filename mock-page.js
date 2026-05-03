/* ===================================================
   see2083 — Mock Test Page Logic
   Sets up timed mock test page
   =================================================== */

(function () {
  const medium = getParam("medium") || getCurrentMedium() || "english";
  const requestedSubject = getParam("subject") || "";
  const requestedChapter = getParam("chapter") || "";

  if (typeof setMedium === "function") {
    setMedium(medium);
  }

  if (typeof pageInit === "function") {
    pageInit("subjects");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np";
  const TIME_LIMIT = 15 * 60;

  const labels = {
    home: isNp ? "गृहपृष्ठ" : "Home",
    mockTest: isNp ? "मोक टेस्ट" : "Mock Test",
    timedPractice: isNp ? "समयबद्ध अभ्यास" : "Timed practice",
    title: isNp ? "अध्याय मोक टेस्ट" : "Chapter Mock Test",
    subtitle: isNp
      ? "समय राखेर अभ्यास गर्नुहोस् र बुझाएपछि परिणाम हेर्नुहोस्।"
      : "Practice with a timed test and check your result after submit.",
    browseSubjects: isNp ? "विषयहरू हेर्नुहोस्" : "Browse subjects",
    instructions: isNp ? "निर्देशनहरू" : "Instructions",
    instructionsSub: isNp ? "टेस्ट सुरु गर्नु अघि यो पढ्नुहोस्।" : "Read this before starting the test.",
    startTest: isNp ? "टेस्ट सुरु गर्नुहोस्" : "Start Test",
    summaryTitle: isNp ? "टेस्ट सारांश" : "Test summary",
    questions: isNp ? "प्रश्नहरू" : "Questions",
    timeLimit: isNp ? "समय सीमा" : "Time limit",
    mode: isNp ? "मोड" : "Mode",
    mock: isNp ? "मोक" : "Mock",
    minutes: isNp ? "मिनेट" : "minutes",
    summaryNote: isNp
      ? "सही र गलत उत्तर टेस्ट बुझाएपछि मात्र देखाइनेछ।"
      : "Correct and wrong answers are shown only after you submit.",
    testRunning: isNp ? "टेस्ट चलिरहेको छ" : "Test running",
    liveTitle: isNp ? "मोक टेस्ट" : "Mock Test",
    liveSub: isNp
      ? "समय सकिनु अघि सबै प्रश्नको उत्तर दिनुहोस्।"
      : "Answer all questions before the timer ends.",
    noQuestions: isNp
      ? "यस टेस्टका प्रश्नहरू उपलब्ध छैनन्।"
      : "No questions are available for this test.",
    noQuestionsSub: isNp
      ? "अहिले demo questions मात्र उपलब्ध छन्।"
      : "For now, only demo questions are available.",
    backSubjects: isNp ? "विषयहरूमा फर्कनुहोस्" : "Back to subjects"
  };

  const startScreen = document.getElementById("start-screen");
  const testScreen = document.getElementById("test-screen");
  const mockKicker = document.getElementById("mock-kicker");
  const mockTitle = document.getElementById("mock-title");
  const mockSubtitle = document.getElementById("mock-subtitle");
  const mockBackLink = document.getElementById("mock-back-link");
  const instructionsTitle = document.getElementById("instructions-title");
  const instructionsSubtitle = document.getElementById("instructions-subtitle");
  const instructionsList = document.getElementById("instructions-list");
  const startBtn = document.getElementById("start-btn");
  const startBtnLabel = document.getElementById("start-btn-label");
  const summaryTitle = document.getElementById("summary-title");
  const qCountLabel = document.getElementById("q-count-label");
  const qCount = document.getElementById("q-count");
  const timeLabel = document.getElementById("time-label");
  const timeLimit = document.getElementById("time-limit");
  const modeLabel = document.getElementById("mode-label");
  const modeValue = document.getElementById("mode-value");
  const summaryNote = document.getElementById("summary-note");
  const liveKicker = document.getElementById("live-kicker");
  const liveTitle = document.getElementById("live-title");
  const liveSubtitle = document.getElementById("live-subtitle");
  const mockQuestionArea = document.getElementById("mock-question-area");

  function getMediumLabel() {
    if (!hasS2083Data()) return medium;

    const mediumObj = safeArray(S2083.mediums).find(function (item) {
      return item.id === medium;
    });

    if (!mediumObj) return medium;

    return isNp ? (mediumObj.labelNp || mediumObj.label) : mediumObj.label;
  }

  function getSubjectName() {
    if (!requestedSubject) return "";

    const subject = getSubjectById(requestedSubject);
    if (!subject) return "";

    return isNp ? (subject.nameNp || subject.name) : subject.name;
  }

  function getChapterTitle() {
    if (!requestedSubject || !requestedChapter || !hasS2083Data()) return "";

    let chapter = null;

    if (typeof S2083.getChapter === "function") {
      chapter = S2083.getChapter(requestedSubject, requestedChapter);
    } else if (S2083.chapters && Array.isArray(S2083.chapters[requestedSubject])) {
      chapter = S2083.chapters[requestedSubject].find(function (item) {
        return item.id === requestedChapter;
      }) || null;
    }

    if (!chapter) return "";

    return isNp ? (chapter.titleNp || chapter.title) : chapter.title;
  }

  function getQuestions() {
    if (!hasS2083Data() || !Array.isArray(S2083.mockTestQuestions)) {
      return [];
    }

    let questions = S2083.mockTestQuestions;

    if (requestedSubject) {
      const subjectQuestions = questions.filter(function (question) {
        return question.subject === requestedSubject;
      });

      if (subjectQuestions.length) {
        questions = subjectQuestions;
      }
    }

    if (requestedChapter) {
      const chapterQuestions = questions.filter(function (question) {
        return question.chapter === requestedChapter;
      });

      if (chapterQuestions.length) {
        questions = chapterQuestions;
      }
    }

    return questions.slice(0, 10);
  }

  const questions = getQuestions();

  function renderBreadcrumbs() {
    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: labels.home, href: "index.html" },
      { label: getMediumLabel(), href: "subjects.html?medium=" + encodeURIComponent(medium) },
      { label: labels.mockTest }
    ]);
  }

  function renderInstructions() {
    if (!instructionsList) return;

    const instructions = isNp
      ? [
          "प्रत्येक प्रश्नको लागि एउटा मात्र उत्तर छान्नुहोस्।",
          "टेस्ट सुरु गरेपछि टाइमर चल्न थाल्छ।",
          "सही/गलत उत्तर टेस्ट बुझाएपछि मात्र देखाइनेछ।",
          "जुनसुकै प्रश्नमा जान सक्नुहुन्छ।",
          "समय सकिएपछि टेस्ट स्वतः बुझाइनेछ।"
        ]
      : [
          "Choose only one answer per question.",
          "The timer starts when you begin the test.",
          "Correct and wrong answers are shown only after you submit.",
          "You can navigate to any question at any time.",
          "The test auto-submits when time runs out."
        ];

    instructionsList.innerHTML = "";

    instructions.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      instructionsList.appendChild(li);
    });
  }

  function renderNoQuestions() {
    if (!mockQuestionArea) return;

    if (startBtn) {
      startBtn.disabled = true;
      startBtn.classList.add("disabled");
    }

    mockQuestionArea.innerHTML =
      '<div class="empty-state">' +
        '<div class="empty-icon">🎯</div>' +
        '<h3>' + escapeHTML(labels.noQuestions) + '</h3>' +
        '<p>' + escapeHTML(labels.noQuestionsSub) + '</p>' +
        '<a href="subjects.html?medium=' + encodeURIComponent(medium) + '" class="btn btn-primary">' +
          escapeHTML(labels.backSubjects) +
        '</a>' +
      '</div>';
  }

  function startTest() {
    if (!questions.length) {
      renderNoQuestions();
      return;
    }

    if (startScreen) startScreen.style.display = "none";
    if (testScreen) testScreen.style.display = "";

    MockTest.init(questions, TIME_LIMIT, lang);
  }

  function initLabels() {
    const subjectName = getSubjectName();
    const chapterTitle = getChapterTitle();

    let subtitle = labels.subtitle;

    if (chapterTitle && subjectName) {
      subtitle = chapterTitle + " · " + subjectName;
    } else if (subjectName) {
      subtitle = subjectName + " · " + labels.subtitle;
    }

    document.title = labels.mockTest + " — see2083";

    if (mockKicker) mockKicker.textContent = labels.timedPractice;
    if (mockTitle) mockTitle.textContent = labels.title;
    if (mockSubtitle) mockSubtitle.textContent = subtitle;

    if (mockBackLink) {
      mockBackLink.href = "subjects.html?medium=" + encodeURIComponent(medium);
      mockBackLink.textContent = labels.browseSubjects;
    }

    if (instructionsTitle) instructionsTitle.textContent = labels.instructions;
    if (instructionsSubtitle) instructionsSubtitle.textContent = labels.instructionsSub;
    if (startBtnLabel) startBtnLabel.textContent = labels.startTest;

    if (summaryTitle) summaryTitle.textContent = labels.summaryTitle;
    if (qCountLabel) qCountLabel.textContent = labels.questions;
    if (qCount) qCount.textContent = questions.length;
    if (timeLabel) timeLabel.textContent = labels.timeLimit;
    if (timeLimit) timeLimit.textContent = "15 " + labels.minutes;
    if (modeLabel) modeLabel.textContent = labels.mode;
    if (modeValue) modeValue.textContent = labels.mock;
    if (summaryNote) summaryNote.textContent = labels.summaryNote;

    if (liveKicker) liveKicker.textContent = labels.testRunning;
    if (liveTitle) liveTitle.textContent = labels.liveTitle;
    if (liveSubtitle) liveSubtitle.textContent = labels.liveSub;
  }

  function initPage() {
    renderBreadcrumbs();
    initLabels();
    renderInstructions();

    if (startBtn) {
      startBtn.addEventListener("click", startTest);
    }

    if (!questions.length) {
      renderNoQuestions();
    }
  }

  initPage();
})();