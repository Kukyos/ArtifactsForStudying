# Artifacts for Studying

Static study site. No build step: Vercel serves the files as they are.

| Path | What |
|---|---|
| `/` | Subject picker |
| `/toc/` | TOC Tutor (Theory of Computation, 23CS2046) |
| `/dbms/` | DBMS Tutor (Database Management Systems, 23CS2013) |
| `/webtech/` | Web Tech Tutor (Web Technology, 23CS2048). Past papers answered under each question screenshot; answers are written in `webtech/answers/*.txt` and built into `answers.js` with `python webtech/answers/build.py` |
| `/pandas/` | Pandas drill (DSE lab) |
| `/sql/` | SQL*Plus drill (DBMS lab) |
| `shared/study.js` | Theme toggle + subject selector used by every page |

Progress is stored per browser in `localStorage`, so every visitor has their own.

To add a subject: create `<id>/index.html`, include `<script src="../shared/study.js"></script>` in its `<head>`, set `data-subject="<id>"` on `<html>`, style dark mode with `:root[data-theme="dark"]`, and add it to `SUBJECTS` in `shared/study.js` (and a description in `index.html`).

Vercel settings: Framework preset "Other", no build command, output directory = repo root.
