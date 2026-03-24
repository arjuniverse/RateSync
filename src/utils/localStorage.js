export const getRatings = () => {
  const ratings = localStorage.getItem('ratesync_ratings');
  return ratings ? JSON.parse(ratings) : {};
};

export const saveRating = (seriesId, rating) => {
  const ratings = getRatings();
  ratings[seriesId] = rating;
  localStorage.setItem('ratesync_ratings', JSON.stringify(ratings));
};

export const deleteRating = (seriesId) => {
  const ratings = getRatings();
  delete ratings[seriesId];
  localStorage.setItem('ratesync_ratings', JSON.stringify(ratings));
};

export const getFavorites = () => {
  const favorites = localStorage.getItem('ratesync_favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const toggleFavorite = (seriesId) => {
  const favorites = getFavorites();
  const index = favorites.indexOf(seriesId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(seriesId);
  }
  localStorage.setItem('ratesync_favorites', JSON.stringify(favorites));
  return favorites;
};

export const isFavorite = (seriesId) => {
  const favorites = getFavorites();
  return favorites.includes(seriesId);
};
