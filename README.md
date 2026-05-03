# see2083 — SEE Grade 10 Study Platform

see2083 is a clean static study website for Nepal SEE Grade 10 students.

It helps students choose their medium, open subjects, view chapters, and access study sections like notes, MCQ practice, mock tests, past questions, bookmarks, and search.

No backend. No database. No login. No build step.

---

## Project Goal

The goal of see2083 is to make SEE study simple, organized, and chapter-focused.

Students can follow this flow:

```text
Choose Medium → Choose Subject → Choose Chapter → Study / Practice
```

---

## Main Features

- English Medium, Nepali Medium, and Electrical Engineering streams
- Subject and chapter navigation
- Chapter-wise study options
- Notes page structure
- MCQ practice
- Mock test with result page
- Bookmark system using localStorage
- Search for subjects and chapters
- Dark / light mode
- English / Nepali UI switch
- Responsive layout for laptop, tablet, and phone
- Static HTML, CSS, and JavaScript only

---

## How to Run

1. Open the `see2083` folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Click **Open with Live Server**.

The website will open in your browser.

Example:

```text
http://127.0.0.1:5500/index.html
```

No npm or build command is needed.

---

## File Structure

```text
see2083/
├── index.html
├── medium.html
├── subjects.html
├── chapters.html
├── chapter.html
├── notes.html
├── quiz.html
├── mock-test.html
├── result.html
├── bookmarks.html
├── search.html
├── about.html
├── design-system.html
├── README.md
│
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── pages.css
│   ├── theme.css
│   └── premium.css
│
├── js/
│   ├── data.js
│   ├── main.js
│   ├── theme.js
│   ├── language.js
│   ├── bookmarks.js
│   ├── search.js
│   ├── quiz.js
│   └── mock-test.js
│
└── assets/
    ├── icons/
    ├── images/
    └── illustrations/
```

---

## Important Files

### `js/data.js`

This is the base content file.

It contains:

- Mediums
- Subjects
- Chapters
- Sample MCQs
- Study option data

Official Grade 10 corrections are applied after this file by `js/data-official-patch.js`.
Keep confirmed CDC/report corrections in the patch file so the base demo data remains easy to compare.

### `js/data-official-patch.js`

This file loads after `js/data.js` and before `js/theme.js`.

It applies the current SEE Grade 10 2083 data corrections:

- Electrical Engineering shows 4 technical subjects only on the Electrical page.
- Computer uses the latest 5-unit CDC curriculum structure.
- Mathematics is medium-specific because the Nepali official PDF has 15 chapters including Trigonometry, while the English translation/e-library extracted TOC has 14 chapters.
- Science is marked `needs manual PDF check` because the uploaded report verified official CDC links but noted uncertain large-PDF TOC parsing.
- Some subjects include `verifiedStatus` and `sourceNote` fields where CDC source mismatches or PDF parsing uncertainty remain.

### `css/premium.css`

This file contains the latest visual design improvements.

It improves:

- Colors
- Spacing
- Cards
- Buttons
- Navbar
- Dark mode polish
- Homepage styling

### `js/main.js`

This file handles shared UI parts like:

- Navbar
- Footer
- Bottom navigation
- Breadcrumbs
- Page initialization

---

## How to Add a Subject

Open:

```text
js/data.js
```

Add a subject like this:

```js
S2083.subjects.push({
  id: "my-subject",
  name: "My Subject",
  nameNp: "मेरो विषय",
  icon: "📗",
  category: "optional",
  mediumGroup: "common",
  units: 8,
  description: "Short subject description.",
  descriptionNp: "नेपालीमा छोटो विवरण।"
});
```

---

## How to Add Chapters

Add chapters like this:

```js
S2083.chapters["my-subject"] = [
  {
    id: "chapter-1",
    number: 1,
    title: "Chapter Title",
    titleNp: "अध्याय शीर्षक",
    summary: "Short chapter summary.",
    summaryNp: "छोटो अध्याय सारांश।"
  }
];
```

---

## How to Add MCQ Questions

Add MCQs like this:

```js
S2083.sampleMCQs.push({
  id: "q10",
  subject: "science",
  chapter: "scientific-study",
  question: "What is a hypothesis?",
  options: [
    "A proven fact",
    "A testable prediction",
    "A final conclusion",
    "A random guess"
  ],
  correct: 1,
  explanation: "A hypothesis is a testable prediction made before an experiment."
});
```

`correct` uses zero-based numbering:

```text
0 = first option
1 = second option
2 = third option
3 = fourth option
```

---

## Current Status

| Feature | Status |
|---|---|
| Static website | Done |
| Medium selection | Done |
| Subject pages | Done |
| Chapter pages | Done |
| Notes structure | Done |
| MCQ practice | Demo ready |
| Mock test | Demo ready |
| Search | Done |
| Bookmarks | Done |
| Dark / light mode | Done |
| English / Nepali UI switch | Done |
| Real full notes | Not added yet |
| Full MCQ bank | Not added yet |
| Login / progress sync | Not included |
| Backend / database | Not included |

---

## Not Included in This Version

These are intentionally not included in the current version:

- Login system
- Backend
- Database
- Admin panel
- Payment system
- AI features
- Leaderboard
- Streak system
- Cloud progress sync

This version is focused on being fast, simple, and easy to maintain.

---

## Future Improvements

Possible future upgrades:

- Add full real notes
- Add complete MCQ banks
- Add past questions by chapter
- Add important questions
- Add short questions
- Add offline support
- Add local progress tracking
- Improve content management
- Add PWA support

---

## Design Direction

see2083 should feel:

- Clean
- Simple
- Professional
- Fast
- Student-friendly
- Easy to use on laptop, tablet, and phone

Avoid:

- Too much text
- Too many colors
- Confusing layouts
- Heavy animations
- Overcomplicated features

---

## Developer Notes

- Built using only HTML, CSS, and vanilla JavaScript.
- No React, Tailwind, Bootstrap, backend, or database.
- Data is stored in JavaScript objects.
- Bookmarks, theme, and language preference use localStorage.
- Pages use URL parameters like:

```text
subjects.html?medium=english
chapters.html?subject=science&medium=english
chapter.html?subject=science&chapter=scientific-study&medium=english
```

---

## Content Note

Some content is demo/sample content only.

Real notes, full MCQ banks, past questions, and complete study materials should be added gradually after the website structure and design are finalized.

Current official-data notes:

- Electrical Engineering has 4 verified Grade 10 technical subjects: Basic Electronics, Electrical Machine, Industrial Installation and Maintenance, and Utilization of Electrical Energy.
- Optional subjects differ by school, so optional subjects are shown as optional rather than required.
- Optional Mathematics uses a manual-verification placeholder instead of a guessed guide-site chapter list.
- Science has a 23-unit map but remains marked `needs manual PDF check` until the official PDF TOC is manually verified.
- Account and Economics chapter headings are patched from the supplied official-source report.

---

## Project Name

```text
see2083
```

Built for SEE Grade 10 students in Nepal.
