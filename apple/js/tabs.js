document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".tab-panel");

  function activate(hash){
    const target = document.querySelector(hash) || document.querySelector("#attendees");
    tabs.forEach(t => {
      const ok = t.dataset.target === hash;
      t.classList.toggle("active", ok);
      t.setAttribute("aria-selected", ok ? "true" : "false");
    });
    panels.forEach(p => {
      const ok = "#" + p.id === hash;
      p.classList.toggle("active", ok);
      if(ok){ p.removeAttribute("hidden"); } else { p.setAttribute("hidden", ""); }
    });
    if(history.replaceState){ history.replaceState(null, "", hash); }
  }

  tabs.forEach(t => t.addEventListener("click", () => activate(t.dataset.target)));

  const startHash = location.hash && document.querySelector(location.hash) ? location.hash : "#attendees";
  activate(startHash);
});
