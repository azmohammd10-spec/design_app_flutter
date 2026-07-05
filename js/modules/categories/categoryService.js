export async function getCategories() {
  const res = await fetch("../data/categories.json");
  return await res.json();
}
