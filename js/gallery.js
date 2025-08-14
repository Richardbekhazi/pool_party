const driveImage = id => `https://drive.google.com/uc?export=view&id=${id}`;
const driveThumb = id => `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
let _pictures = [];

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("gallery");
  if (!grid) return; // only on pictures page

  try {
    const res = await fetch("data/pictures.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for data/pictures.json`);
    _pictures = await res.json();

    const frag = document.createDocumentFragment();
    _pictures.forEach((item, i) => {
      const card = document.createElement("article");
      card.className = "card-item"; card.tabIndex = 0; card.dataset.index = i;

      const img = document.createElement("img");
      img.className = "card-thumb"; img.loading = "lazy";
      img.src = driveThumb(item.id); img.alt = item.title || `Photo ${i+1}`;
      card.appendChild(img);

      const meta = document.createElement("div");
      meta.className = "card-meta";
      meta.innerHTML = `<span>${item.title || ""}</span><span class="badge view">View</span>`;
      card.appendChild(meta);

      frag.appendChild(card);
    });
    grid.replaceChildren(frag);
  } catch (e) {
    console.error("Failed to load pictures:", e);
    grid.innerHTML = `<p style="color:#fca5a5;padding:12px 18px">Could not load pictures (see console).</p>`;
  }

  grid.addEventListener("click", onOpen);
  grid.addEventListener("keydown", e => { if (e.key==="Enter"||e.key===" ") { e.preventDefault(); onOpen(e);} });

  function onOpen(e){
    const card = e.target.closest(".card-item"); if (!card) return;
    const item = _pictures[Number(card.dataset.index)];
    if (item) openLightbox(item);
  }
});

const driveFullThumb = (id, w = 2000) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;

function openLightbox(item){
  const dlg = document.getElementById("lightbox");
  const body = document.getElementById("lightboxBody");

  // Fallback: if <dialog> isn’t supported, open a new tab
  if (!dlg || typeof dlg.showModal !== "function") {
    window.open(driveFullThumb(item.id, 2000), "_blank", "noopener");
    return;
  }

  body.innerHTML = "";

  const img = new Image();
  img.className = "lightbox-img";
  img.alt = item.title || "Photo";
  img.loading = "eager";
  img.decoding = "async";

  // Use big thumbnail + responsive srcset
  img.src = driveFullThumb(item.id, 1600);
  img.srcset = [
    driveFullThumb(item.id, 800)  + " 800w",
    driveFullThumb(item.id, 1200) + " 1200w",
    driveFullThumb(item.id, 1600) + " 1600w",
    driveFullThumb(item.id, 2000) + " 2000w"
  ].join(", ");
  img.sizes = "90vw";

  // If thumbnail ever fails, try the view endpoint once
  img.onerror = () => {
    img.onerror = null;
    img.src = `https://drive.google.com/uc?export=view&id=${item.id}`;
  };

  body.appendChild(img);
  dlg.showModal();

  // close handlers
  const closeBtn = document.getElementById("closeLightbox");
  function close(){ dlg.close(); body.innerHTML = ""; dlg.removeEventListener("keydown", onEsc); closeBtn.onclick = null; }
  function onEsc(e){ if(e.key === "Escape") close(); }
  closeBtn.onclick = close;
  dlg.addEventListener("keydown", onEsc);
}
