export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function toggleFavorite(id) {
  let fav = getFavorites();

  if (fav.includes(id)) {
    fav = fav.filter(f => f !== id);
  } else {
    fav.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(fav));
}
