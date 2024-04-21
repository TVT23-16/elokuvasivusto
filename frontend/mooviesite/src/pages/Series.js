import React, { useState, useEffect } from 'react';
import './Series.css';

function Series() {
  // State variables to manage search, filters, and results
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  
  const [language, setLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
  const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genre}&certification_country=US&with_original_language=${language}&sort_by=popularity.desc&page=${page}`;
  const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(search)}&page=${page}&with_original_language=${language}`;
  const genresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`;
  const languagesUrl = `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`;

  useEffect(() => {
    fetchGenres();
    fetchLanguages();
    fetchSeries();
  }, [genre,  language, page]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(genresUrl);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch(languagesUrl);
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSeries = async () => {
    try {
      let url = '';

      if (genre && search) {
        url = `${searchUrl}&with_genres=${genre}`;
      } else if (genre) {
        url = apiUrl;
      } else if (search) {
        url = searchUrl;
      } else {
        url = apiUrl;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (page === 1) {
        setResults(data.results);
      } else {
        setResults(prevResults => [...prevResults, ...data.results]);
      }

      if (data.total_pages <= page) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPage(1);
    setHasMore(true);

    fetchSeries();

    setSearch('');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)} 
          placeholder="Search for a TV series"
        />
        <select value={genre} onChange={(event) => setGenre(event.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        
        <select value={language} onChange={(event) => setLanguage(event.target.value)}>
          <option value="">All Languages</option>
          {languages.map((lang) => ( 
            <option key={lang.iso_639_1} value={lang.iso_639_1}>
              {lang.english_name} ({lang.iso_639_1})
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>

      <div className="results">
        {results.map((series, index) => (
          <div key={index} className="series">
            <h2>{series.name}</h2>
            <p>Rating: {series.vote_average}</p>
            {series.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
                alt={series.name}
                className="series-poster"
              />
            )}
          </div>
        ))}
      </div>

      {hasMore && <button onClick={loadMore} className="load-more-button">Load More</button>}
    </div>
  );
}

export default Series;
