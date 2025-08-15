// js/hero.js (type="module")
import { auth } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const img = document.getElementById("heroImg");
const cap = document.getElementById("heroCaption");

// Drive thumbnail endpoint (reliable)
const driveThumb = (id, w = 1600) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;

// Public, anonymous landing image (keep in repo for simplicity)
const LANDING_IMAGE = driveThumb("1cro5d-42a0oTunMcvBKcfgVsey_n-cQv", 1600);

function showStaticHero() {
  img.loading = "eager";
  img.decoding = "async";
  img.src = LANDING_IMAGE;
  img.removeAttribute("srcset");
  img.alt = "Pool Party";
  // hide the little caption chip completely
  if (cap) cap.style.display = "none";
}

async function showRandomHero() {
  try {
    const res = await fetch("data/pictures.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = await res.json();
    if (!Array.isArray(list) || list.length === 0) throw new Error("Empty list");

    const pick = list[Math.floor(Math.random() * list.length)];
    img.loading = "eager";
    img.decoding = "async";
    img.src = driveThumb(pick.id, 1600);
    img.srcset = [
      driveThumb(pick.id, 800)  + " 800w",
      driveThumb(pick.id, 1200) + " 1200w",
      driveThumb(pick.id, 1600) + " 1600w",
      driveThumb(pick.id, 2000) + " 2000w"
    ].join(", ");
    img.sizes = "(max-width: 900px) 100vw, 900px";
    img.alt = "Pool party photo";
    // no filename on hero
    if (cap) cap.style.display = "none";

    // graceful fallback
    img.onerror = () => {
      img.onerror = null;
      img.src = `https://drive.google.com/uc?export=view&id=${pick.id}`;
    };
  } catch (e) {
    console.error("Random hero failed, showing landing image:", e);
    showStaticHero();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, user => {
    user ? showRandomHero() : showStaticHero();
  });
});
