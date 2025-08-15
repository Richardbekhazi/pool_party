// js/ticker.js — seamless, never-stopping marquee with randomization

document.addEventListener("DOMContentLoaded", async () => {
  const footer = document.querySelector(".card > footer");
  if (!footer) return;

  // Build ticker shell
  const wrap = document.createElement("div");
  wrap.className = "ticker";
  wrap.setAttribute("aria-label", "Party news");
  wrap.innerHTML = `
    <div class="ticker-viewport">
      <div class="ticker-track" id="tickerTrack">
        <div class="pass" id="passA"></div>
        <div class="pass" id="passB"></div>
      </div>
    </div>
  `;
  footer.innerHTML = "";
  footer.appendChild(wrap);

  // Load lines
  let lines = [];
  try {
    const res = await fetch("data/ticker.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    lines = await res.json();
  } catch {
    lines = [
      "Welcome to Pool Party!",
      "Click any photo to view it full size.",
      "Tap a column header to sort the Money list."
    ];
  }
  if (lines.length === 1) lines = [...lines, lines[0]];

  // Helpers
  const shuffle = src => {
    const a = src.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const buildPassHTML = order => order
    .map(txt => `<span class="ticker-item">${txt}</span><span class="ticker-sep">•</span>`)
    .join("");

  const track = wrap.querySelector("#tickerTrack");
  const passA = wrap.querySelector("#passA");
  const passB = wrap.querySelector("#passB");

  // Initial content (random order)
  let currentOrder = shuffle(lines);
  passA.innerHTML = buildPassHTML(currentOrder);
  passB.innerHTML = buildPassHTML(currentOrder);

  // Animation state
  const SPEED_PX_PER_SEC = 70; // ↑ faster scrolling (tweak as you like)
  let passWidth = 0;
  let x = 0;
  let last = performance.now();
  let toggle = false; // which pass just wrapped

  const measure = () => {
    // Measure width of a single pass
    passWidth = passA.getBoundingClientRect().width;
    if (!passWidth) passWidth = 800; // sane default
  };

  // Measure after layout
  requestAnimationFrame(() => {
    measure();
    // Start at a random offset so it feels fresh each load
    x = -Math.random() * passWidth;
    track.style.transform = `translate3d(${x}px,0,0)`;
  });

  // Keep widths fresh on resize
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const ratio = x / passWidth;     // keep relative position
      measure();
      x = ratio * passWidth;
    }, 120);
  });

  // RAF marquee
  function tick(now) {
    const dt = (now - last) / 1000;
    last = now;
    x -= SPEED_PX_PER_SEC * dt;

    // When a full pass has scrolled, wrap without visual jump
    if (x <= -passWidth) {
      x += passWidth;            // seamless wrap
      toggle = !toggle;          // the pass that went offscreen is now on the right

      // Reshuffle the offscreen pass so the sequence changes over time
      const next = shuffle(lines);
      if (toggle) {
        passA.innerHTML = buildPassHTML(next);
      } else {
        passB.innerHTML = buildPassHTML(next);
      }
      currentOrder = next;
      // Re-measure (width might change slightly)
      measure();
    }

    track.style.transform = `translate3d(${x}px,0,0)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // IMPORTANT: No hover pause—ticker never stops.
});
