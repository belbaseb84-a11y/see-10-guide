/* ===================================================
   see2083 — Bookmarks (localStorage)
   =================================================== */

const Bookmarks = (() => {
  const KEY = "s2083_bookmarks";

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function save(bookmarks) {
    localStorage.setItem(KEY, JSON.stringify(bookmarks));
  }

  function isBookmarked(id) {
    return getAll().some(b => b.id === id);
  }

  function add(item) {
    // item: { id, type, title, titleNp, subject, subjectNp, chapter, chapterNp, url }
    const all = getAll();
    if (!all.some(b => b.id === item.id)) {
      all.unshift({ ...item, savedAt: Date.now() });
      save(all);
    }
  }

  function remove(id) {
    save(getAll().filter(b => b.id !== id));
  }

  function toggle(item) {
    if (isBookmarked(item.id)) {
      remove(item.id);
      return false;
    } else {
      add(item);
      return true;
    }
  }

  return { getAll, isBookmarked, add, remove, toggle };
})();

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2500);
}
