// js/nav.js
// Attach a compact nav + auth slot INSIDE the card header on every page
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".card > header");
  if (!header) return;

  // current page
  const p = location.pathname.toLowerCase();
  const isHome     = p.endsWith("/") || p.endsWith("index.html");
  const isMoney    = p.endsWith("money.html");
  const isPictures = p.endsWith("pictures.html");

  // remove any previous actions block
  header.querySelector(".header-actions")?.remove();

  // wrapper on the RIGHT side of header
  const actions = document.createElement("div");
  actions.className = "header-actions";

  // nav group
  const nav = document.createElement("nav");
  nav.className = "header-nav";
  nav.setAttribute("aria-label", "Site navigation");
  nav.innerHTML = `
    <a class="btn ${isHome ? "btn-current" : ""}" href="index.html">Home</a>
    <a class="btn ${isMoney ? "btn-current" : ""}" href="money.html">Money</a>
    <a class="btn ${isPictures ? "btn-current" : ""}" href="pictures.html">Pictures</a>
  `;

  // placeholder for auth control (filled by nav-auth.js)
  const authSlot = document.createElement("div");
  authSlot.className = "auth-slot";

  actions.append(nav, authSlot);
  header.appendChild(actions);
});
