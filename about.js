/* ===================================================
   see2083 — About Page Logic
   Initializes shared layout and breadcrumb
   =================================================== */

(function () {
  if (typeof pageInit === "function") {
    pageInit("about");
  }

  const lang = getCurrentLanguage();
  const isNp = lang === "np";

  const labels = {
    home: isNp ? "गृहपृष्ठ" : "Home",
    about: isNp ? "बारेमा" : "About",
    kicker: isNp ? "see2083 बारेमा" : "About see2083",
    title: isNp
      ? "SEE विद्यार्थीका लागि सरल अध्ययन प्लेटफर्म।"
      : "A simple study platform for SEE students.",
    subtitle: isNp
      ? "see2083 ले Grade 10 विद्यार्थीलाई chapter-wise study, notes structure, MCQ practice, mock tests, bookmarks र search प्रयोग गरेर सजिलो रूपमा पढ्न सहयोग गर्छ।"
      : "see2083 helps Grade 10 students study chapter by chapter with clean navigation, notes structure, MCQ practice, mock tests, bookmarks, and search.",
    start: isNp ? "पढ्न सुरु गर्नुहोस्" : "Start learning",
    subjects: isNp ? "विषयहरू हेर्नुहोस्" : "Browse subjects",
    purpose: isNp ? "उद्देश्य" : "Purpose",
    purposeTitle: isNp ? "यो प्लेटफर्म किन बनाइएको हो" : "Why this platform exists",
    purposeSub: isNp
      ? "SEE अध्ययनलाई व्यवस्थित, सरल र कम confusing बनाउन।"
      : "The goal is to make SEE study organized, simple, and less confusing.",
    final: isNp ? "पढ्न सुरु गर्नुहोस् →" : "Start studying →"
  };

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  document.title = labels.about + " — see2083";

  renderBreadcrumb(document.getElementById("breadcrumb"), [
    { label: labels.home, href: "index.html" },
    { label: labels.about }
  ]);

  setText("about-kicker", labels.kicker);
  setText("about-title", labels.title);
  setText("about-subtitle", labels.subtitle);
  setText("start-btn", labels.start);
  setText("subjects-btn", labels.subjects);
  setText("purpose-kicker", labels.purpose);
  setText("purpose-title", labels.purposeTitle);
  setText("purpose-subtitle", labels.purposeSub);
  setText("final-btn", labels.final);
})();