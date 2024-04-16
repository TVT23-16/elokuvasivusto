import React, { useState, useEffect } from 'react';
import './Movies.css';

function Movies() {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); // Whether there are more movies to load

  const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&sort_by=popularity.desc&page=${page}`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(search)}&page=${page}`;
  const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, [genre, page]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(genresUrl);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchMovies = async () => {
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

      // Check if there are more movies to load
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
    setHasMore(true); // Reset hasMore when submitting new search
    fetchMovies();
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
          placeholder="Search for a movie"
        />
        <select value={genre} onChange={(event) => setGenre(event.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key   ={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>

      <div className="results">
        {results.map((movie, index) => (
          <div key={index} className="movie">
            <h2>{movie.title}</h2>
            <p>Rating: {movie.vote_average}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            )}
          </div>
        ))}
      </div>

      {/* Show "Load More" button only if there are more movies to load */}
      {hasMore && <button onClick={loadMore} className="load-more-button">Load More</button>}
    </div>
  );
}

export default Movies;
