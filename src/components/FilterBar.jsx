const FilterBar = ({ filter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'favorites', label: 'Favorites' },
    { value: 'rated', label: 'Rated' },
    { value: 'unrated', label: 'Unrated' }
  ];

  return (
    <div className="filter-bar">
      {filters.map(f => (
        <button
          key={f.value}
          className={`filter-btn ${filter === f.value ? 'active' : ''}`}
          onClick={() => onFilterChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
