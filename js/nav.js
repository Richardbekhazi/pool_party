// Attach a compact nav to the right side of the card header on every page
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".card > header");
  if (!header) return;

  // detect current page
  const path = location.pathname.toLowerCase();
  const isHome     = path.endsWith("/") || path.endsWith("index.html");
  const isMoney    = path.endsWith("money.html");
  const isPictures = path.endsWith("pictures.html");

  // remove any old nav
  const old = header.querySelector(".header-nav");
  if (old) old.remove();

  // build nav
  const nav = document.createElement("nav");
  nav.className = "header-nav";
  nav.setAttribute("aria-label", "Site navigation");
  nav.innerHTML = `
    <a class="btn ${isHome ? "btn-current" : ""}" href="index.html">Home</a>
    <a class="btn ${isMoney ? "btn-current" : ""}" href="money.html">Money</a>
    <a class="btn ${isPictures ? "btn-current" : ""}" href="pictures.html">Pictures</a>
  `;

  header.appendChild(nav);
});
