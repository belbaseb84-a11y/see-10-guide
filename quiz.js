/* ===================================================
   see2083 — MCQ Practice Quiz
   =================================================== */

const Quiz = (() => {
  let questions = [];
  let currentIdx = 0;
  let userAnswers = {};
  let lang = "en";

  function init(qs, language) {
    questions = qs;
    lang = language;
    currentIdx = 0;
    userAnswers = {};
    renderQuestion();
  }

  function renderQuestion() {
    const q = questions[currentIdx];
    if (!q) return;

    const container = document.getElementById("quiz-container");
    if (!container) return;

    const total = questions.length;
    const progress = ((currentIdx) / total) * 100;
    const answered = userAnswers[currentIdx];
    const letters = ["A","B","C","D"];

    container.innerHTML = `
      <div class="quiz-header">
        <span class="quiz-q-num">${lang === "np" ? "प्रश्न" : "Question"} ${currentIdx + 1} ${lang === "np" ? "को" : "of"} ${total}</span>
        <button class="bookmark-btn" id="q-bookmark-btn" onclick="toggleQuestionBookmark('${q.id}')">
          ${Bookmarks.isBookmarked("mcq-" + q.id) ? "🔖 " + (lang === "np" ? "सुरक्षित" : "Saved") : "🔖 " + (lang === "np" ? "सुरक्षित गर्नुहोस्" : "Save Question")}
        </button>
      </div>
      <div class="progress-bar" style="margin-bottom:20px">
        <div class="progress-fill" style="width:${progress}%"></div>
      </div>
      <p class="quiz-question">${q.question}</p>
      <div class="quiz-options">
        ${q.options.map((opt, i) => {
          let cls = "mcq-option";
          let disabled = "";
          if (answered !== undefined) {
            disabled = "disabled";
            if (i === q.correct) cls += " correct";
            else if (i === answered && i !== q.correct) cls += " selected-wrong";
          }
          return `<button class="${cls}" ${disabled} onclick="Quiz.selectAnswer(${i})" aria-label="Option ${letters[i]}">
            <span class="mcq-letter">${letters[i]}</span>
            <span>${opt}</span>
          </button>`;
        }).join("")}
      </div>
      ${answered !== undefined ? renderFeedback(q, answered) : ""}
      <div class="quiz-nav">
        <button class="btn btn-ghost btn-sm" onclick="Quiz.prev()" ${currentIdx === 0 ? "disabled" : ""}>
          ← ${lang === "np" ? "अघिल्लो" : "Previous"}
        </button>
        <span style="font-size:13px;color:var(--text-muted)">${Object.keys(userAnswers).length}/${total} ${lang === "np" ? "उत्तर दिइयो" : "answered"}</span>
        ${currentIdx < total - 1
          ? `<button class="btn btn-primary btn-sm" onclick="Quiz.next()">${lang === "np" ? "अर्को" : "Next"} →</button>`
          : `<button class="btn btn-accent btn-sm" onclick="Quiz.finish()">${lang === "np" ? "समाप्त" : "Finish"} ✓</button>`
        }
      </div>
    `;
  }

  function renderFeedback(q, chosen) {
    const isCorrect = chosen === q.correct;
    return `<div class="mcq-feedback ${isCorrect ? "correct-fb" : "wrong-fb"}">
      <strong>${isCorrect ? "✓ " + (lang === "np" ? "सही!" : "Correct!") : "✗ " + (lang === "np" ? "गलत" : "Wrong")}</strong>
      ${q.explanation}
    </div>`;
  }

  function selectAnswer(idx) {
    if (userAnswers[currentIdx] !== undefined) return;
    userAnswers[currentIdx] = idx;
    renderQuestion();
  }

  function next() {
    if (currentIdx < questions.length - 1) {
      currentIdx++;
      renderQuestion();
    }
  }

  function prev() {
    if (currentIdx > 0) {
      currentIdx--;
      renderQuestion();
    }
  }

  function finish() {
    const correct = Object.entries(userAnswers).filter(([i, a]) => a === questions[i].correct).length;
    const total = questions.length;
    const pct = Math.round((correct / total) * 100);

    // Save result to sessionStorage for result page
    sessionStorage.setItem("s2083_quiz_result", JSON.stringify({
      score: correct,
      total,
      pct,
      timeTaken: "—",
      mode: "practice"
    }));

    document.getElementById("quiz-container").innerHTML = `
      <div style="text-align:center;padding:var(--sp-8)">
        <div class="result-score-ring" style="margin-bottom:var(--sp-6)">
          <span class="score-num">${pct}%</span>
          <span class="score-label">${lang === "np" ? "अङ्क" : "Score"}</span>
        </div>
        <h2 style="margin-bottom:var(--sp-2)">${pct >= 60 ? "🎉 " + (lang === "np" ? "शाबास!" : "Well done!") : "📚 " + (lang === "np" ? "फेरि प्रयास गर्नुहोस्!" : "Keep practicing!")}</h2>
        <p style="margin-bottom:var(--sp-6)">${lang === "np" ? "सही" : "Correct"}: ${correct} / ${total}</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-outline" onclick="location.reload()">${lang === "np" ? "फेरि प्रयास" : "Try Again"}</button>
          <a href="index.html" class="btn btn-primary">${lang === "np" ? "गृहपृष्ठ" : "Home"}</a>
        </div>
      </div>
    `;
  }

  return { init, selectAnswer, next, prev, finish };
})();

function toggleQuestionBookmark(qId) {
  const q = S2083.sampleMCQs.find(x => x.id === qId);
  if (!q) return;
  const added = Bookmarks.toggle({
    id: "mcq-" + qId,
    type: "mcq",
    title: q.question,
    url: "quiz.html"
  });
  showToast(added ? (Lang.current() === "np" ? "प्रश्न सुरक्षित भयो" : "Question saved") : (Lang.current() === "np" ? "हटाइयो" : "Removed"));
}
