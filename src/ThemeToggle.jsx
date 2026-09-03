import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setIsDark((prev) => !prev)}
      aria-label="Toggle dark mode"
      type="button"
    >
      <span className="theme-toggle__knob">{isDark ? "☾" : "☀"}</span>
    </button>
  );
}
