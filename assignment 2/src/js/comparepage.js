import { getLaptops } from "./api.js";
import { getFavorites } from "./storage.js";
import { getSelected, toggleSelected, rows, bestValue } from "./compare.js";
import { setupHeader } from "./ui.js";

setupHeader();
const picker = document.getElementById("picker");
const table = document.getElementById("table");
let laptops = [];

function draw() {
  const favs = laptops.filter((l) => getFavorites().includes(l.id));
  const chosen = favs.filter((l) => getSelected().includes(l.id));

  picker.innerHTML = favs.length
    ? favs.map((l) => `<label class="flex gap-2"><input type="checkbox" value="${l.id}" class="text-accent" ${chosen.includes(l) ? "checked" : ""}>${l.name}</label>`).join("")
    : "<p>Save some laptops as favorites first.</p>";

  if (chosen.length < 2) {
    table.innerHTML = "<p>Select at least two laptops to compare.</p>";
    return;
  }
  const head = chosen.map((l) => `<th class="p-2">${l.name}</th>`).join("");
  const body = rows.map(([label, key, type]) => {
    const best = bestValue(chosen, key, type); // the winning number of this row
    const cells = chosen
      .map((l) => `<td class="p-2 text-center ${l[key] === best ? "bg-accent font-bold text-on-accent" : ""}">${l[key]}</td>`)
      .join("");
    return `<tr><th class="p-2 text-left">${label}</th>${cells}</tr>`;
  }).join("");
  table.innerHTML = `<table class="w-full min-w-lg rounded-xl bg-card"><thead><tr><th></th>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

try {
  laptops = await getLaptops();
  draw();
} catch (error) {
  table.innerHTML = "<p class='text-red-500'>⚠ Could not load laptops. Run the site with Live Server.</p>";
}

picker.addEventListener("change", (e) => {
  const ok = toggleSelected(Number(e.target.value));
  document.getElementById("msg").textContent = ok ? "" : "You can compare only 4 laptops.";
  draw(); // unchecks the 5th box automatically
});
