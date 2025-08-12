document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("contacts-table");
  const tbody = table.querySelector("tbody");
  const heads = table.querySelectorAll("th.sortable");

  const getVal = (tr, idx, type) => {
    const txt = tr.cells[idx].textContent.trim();
    if (type === "number") {
      const n = parseFloat(txt.replace(/[^0-9.-]/g, ""));
      return isNaN(n) ? Number.POSITIVE_INFINITY : n;
    }
    if (type === "money") {
      if (/host/i.test(txt)) return Number.POSITIVE_INFINITY;
      const n = parseFloat(txt.replace(/[^0-9.]/g, ""));
      return isNaN(n) ? Number.POSITIVE_INFINITY : n;
    }
    if (type === "phone") {
      const d = txt.replace(/\D/g, "");
      return d.length ? parseInt(d, 10) : Number.POSITIVE_INFINITY;
    }
    return txt.toLowerCase();
  };

  heads.forEach((th, idx) => {
    th.addEventListener("click", () => {
      const order = th.classList.contains("asc") ? "desc" : "asc";
      heads.forEach(h => h.classList.remove("asc", "desc"));
      th.classList.add(order);

      const type = th.dataset.type || "text";
      const rows = Array.from(tbody.rows);

      rows.sort((a, b) => {
        const A = getVal(a, idx, type);
        const B = getVal(b, idx, type);
        const cmp = (typeof A === "number" && typeof B === "number")
          ? A - B
          : String(A).localeCompare(String(B), "en", {sensitivity: "base"});
        return order === "asc" ? cmp : -cmp;
      });

      const frag = document.createDocumentFragment();
      rows.forEach(r => frag.appendChild(r));
      tbody.appendChild(frag);
    });
  });
});
