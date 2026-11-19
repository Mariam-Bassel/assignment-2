import { getLaptops } from "./api.js";
import { isFavorite, toggleFavorite } from "./storage.js";
import { getSelected, toggleSelected } from "./compare.js";
import { setupHeader } from "./ui.js";

setupHeader();
const box = document.getElementById("box");
const id = Number(new URLSearchParams(location.search).get("id")); // from ?id=7

function draw(l, message = "") {
  // every field of the laptop becomes one table row (image/description are shown separately)
  const rows = Object.entries(l)
    .filter(([key]) => key !== "image" && key !== "description")
    .map(([key, value]) => `<tr><th class="p-2 text-left capitalize">${key}</th><td class="p-2">${value}</td></tr>`)
    .join("");

  box.innerHTML = `
    <div class="grid gap-6 md:grid-cols-2">
      <img src="${l.image}" alt="${l.name}" class="w-full rounded-xl bg-card p-4">
      <div>
        <h1 class="text-2xl font-bold">${l.name}</h1>
        <p class="my-3">${l.description}</p>
        <div class="flex flex-wrap gap-2">
          <button id="favBtn" class="btn-action">${isFavorite(l.id) ? "★ Remove from favorites" : "☆ Add to favorites"}</button>
          <button id="cmpBtn" class="btn-action">${getSelected().includes(l.id) ? "Remove from comparison" : "Add to comparison"}</button>
        </div>
        <p class="mt-2 text-sm">${message}</p>
      </div>
    </div>
    <table class="mt-6 w-full rounded-xl bg-card">${rows}</table>`;

  document.getElementById("favBtn").onclick = () => {
    toggleFavorite(l.id);
    draw(l);
  };
  document.getElementById("cmpBtn").onclick = () => {
    if (!isFavorite(l.id)) toggleFavorite(l.id); // compare page uses favorites
    draw(l, toggleSelected(l.id) ? "Comparison updated." : "You can compare only 4 laptops.");
  };
}

try {
  const laptop = (await getLaptops()).find((l) => l.id === id);
  if (laptop) draw(laptop);
  else box.innerHTML = "<p>Sorry, we could not find that laptop. <a href='laptops.html' class='underline'>Back to catalogue</a></p>";
} catch (error) {
  box.innerHTML = "<p class='text-red-500'>⚠ Could not load laptops. Run the site with Live Server.</p>";
}
