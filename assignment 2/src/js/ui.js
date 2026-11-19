// Shared pieces used by many pages: header, theme, cards, skeletons
import { getTheme, setTheme, isFavorite, toggleFavorite } from "./storage.js";

export function setupHeader() {
  // Restore the saved theme as soon as the page loads
  document.documentElement.dataset.theme = getTheme();

  document.getElementById("header").innerHTML = `
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 p-4">
      <a href="index.html" class="text-xl font-bold text-accent">💻 Laptop Finder</a>
      <button id="menuBtn" class="btn-action md:hidden">Menu</button>
      <nav id="menu" class="hidden w-full flex-col gap-3 md:flex md:w-auto md:flex-row md:items-center">
        <a href="index.html">Home</a>
        <a href="laptops.html">Laptops</a>
        <a href="favorites.html">Favorites</a>
        <a href="compare.html">Compare</a>
        <button id="themeBtn" class="btn-action"></button>
      </nav>
    </div>`;

  const themeBtn = document.getElementById("themeBtn");
  const showLabel = () =>
    (themeBtn.textContent = getTheme() === "performance" ? "🔋 Battery Saver" : "🔥 Performance");
  showLabel();

  themeBtn.onclick = () => {
    const next = getTheme() === "performance" ? "saver" : "performance";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    showLabel();
  };
  // Menu button shows/hides the links on small screens
  document.getElementById("menuBtn").onclick = () =>
    document.getElementById("menu").classList.toggle("hidden");
}

// One laptop card (used on the catalogue AND the favorites page)
export const cardHTML = (l) => `
  <div class="laptop-card">
    <img src="${l.image}" alt="${l.name}" class="h-36 w-full object-contain">
    <h3 class="font-bold">${l.name}</h3>
    <p class="text-sm opacity-70">${l.brand} · ${l.category}</p>
    <p class="text-xl font-bold text-accent">$${l.price}</p>
    <p class="text-sm">${l.cpu} · ${l.ramGB}GB RAM · ${l.storageGB}GB · ${l.batteryHours}h battery</p>
    <div class="mt-auto flex gap-2">
      <a href="details.html?id=${l.id}" class="btn-action">Details</a>
      <button data-fav="${l.id}" class="btn-action">${isFavorite(l.id) ? "★ Saved" : "☆ Save"}</button>
    </div>
  </div>`;

// Grey pulsing placeholder cards shown while loading
export const skeleton = (n) =>
  Array(n).fill(`
    <div class="laptop-card animate-pulse">
      <div class="h-36 rounded bg-muted"></div>
      <div class="h-4 w-3/4 rounded bg-muted"></div>
      <div class="h-4 w-1/2 rounded bg-muted"></div>
      <div class="h-8 w-full rounded bg-muted"></div>
    </div>`).join("");

// One click listener for all favorite buttons inside a container
export function onFavClick(container, redraw) {
  container.addEventListener("click", (e) => {
    const id = e.target.dataset.fav;
    if (id) {
      toggleFavorite(Number(id));
      redraw();
    }
  });
}
