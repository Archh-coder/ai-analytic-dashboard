"use client";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
    if (saved === "light") setDark(false);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 shadow hover:shadow-md transition flex items-center gap-2"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.396-9.175a.75.75 0 01.908.325.75.75 0 01-.098.976A7.501 7.501 0 0012 19.5a7.5 7.5 0 006.624-11.427.75.75 0 01.976-.098.75.75 0 01.325.908 9.715 9.715 0 01-1.173 6.119z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 6.343l1.061-1.061M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
        </svg>
      )}
      <span className="hidden sm:inline text-xs font-medium text-zinc-600 dark:text-zinc-300">{dark ? "Dark" : "Light"} Mode</span>
    </button>
  );
} 