import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRatings, saveRating, deleteRating, isFavorite, toggleFavorite } from '../utils/localStorage';
import seriesData from '../data/series.json';

const SeriesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const series = seriesData.find(s => s.id === parseInt(id));
  const [userRating, setUserRating] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [tempRating, setTempRating] = useState('');

  useEffect(() => {
    if (!series) return;
    const ratings = getRatings();
    setUserRating(ratings[series.id] || null);
    setFavorite(isFavorite(series.id));
  }, [series]);

  if (!series) {
    return (
      <div className="detail-container">
        <div className="glass-card">
          <h2>Series not found</h2>
          <button onClick={() => navigate('/')} className="btn-primary">Go Home</button>
        </div>
      </div>
    );
  }

  const handleSaveRating = () => {
    const rating = parseFloat(tempRating);
    if (rating >= 0 && rating <= 10) {
      saveRating(series.id, rating);
      setUserRating(rating);
      setShowRatingInput(false);
      setTempRating('');
    }
  };

  const handleDeleteRating = () => {
    deleteRating(series.id);
    setUserRating(null);
    setShowRatingInput(false);
  };

  const handleFavoriteToggle = () => {
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
    <div className="detail-container">
      <button onClick={() => navigate('/')} className="back-btn">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back
      </button>

      <div className="detail-hero">
        <div className="detail-poster">
          <img 
            src={series.poster} 
            alt={series.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600/1a1a1a/ffffff?text=No+Image';
            }}
          />
        </div>
        <div className="detail-info">
          <div className="detail-header">
            <h1>{series.title}</h1>
            <button 
              className={`favorite-btn-large ${favorite ? 'active' : ''}`}
              onClick={handleFavoriteToggle}
              aria-label="Toggle favorite"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
          <div className="detail-meta">
            <span className="detail-year">{series.year}</span>
            <span className="detail-genres">{series.genre.join(' • ')}</span>
          </div>
          <p className="detail-description">{series.description}</p>

          <div className="rating-comparison-section">
            <div className="rating-box glass-card">
              <div className="rating-header">
                <span className="rating-label">IMDb Rating</span>
              </div>
              <div className="rating-value-large">{series.imdbRating}</div>
            </div>

            {userRating ? (
              <div className="rating-box glass-card">
                <div className="rating-header">
                  <span className="rating-label">Your Rating</span>
                  <button 
                    className="edit-rating-btn"
                    onClick={() => setShowRatingInput(true)}
                    aria-label="Edit rating"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                </div>
                <div className="rating-value-large">{userRating}</div>
              </div>
            ) : (
              <div className="rating-box glass-card">
                <div className="rating-header">
                  <span className="rating-label">Your Rating</span>
                </div>
                <button 
                  className="add-rating-btn"
                  onClick={() => setShowRatingInput(true)}
                >
                  Add Your Rating
                </button>
              </div>
            )}

            {userRating && (
              <div className={`rating-diff-box glass-card ${ratingStatus}`}>
                <div className="diff-indicator">
                  {ratingStatus === 'higher' && (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14l5-5 5 5z"/>
                      </svg>
                      <span>Higher</span>
                    </>
                  )}
                  {ratingStatus === 'lower' && (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                      <span>Lower</span>
                    </>
                  )}
                  {ratingStatus === 'same' && (
                    <>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5 12h14v2H5z"/>
                      </svg>
                      <span>Same</span>
                    </>
                  )}
                </div>
                <div className="diff-value">{Math.abs(ratingDiff)}</div>
                <div className="diff-label">points difference</div>
              </div>
            )}
          </div>

          {showRatingInput && (
            <div className="rating-input-box glass-card">
              <label htmlFor="rating-input">Rate this series (0-10)</label>
              <div className="rating-input-group">
                <input
                  id="rating-input"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={tempRating}
                  onChange={(e) => setTempRating(e.target.value)}
                  placeholder={userRating || "0.0"}
                  autoFocus
                />
                <div className="rating-input-actions">
                  <button onClick={handleSaveRating} className="btn-primary">Save</button>
                  {userRating && (
                    <button onClick={handleDeleteRating} className="btn-danger">Delete</button>
                  )}
                  <button onClick={() => {
                    setShowRatingInput(false);
                    setTempRating('');
                  }} className="btn-secondary">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetail;
