import { getLaptops } from "./api.js";
import { setupHeader, cardHTML, skeleton, onFavClick } from "./ui.js";

setupHeader();
const $ = (id) => document.getElementById(id);
let laptops = [];

function draw() {
  const q = $("search").value.toLowerCase();
  const [key, dir] = $("sort").value.split("-"); // e.g. "price-asc"

  // filter() returns a NEW array, so sort() below never changes the original
  const shown = laptops
    .filter((l) => (l.name + " " + l.brand).toLowerCase().includes(q))
    .filter((l) => !$("category").value || l.category === $("category").value)
    .filter((l) => !$("maxPrice").value || l.price <= Number($("maxPrice").value))
    .filter((l) => l.ramGB >= Number($("minRam").value))
    .sort((a, b) => (dir === "asc" ? a[key] - b[key] : b[key] - a[key]));

  $("count").textContent = shown.length + " laptops found";
  $("list").innerHTML = shown.length
    ? shown.map(cardHTML).join("")
    : "<p>No laptop matches your search.</p>";
}

$("list").innerHTML = skeleton(6);
try {
  laptops = await getLaptops();
  draw();
} catch (error) {
  $("list").innerHTML = "<p class='text-red-500'>⚠ Could not load laptops. Run the site with Live Server.</p>";
}

$("controls").addEventListener("input", draw); // runs on every keystroke / change
onFavClick($("list"), draw);
