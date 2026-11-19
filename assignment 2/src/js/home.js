import { getLaptops } from "./api.js";
import { getFavorites } from "./storage.js";
import { setupHeader } from "./ui.js";

setupHeader();
document.getElementById("statFav").textContent = getFavorites().length;

try {
  const laptops = await getLaptops();
  // reduce() turns the whole array into one number
  const lowest = laptops.reduce((min, l) => (l.price < min ? l.price : min), Infinity);
  const bestBattery = laptops.reduce((max, l) => (l.batteryHours > max ? l.batteryHours : max), 0);
  document.getElementById("statCount").textContent = laptops.length;
  document.getElementById("statLow").textContent = "$" + lowest;
  document.getElementById("statBattery").textContent = bestBattery + "h";
} catch (error) {
  document.getElementById("statCount").textContent = "Error";
}
