import { Link } from 'react-router-dom';
import { isFavorite, toggleFavorite } from '../utils/localStorage';
import { useState } from 'react';

const SeriesCard = ({ series, userRating }) => {
  const [favorite, setFavorite] = useState(isFavorite(series.id));

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavorites = toggleFavorite(series.id);
    setFavorite(newFavorites.includes(series.id));
  };

  const ratingDiff = userRating ? (userRating - series.imdbRating).toFixed(1) : null;
  const ratingStatus = userRating 
    ? userRating > series.imdbRating 
      ? 'higher' 
      : userRating < series.imdbRating 
      ? 'lower' 
      : 'same'
    : null;

  return (
    <Link to={`/series/${series.id}`} className="series-card">
      <div className="card-image-container">
        <img 
          src={series.poster} 
          alt={series.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Image';
          }}
        />
        <button 
          className={`favorite-btn ${favorite ? 'active' : ''}`}
          onClick={handleFavoriteToggle}
          aria-label="Toggle favorite"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        {userRating && (
          <div className="user-rating-badge">
            <span className="rating-value">{userRating}</span>
            <span className="rating-label">Your Rating</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{series.title}</h3>
        <div className="card-meta">
          <span className="card-year">{series.year}</span>
          <span className="card-genres">{series.genre.join(', ')}</span>
        </div>
        <div className="card-ratings">
          <div className="imdb-rating">
            <span className="rating-label">IMDb</span>
            <span className="rating-value">{series.imdbRating}</span>
          </div>
          {userRating && (
            <div className={`rating-comparison ${ratingStatus}`}>
              <span className="comparison-indicator">
                {ratingStatus === 'higher' && '↑'}
                {ratingStatus === 'lower' && '↓'}
                {ratingStatus === 'same' && '='}
              </span>
              <span className="comparison-diff">{Math.abs(ratingDiff)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SeriesCard;
