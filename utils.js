/* ===================================================
   see2083 — Shared Utilities
   Safe helpers used across pages
   =================================================== */

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function hasS2083Data() {
  return typeof S2083 !== "undefined" && S2083;
}

function getSubjectById(subjectId) {
  if (!hasS2083Data()) return null;

  if (typeof S2083.getSubject === "function") {
    return S2083.getSubject(subjectId);
  }

  return safeArray(S2083.subjects).find(function (subject) {
    return subject.id === subjectId;
  }) || null;
}

function getChapterCountForSubject(subjectId) {
  if (
    !hasS2083Data() ||
    !S2083.chapters ||
    !Array.isArray(S2083.chapters[subjectId])
  ) {
    return 0;
  }

  return S2083.chapters[subjectId].length;
}

function getCurrentLanguage() {
  if (typeof Lang !== "undefined" && typeof Lang.current === "function") {
    return Lang.current();
  }

  return "en";
}

function getCurrentMedium() {
  if (typeof getMedium === "function") {
    return getMedium() || "english";
  }

  return "english";
}