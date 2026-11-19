import { getLaptops } from "./api.js";
import { getFavorites, clearFavorites } from "./storage.js";
import { setupHeader, cardHTML, skeleton, onFavClick } from "./ui.js";

setupHeader();
const list = document.getElementById("list");
let laptops = [];

function draw() {
  const favs = laptops.filter((l) => getFavorites().includes(l.id));
  const total = favs.reduce((sum, l) => sum + l.price, 0); // reduce adds all prices
  const average = favs.length ? Math.round(total / favs.length) : 0;
  document.getElementById("totals").textContent = `Total: $${total} · Average: $${average}`;
  list.innerHTML = favs.length ? favs.map(cardHTML).join("") : "<p>No favorites yet. Save some from the catalogue.</p>";
}

list.innerHTML = skeleton(3);
try {
  laptops = await getLaptops();
  draw();
} catch (error) {
  list.innerHTML = "<p class='text-red-500'>⚠ Could not load laptops. Run the site with Live Server.</p>";
}

document.getElementById("clearBtn").onclick = () => {
  clearFavorites();
  draw();
};
onFavClick(list, draw);
