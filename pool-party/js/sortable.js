document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("contacts-table");
  if (!table) return; // only on money page
  const tbody = table.querySelector("tbody");
  const heads = table.querySelectorAll("th.sortable");

  const getVal = (tr, idx, type) => {
    const txt = tr.cells[idx].textContent.trim();
    if (type === "number") {
      const n = parseFloat(txt.replace(/[^0-9.-]/g, "")); return isNaN(n) ? Number.POSITIVE_INFINITY : n;
    }
    if (type === "money") {
      if (/host/i.test(txt)) return Number.POSITIVE_INFINITY;
      const n = parseFloat(txt.replace(/[^0-9.]/g, "")); return isNaN(n) ? Number.POSITIVE_INFINITY : n;
    }
    if (type === "phone") {
      const d = txt.replace(/\D/g, ""); return d.length ? parseInt(d, 10) : Number.POSITIVE_INFINITY;
    }
    return txt.toLowerCase();
  };

  heads.forEach(h => {
    const label = h.textContent.trim();
    h.setAttribute("title", `Click to sort by ${label}`);
    h.setAttribute("role", "button");
    h.setAttribute("aria-sort", "none");
    h.tabIndex = 0;
    h.addEventListener("keydown", e => { if (e.key==="Enter"||e.key===" ") { e.preventDefault(); h.click(); }});
  });

  heads.forEach((th, idx) => {
    th.addEventListener("click", () => {
      const order = th.classList.contains("asc") ? "desc" : "asc";
      heads.forEach(h => { h.classList.remove("asc","desc"); h.setAttribute("aria-sort","none"); });
      th.classList.add(order);
      th.setAttribute("aria-sort", order==="asc" ? "ascending" : "descending");

      const type = th.dataset.type || "text";
      const rows = Array.from(tbody.rows);
      rows.sort((a,b) => {
        const A=getVal(a,idx,type), B=getVal(b,idx,type);
        const cmp = (typeof A==="number" && typeof B==="number") ? A-B : String(A).localeCompare(String(B),"en",{sensitivity:"base"});
        return order==="asc" ? cmp : -cmp;
      });
      const frag=document.createDocumentFragment(); rows.forEach(r=>frag.appendChild(r)); tbody.appendChild(frag);
    });
  });
});
