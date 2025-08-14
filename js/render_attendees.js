async function renderTable() {
  const tbody = document.querySelector("#contacts-table tbody");
  try {
    const res = await fetch("data/attendees.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for attendees.json`);
    const data = await res.json();

    const phoneDigits = p => String(p||"").replace(/\D/g, "");
    const feeBadge = fee => /^host$/i.test(fee) ? `<span class="badge host">HOST</span>`
                        : (String(fee).trim()==="$-" ? `<span class="badge pending">$-</span>` : `<span class="badge ok">${fee}</span>`);
    const mealBadge = meal => meal ? `<span class="badge meal">${meal}</span>` : "";

    const frag = document.createDocumentFragment();
    data.forEach(r => {
      const tr = document.createElement("tr");
      if (String(r.fee||"").trim()==="$-") tr.classList.add("pending");
      tr.innerHTML = `
        <td class="idx">${r.id ?? ""}</td>
        <td class="name">${r.name ?? ""}</td>
        <td class="fee">${feeBadge(r.fee ?? "")}</td>
        <td class="meal">${mealBadge(r.meal ?? "")}</td>
        <td class="phone"><a href="tel:+${phoneDigits(r.phone)}">${r.phone ?? ""}</a></td>`;
      frag.appendChild(tr);
    });
    tbody.replaceChildren(frag);
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="5" style="color:#fca5a5">Could not load attendees (see console).</td></tr>`;
  }
}
document.addEventListener("DOMContentLoaded", renderTable);
