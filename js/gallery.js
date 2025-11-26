// js/gallery.js

// Reliable Google Drive endpoints
const driveImage = id => `https://drive.google.com/uc?export=view&id=${id}`; // fallback
const driveThumb = (id, w = 400) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
const driveFullThumb = (id, w = 2000) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;

let _pictures = [];

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("gallery");
  if (!grid) return; // only on pictures page

  try {
    const res = await fetch("data/pictures.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for data/pictures.json`);
    _pictures = await res.json();

    // NOTE: Sorting by resolution/quality is not possible because
    // pictures.json lacks 'width' and 'height' properties.
    // The gallery will display images in the order they appear in the JSON file.

    const frag = document.createDocumentFragment();
    _pictures.forEach((item, i) => {
      const card = document.createElement("article");
      card.className = "card-item";
      card.tabIndex = 0;
      card.dataset.index = i;

      const img = document.createElement("img");
      img.className = "card-thumb";
      img.loading = "lazy";
      img.src = driveThumb(item.id, 400);
      img.alt = "Party photo";
      card.appendChild(img);

      // Overlay meta (no filename shown)
      const meta = document.createElement("div");
      meta.className = "card-meta";
      meta.innerHTML = `<span class="badge view" aria-label="Open full image">View</span>`;
      card.appendChild(meta);

      frag.appendChild(card);
    });

    grid.replaceChildren(frag);
  } catch (e) {
    console.error("Failed to load pictures:", e);
    grid.innerHTML =
      `<p style="color:#fca5a5;padding:12px 18px">Could not load pictures (see console).</p>`;
  }

  // Delegated handlers
  grid.addEventListener("click", onOpen);
  grid.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(e);
    }
  });

  function onOpen(e) {
    const card = e.target.closest(".card-item");
    if (!card) return;
    const item = _pictures[Number(card.dataset.index)];
    if (item) openLightbox(item);
  }
});

function openLightbox(item) {
  const dlg = document.getElementById("lightbox");
  const body = document.getElementById("lightboxBody");

  // Fallback: if <dialog> isn’t supported, open image in a new tab
  if (!dlg || typeof dlg.showModal !== "function") {
    window.open(driveFullThumb(item.id, 2000), "_blank", "noopener");
    return;
  }

  body.innerHTML = "";

  const img = new Image();
  img.className = "lightbox-img";
  img.alt = "Party photo";
  img.loading = "eager";
  img.decoding = "async";

  // Large thumbnail + responsive srcset (reliable)
  img.src = driveFullThumb(item.id, 1600);
  img.srcset = [
    driveFullThumb(item.id, 800)  + " 800w",
    driveFullThumb(item.id, 1200) + " 1200w",
    driveFullThumb(item.id, 1600) + " 1600w",
    driveFullThumb(item.id, 2000) + " 2000w"
  ].join(", ");
  img.sizes = "90vw";

  // If thumbnail fails (rare), try the view endpoint once
  img.onerror = () => {
    img.onerror = null;
    img.src = driveImage(item.id);
  };

  body.appendChild(img);
  dlg.showModal();

  // Close handlers
  const closeBtn = document.getElementById("closeLightbox");
  function close() {
    dlg.close();
    body.innerHTML = "";
    dlg.removeEventListener("keydown", onEsc);
    closeBtn.onclick = null;
  }
  function onEsc(e) {
    if (e.key === "Escape") close();
  }
  closeBtn.onclick = close;
  dlg.addEventListener("keydown", onEsc);
}