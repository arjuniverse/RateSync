import { useState, useMemo } from 'react';
import SeriesCard from './SeriesCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import { getRatings, getFavorites } from '../utils/localStorage';

const SeriesList = ({ series }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const ratings = getRatings();
  const favorites = getFavorites();

  const filteredSeries = useMemo(() => {
    let filtered = series;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(term) ||
        s.genre.some(g => g.toLowerCase().includes(term))
      );
    }

    // Apply category filter
    switch (filter) {
      case 'favorites':
        filtered = filtered.filter(s => favorites.includes(s.id));
        break;
      case 'rated':
        filtered = filtered.filter(s => ratings[s.id] !== undefined);
        break;
      case 'unrated':
        filtered = filtered.filter(s => ratings[s.id] === undefined);
        break;
      default:
        break;
    }

    return filtered;
  }, [series, searchTerm, filter, ratings, favorites]);

  return (
    <div className="series-list-container">
      <div className="list-header">
        <h1 className="app-title">RateSync</h1>
        <p className="app-subtitle">Rate and compare your favorite TV series</p>
      </div>

      <div className="controls-section">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterBar filter={filter} onFilterChange={setFilter} />
      </div>

      {filteredSeries.length === 0 ? (
        <div className="empty-state glass-card">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <p>No series found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="series-grid">
          {filteredSeries.map(seriesItem => (
            <SeriesCard 
              key={seriesItem.id} 
              series={seriesItem}
              userRating={ratings[seriesItem.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeriesList;
