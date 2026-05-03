/* ===================================================
   see2083 — Mock Test
   =================================================== */

const MockTest = (() => {
  let questions = [];
  let userAnswers = {};
  let currentIdx = 0;
  let timeLimit = 0; // seconds
  let timeLeft = 0;
  let timerInterval = null;
  let startTime = null;
  let lang = "en";

  function init(qs, timeLimitSeconds, language) {
    questions = qs;
    timeLimit = timeLimitSeconds;
    timeLeft = timeLimitSeconds;
    userAnswers = {};
    currentIdx = 0;
    lang = language;
    startTime = Date.now();
    startTimer();
    renderQuestion();
    renderNavPanel();
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitTest(true);
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const el = document.getElementById("mock-timer");
    if (!el) return;
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    el.textContent = `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
    el.parentElement.classList.toggle("warning", timeLeft < 60);
  }

  function renderQuestion() {
    const q = questions[currentIdx];
    if (!q) return;
    const container = document.getElementById("mock-question-area");
    if (!container) return;
    const letters = ["A","B","C","D"];
    const chosen = userAnswers[currentIdx];

    container.innerHTML = `
      <div class="quiz-header" style="margin-bottom:var(--sp-4)">
        <span class="quiz-q-num">${lang === "np" ? "प्रश्न" : "Q"} ${currentIdx + 1} / ${questions.length}</span>
      </div>
      <p class="quiz-question">${q.question}</p>
      <div class="quiz-options">
        ${q.options.map((opt, i) => {
          let cls = "mcq-option" + (chosen === i ? " bookmarked" : "");
          return `<button class="${cls}" onclick="MockTest.select(${i})" aria-label="Option ${letters[i]}">
            <span class="mcq-letter">${letters[i]}</span>
            <span>${opt}</span>
          </button>`;
        }).join("")}
      </div>
      <div class="quiz-nav" style="margin-top:var(--sp-5)">
        <button class="btn btn-ghost btn-sm" onclick="MockTest.go(${currentIdx - 1})" ${currentIdx === 0 ? "disabled" : ""}>← ${lang === "np" ? "अघिल्लो" : "Prev"}</button>
        ${currentIdx < questions.length - 1
          ? `<button class="btn btn-primary btn-sm" onclick="MockTest.go(${currentIdx + 1})">${lang === "np" ? "अर्को" : "Next"} →</button>`
          : `<button class="btn btn-accent btn-sm" onclick="MockTest.submitTest(false)">${lang === "np" ? "बुझाउनुहोस्" : "Submit"}</button>`
        }
      </div>
    `;
    renderNavPanel();
  }

  function renderNavPanel() {
    const panel = document.getElementById("mock-nav-panel");
    if (!panel) return;
    panel.innerHTML = `
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:var(--sp-3)">${lang === "np" ? "प्रश्न नेभिगेसन" : "Question Navigator"}</p>
      <div class="q-nav-grid" style="margin-bottom:var(--sp-4)">
        ${questions.map((_, i) => `
          <button class="q-nav-btn ${userAnswers[i] !== undefined ? "answered" : ""} ${i === currentIdx ? "current" : ""}"
            onclick="MockTest.go(${i})">${i + 1}</button>
        `).join("")}
      </div>
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:var(--sp-4)">
        <span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:var(--color-primary);margin-right:4px"></span>${lang === "np" ? "उत्तर दिइयो" : "Answered"}: ${Object.keys(userAnswers).length}<br>
        <span style="display:inline-block;width:12px;height:12px;border-radius:2px;background:var(--bg-muted);margin-right:4px;margin-top:4px"></span>${lang === "np" ? "उत्तर दिइएन" : "Not answered"}: ${questions.length - Object.keys(userAnswers).length}
      </div>
      <button class="btn btn-accent btn-full btn-sm" onclick="MockTest.submitTest(false)">${lang === "np" ? "टेस्ट बुझाउनुहोस्" : "Submit Test"}</button>
    `;
  }

  function select(idx) {
    userAnswers[currentIdx] = idx;
    renderQuestion();
  }

  function go(idx) {
    if (idx < 0 || idx >= questions.length) return;
    currentIdx = idx;
    renderQuestion();
  }

  function submitTest(timeUp = false) {
    clearInterval(timerInterval);
    const correct = Object.entries(userAnswers).filter(([i, a]) => Number(a) === questions[Number(i)].correct).length;
    const total = questions.length;
    const pct = Math.round((correct / total) * 100);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    sessionStorage.setItem("s2083_mock_result", JSON.stringify({
      score: correct,
      total,
      pct,
      timeTaken: `${mins}m ${secs}s`,
      timeUp,
      answers: userAnswers,
      questions: questions.map(q => ({ question: q.question, correct: q.correct, explanation: q.explanation, options: q.options })),
      mode: "mock"
    }));

    window.location.href = "result.html";
  }

  return { init, select, go, submitTest };
})();
