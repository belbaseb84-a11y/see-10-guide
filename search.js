/* ===================================================
   see2083 — Search
   =================================================== */

const Search = (() => {
  // Build searchable index from all data
  function buildIndex() {
    const index = [];
    const lang = Lang.current();
    const medium = sessionStorage.getItem("s2083_medium") || "english";

    // Add subjects
    S2083.subjects.forEach(s => {
      index.push({
        id: s.id,
        type: "subject",
        typeLabel: lang === "np" ? "विषय" : "Subject",
        title: s.name,
        titleNp: s.nameNp,
        display: lang === "np" ? (s.nameNp || s.name) : s.name,
        keywords: [s.name, s.nameNp, s.description, s.descriptionNp].join(" ").toLowerCase(),
        url: `chapters.html?subject=${s.id}&medium=${medium}`,
        icon: s.icon
      });
    });

    // Add chapters
    Object.entries(S2083.chapters).forEach(([subjectId, chapters]) => {
      const subject = S2083.getSubject(subjectId);
      if (!subject) return;
      chapters.forEach(ch => {
        index.push({
          id: `${subjectId}-${ch.id}`,
          type: "chapter",
          typeLabel: lang === "np" ? "अध्याय" : "Chapter",
          title: ch.title,
          titleNp: ch.titleNp || ch.title,
          display: lang === "np" ? (ch.titleNp || ch.title) : ch.title,
          subjectTitle: lang === "np" ? (subject.nameNp || subject.name) : subject.name,
          keywords: [ch.title, ch.titleNp, ch.summary, ch.summaryNp, subject.name, subject.nameNp].join(" ").toLowerCase(),
          url: `chapter.html?subject=${subjectId}&chapter=${ch.id}&medium=${medium}`,
          icon: subject.icon
        });
      });
    });

    // Add MCQ questions
    S2083.sampleMCQs.forEach(q => {
      index.push({
        id: q.id,
        type: "mcq",
        typeLabel: lang === "np" ? "MCQ" : "MCQ",
        title: q.question,
        titleNp: q.question,
        display: q.question,
        keywords: [q.question, ...q.options].join(" ").toLowerCase(),
        url: `quiz.html`,
        icon: "✅"
      });
    });

    return index;
  }

  function query(term) {
    if (!term || term.trim().length < 2) return [];
    const q = term.toLowerCase().trim();
    const index = buildIndex();
    return index.filter(item => item.keywords.includes(q) || item.display.toLowerCase().includes(q) || item.title.toLowerCase().includes(q) || (item.titleNp && item.titleNp.includes(q)));
  }

  return { query, buildIndex };
})();
