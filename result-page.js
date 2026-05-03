/* ===================================================
   see2083 — Result Page Logic
   Shows mock / quiz result and answer review
   =================================================== */

(function () {
  if (typeof pageInit === "function") {
    pageInit("subjects");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np";

  const labels = {
    home: isNp ? "गृहपृष्ठ" : "Home",
    result: isNp ? "नतिजा" : "Result",
    noResult: isNp ? "कुनै परिणाम भेटिएन" : "No result found",
    noResultSub: isNp
      ? "पहिले मोक टेस्ट वा MCQ अभ्यास दिनुहोस्।"
      : "Please take a mock test or MCQ practice first.",
    takeTest: isNp ? "मोक टेस्ट दिनुहोस्" : "Take Mock Test",
    practiceMcq: isNp ? "MCQ अभ्यास" : "Practice MCQs",
    homeBtn: isNp ? "गृहपृष्ठ" : "Home",
    yourResult: isNp ? "तपाईंको परिणाम" : "Your Result",
    excellent: isNp ? "उत्कृष्ट!" : "Excellent!",
    good: isNp ? "राम्रो काम!" : "Good job!",
    practiceMore: isNp ? "अझ अभ्यास गर्नुहोस्!" : "Keep practicing!",
    dontGiveUp: isNp ? "हार नमान्नुहोस्!" : "Do not give up!",
    score: isNp ? "अङ्क" : "Score",
    correct: isNp ? "सही" : "Correct",
    wrong: isNp ? "गलत" : "Wrong",
    total: isNp ? "जम्मा" : "Total",
    timeTaken: isNp ? "लिएको समय" : "Time taken",
    timeUp: isNp ? "समय समाप्त" : "Time is up",
    reviewAnswers: isNp ? "उत्तर समीक्षा" : "Review answers",
    tryAgain: isNp ? "फेरि प्रयास" : "Try again",
    answerReview: isNp ? "उत्तर समीक्षा" : "Answer Review",
    reviewUnavailable: isNp ? "समीक्षा उपलब्ध छैन।" : "Review is not available for this result.",
    question: isNp ? "प्रश्न" : "Question",
    yourAnswer: isNp ? "तपाईंको उत्तर" : "Your answer",
    correctAnswer: isNp ? "सही उत्तर" : "Correct answer",
    notAnswered: isNp ? "उत्तर दिइएन" : "Not answered",
    explanation: isNp ? "व्याख्या" : "Explanation",
    mode: isNp ? "मोड" : "Mode",
    mock: isNp ? "मोक टेस्ट" : "Mock test",
    practice: isNp ? "MCQ अभ्यास" : "MCQ practice"
  };

  const resultArea = document.getElementById("result-area");
  const reviewArea = document.getElementById("review-area");

  function getStoredResult() {
    const mockResult = sessionStorage.getItem("s2083_mock_result");
    const quizResult = sessionStorage.getItem("s2083_quiz_result");
    const resultJSON = mockResult || quizResult;

    if (!resultJSON) return null;

    try {
      return JSON.parse(resultJSON);
    } catch (error) {
      return null;
    }
  }

  const result = getStoredResult();

  function getGradeData(pct) {
    if (pct >= 80) {
      return {
        icon: "🏆",
        message: labels.excellent,
        className: "excellent"
      };
    }

    if (pct >= 60) {
      return {
        icon: "🎉",
        message: labels.good,
        className: "good"
      };
    }

    if (pct >= 40) {
      return {
        icon: "📚",
        message: labels.practiceMore,
        className: "average"
      };
    }

    return {
      icon: "💪",
      message: labels.dontGiveUp,
      className: "low"
    };
  }

  function getResultMode(resultData) {
    if (!resultData || !resultData.mode) return labels.mock;
    return resultData.mode === "practice" ? labels.practice : labels.mock;
  }

  function renderBreadcrumbs() {
    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: labels.home, href: "index.html" },
      { label: labels.result }
    ]);
  }

  function renderNoResult() {
    if (!resultArea) return;

    document.title = labels.noResult + " — see2083";

    resultArea.innerHTML =
      '<div class="result-empty-card">' +
        '<div class="empty-state">' +
          '<div class="empty-icon">🎯</div>' +
          '<h2>' + escapeHTML(labels.noResult) + '</h2>' +
          '<p>' + escapeHTML(labels.noResultSub) + '</p>' +
          '<div class="result-action-row center">' +
            '<a href="mock-test.html" class="btn btn-primary">' +
              escapeHTML(labels.takeTest) +
            '</a>' +
            '<a href="quiz.html" class="btn btn-outline">' +
              escapeHTML(labels.practiceMcq) +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function renderResultSummary(resultData) {
    if (!resultArea) return;

    const score = Number(resultData.score || 0);
    const total = Number(resultData.total || 0);
    const pct = Number(resultData.pct || 0);
    const wrong = Math.max(total - score, 0);
    const timeTaken = resultData.timeTaken || "—";
    const timeUp = Boolean(resultData.timeUp);
    const grade = getGradeData(pct);
    const hasReview = Array.isArray(resultData.questions) && resultData.questions.length;

    document.title = labels.yourResult + " — see2083";

    resultArea.innerHTML =
      '<div class="result-hero-card result-' + escapeHTML(grade.className) + '">' +
        '<div class="result-hero-main">' +
          '<div class="result-icon">' + escapeHTML(grade.icon) + '</div>' +
          '<div>' +
            '<div class="result-kicker">' + escapeHTML(getResultMode(resultData)) + '</div>' +
            '<h1>' + escapeHTML(labels.yourResult) + '</h1>' +
            '<p>' + escapeHTML(grade.message) + '</p>' +
          '</div>' +
        '</div>' +

        '<div class="result-score-box">' +
          '<div class="result-score-ring">' +
            '<span class="score-num">' + escapeHTML(pct) + '%</span>' +
            '<span class="score-label">' + escapeHTML(labels.score) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      (timeUp
        ? '<div class="result-alert">' + escapeHTML(labels.timeUp) + '</div>'
        : '') +

      '<div class="result-stats-grid">' +
        '<div class="result-stat">' +
          '<span>' + escapeHTML(labels.correct) + '</span>' +
          '<strong class="success">' + escapeHTML(score) + '</strong>' +
        '</div>' +

        '<div class="result-stat">' +
          '<span>' + escapeHTML(labels.wrong) + '</span>' +
          '<strong class="error">' + escapeHTML(wrong) + '</strong>' +
        '</div>' +

        '<div class="result-stat">' +
          '<span>' + escapeHTML(labels.total) + '</span>' +
          '<strong>' + escapeHTML(total) + '</strong>' +
        '</div>' +

        '<div class="result-stat">' +
          '<span>' + escapeHTML(labels.timeTaken) + '</span>' +
          '<strong>' + escapeHTML(timeTaken) + '</strong>' +
        '</div>' +
      '</div>' +

      '<div class="result-action-row">' +
        (hasReview
          ? '<button class="btn btn-primary" type="button" id="review-btn">' +
              escapeHTML(labels.reviewAnswers) +
            '</button>'
          : '') +
        '<a href="mock-test.html" class="btn btn-outline">' +
          escapeHTML(labels.tryAgain) +
        '</a>' +
        '<a href="index.html" class="btn btn-ghost">' +
          escapeHTML(labels.homeBtn) +
        '</a>' +
      '</div>';

    const reviewBtn = document.getElementById("review-btn");
    if (reviewBtn) {
      reviewBtn.addEventListener("click", function () {
        renderReview(resultData);
      });
    }
  }

  function renderReview(resultData) {
    if (!reviewArea) return;

    const questions = Array.isArray(resultData.questions) ? resultData.questions : [];
    const answers = resultData.answers || {};
    const letters = ["A", "B", "C", "D"];

    reviewArea.style.display = "block";

    if (!questions.length) {
      reviewArea.innerHTML =
        '<div class="result-review-head">' +
          '<h2>' + escapeHTML(labels.answerReview) + '</h2>' +
          '<p>' + escapeHTML(labels.reviewUnavailable) + '</p>' +
        '</div>';
      return;
    }

    reviewArea.innerHTML =
      '<div class="result-review-head">' +
        '<div class="result-kicker">' + escapeHTML(labels.reviewAnswers) + '</div>' +
        '<h2>' + escapeHTML(labels.answerReview) + '</h2>' +
        '<p>' + escapeHTML(questions.length) + ' ' + escapeHTML(labels.question) + '</p>' +
      '</div>' +

      '<div class="result-review-list">' +
        questions.map(function (question, index) {
          const chosenRaw = answers[index];
          const chosen = chosenRaw === undefined ? -1 : Number(chosenRaw);
          const isCorrect = chosen === question.correct;
          const chosenText = chosen >= 0 && question.options && question.options[chosen]
            ? question.options[chosen]
            : labels.notAnswered;
          const correctText = question.options && question.options[question.correct]
            ? question.options[question.correct]
            : "";

          return (
            '<article class="result-review-card">' +
              '<div class="result-review-card-head">' +
                '<span class="badge ' + (isCorrect ? "badge-green" : "badge-red") + '">' +
                  (isCorrect ? "✓ " + labels.correct : "✗ " + labels.wrong) +
                '</span>' +
                '<span>' + escapeHTML(labels.question) + ' ' + escapeHTML(index + 1) + '</span>' +
              '</div>' +

              '<h3>' + escapeHTML(question.question || "") + '</h3>' +

              '<div class="result-answer-summary">' +
                '<div>' +
                  '<span>' + escapeHTML(labels.yourAnswer) + '</span>' +
                  '<strong class="' + (isCorrect ? "success" : "error") + '">' +
                    escapeHTML(chosenText) +
                  '</strong>' +
                '</div>' +
                '<div>' +
                  '<span>' + escapeHTML(labels.correctAnswer) + '</span>' +
                  '<strong class="success">' + escapeHTML(correctText) + '</strong>' +
                '</div>' +
              '</div>' +

              '<div class="result-option-list">' +
                safeArray(question.options).map(function (option, optionIndex) {
                  let optionClass = "";

                  if (optionIndex === question.correct) {
                    optionClass = " correct";
                  } else if (optionIndex === chosen && !isCorrect) {
                    optionClass = " wrong";
                  }

                  return (
                    '<div class="result-option' + optionClass + '">' +
                      '<span>' + escapeHTML(letters[optionIndex] || "") + '</span>' +
                      '<p>' + escapeHTML(option) + '</p>' +
                    '</div>'
                  );
                }).join("") +
              '</div>' +

              '<div class="result-explanation">' +
                '<strong>' + escapeHTML(labels.explanation) + ':</strong> ' +
                escapeHTML(question.explanation || "") +
              '</div>' +
            '</article>'
          );
        }).join("") +
      '</div>';

    reviewArea.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function initPage() {
    renderBreadcrumbs();

    if (!result) {
      renderNoResult();
      return;
    }

    renderResultSummary(result);
  }

  initPage();
})();