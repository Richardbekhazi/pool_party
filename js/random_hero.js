// Use the Drive thumbnail service for reliability and speed
const driveThumb = (id, w = 1920) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;

document.addEventListener("DOMContentLoaded", async () => {
  const img = document.getElementById("heroImg");
  const cap = document.getElementById("heroCaption");

  try {
    const res = await fetch("data/pictures.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = await res.json();
    if (!Array.isArray(list) || list.length === 0) throw new Error("Empty pictures.json");

    const pick = list[Math.floor(Math.random() * list.length)];

    // High-quality thumbnail + responsive srcset
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
    img.alt = pick.title || "Pool party photo";
    cap.textContent = pick.title || "Pool party";

    // Fallback: if thumbnail still fails, try the view endpoint once
    img.onerror = () => {
      img.onerror = null;
      img.src = `https://drive.google.com/uc?export=view&id=${pick.id}`;
    };
  } catch (e) {
    console.error("Hero load failed:", e);
    cap.textContent = "Welcome! (no hero image yet)";
  }
});
