// Comparison logic: which laptops are selected and which value is best

export const getSelected = () => JSON.parse(localStorage.getItem("compare")) || [];

// Select/unselect a laptop. Returns false when a 5th laptop is blocked.
export function toggleSelected(id) {
  let list = getSelected();
  if (list.includes(id)) list = list.filter((x) => x !== id);
  else if (list.length >= 4) return false;
  else list.push(id);
  localStorage.setItem("compare", JSON.stringify(list));
  return true;
}

// [row label, laptop field, "min" = lowest is best / "max" = highest is best]
export const rows = [
  ["Price ($)", "price", "min"],
  ["RAM (GB)", "ramGB", "max"],
  ["Storage (GB)", "storageGB", "max"],
  ["Battery (hours)", "batteryHours", "max"],
  ["Weight (kg)", "weightKg", "min"],
];

// Math.min or Math.max picks the best value of one row
export const bestValue = (laptops, key, type) => Math[type](...laptops.map((l) => l[key]));
