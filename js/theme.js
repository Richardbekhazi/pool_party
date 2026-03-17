// js/theme.js — Light / Dark theme toggle with localStorage persistence
(function () {
  const STORAGE_KEY = "pp-theme";
  const root = document.documentElement;

  // Apply saved preference (or default to dark)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light") root.setAttribute("data-theme", "light");

  document.addEventListener("DOMContentLoaded", () => {
    // Inject toggle button into every header-actions slot
    const slot = document.querySelector(".header-actions");
    if (!slot) return;

    const btn = document.createElement("button");
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Toggle light/dark theme");
    btn.innerHTML = `
      <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"/></svg>
      <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

    btn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        localStorage.setItem(STORAGE_KEY, "dark");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem(STORAGE_KEY, "light");
      }
    });

    slot.prepend(btn);
  });
})();
