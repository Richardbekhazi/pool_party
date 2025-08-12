async function renderTable() {
  const table = document.getElementById("contacts-table");
  const tbody = table.querySelector("tbody");
  const res = await fetch("data/attendees.json");
  const data = await res.json();

  const phoneDigits = p => p.replace(/\D/g, "");
  const feeBadge = fee => {
    if (/^host$/i.test(fee)) return `<span class="badge host">HOST</span>`;
    if (fee.trim() === "$-") return `<span class="badge pending">$-</span>`;
    return `<span class="badge ok">${fee}</span>`;
  };
  const mealBadge = meal => meal ? `<span class="badge meal">${meal}</span>` : "";

  const frag = document.createDocumentFragment();
  data.forEach(r => {
    const tr = document.createElement("tr");
    if (r.fee.trim() === "$-") tr.classList.add("pending");

    tr.innerHTML = `
      <td class="idx">${r.id}</td>
      <td class="name">${r.name}</td>
      <td class="fee">${feeBadge(r.fee)}</td>
      <td class="meal">${mealBadge(r.meal)}</td>
      <td class="phone"><a href="tel:+${phoneDigits(r.phone)}">${r.phone}</a></td>
    `;
    frag.appendChild(tr);
  });
  tbody.appendChild(frag);
}
document.addEventListener("DOMContentLoaded", renderTable);
