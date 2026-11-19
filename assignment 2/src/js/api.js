// Loads the laptop data from the JSON file
export async function getLaptops() {
  const res = await fetch("data/laptops.json");
  if (!res.ok) throw new Error("Request failed");
  return await res.json();
}
