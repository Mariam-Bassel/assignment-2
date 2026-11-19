// Everything that is saved in localStorage (favorites + theme)
export const getFavorites = () => JSON.parse(localStorage.getItem("favorites")) || [];
export const isFavorite = (id) => getFavorites().includes(id);
export const clearFavorites = () => localStorage.setItem("favorites", JSON.stringify([]));
export const getTheme = () => JSON.parse(localStorage.getItem("theme")) || "performance";
export const setTheme = (theme) => localStorage.setItem("theme", JSON.stringify(theme));

// Add the id if it is not saved, remove it if it is
export function toggleFavorite(id) {
  let favs = getFavorites();
  favs = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
  localStorage.setItem("favorites", JSON.stringify(favs));
}
