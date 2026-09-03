# Todo App

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## What's actually in here

- `src/TaskApp.jsx` — the list itself: add, delete, mark done, task count,
  empty state. Tasks persist to `localStorage` under the key `"tasks"`.
- `src/ThemeToggle.jsx` — light/dark switch, persists under `"theme"`,
  falls back to OS preference if you've never touched it.
- `src/styles.css` — every color in the app comes from the CSS variables
  at the top. Don't hardcode a color anywhere else in this project or
  you'll reintroduce the exact bug this started as.

## Known limitations — not fixed, just disclosed

- **No task editing.** You can add and delete, not rename. If you need
  that, it's a small addition (an `editing` boolean per task + a text
  input swap), but I didn't build it because you didn't ask for it and
  I'm not going to pad this out with features you haven't requested.
- **`crypto.randomUUID()`** requires a secure context (localhost or
  HTTPS). It'll break on plain HTTP in production. If you're deploying
  without HTTPS for some reason, swap it for a counter or a small uuid
  library.
- **No test coverage.** Zero. If this matters to you, say so before you
  build on top of it, not after something breaks in a way a test would
  have caught.
