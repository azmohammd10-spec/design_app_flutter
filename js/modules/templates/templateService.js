export async function getTemplates() {
  const res = await fetch("../data/templates.json");
  return await res.json();
}
