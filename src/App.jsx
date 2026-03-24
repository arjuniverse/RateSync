import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SeriesList from './components/SeriesList';
import SeriesDetail from './components/SeriesDetail';
import seriesData from './data/series.json';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<SeriesList series={seriesData} />} />
          <Route path="/series/:id" element={<SeriesDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
