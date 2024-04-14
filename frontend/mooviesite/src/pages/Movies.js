import React, { useState, useEffect } from 'react';
import './Movies.css';

function Elokuvalista() {
  const [haku, setHaku] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [tulokset, setTulokset] = useState([]);

  const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&sort_by=popularity.desc`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${(haku)}`;
  const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  useEffect(() => {
    fetchGenres();
    fetchPopularMovies();
  }, [genre]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(genresUrl);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Virhe:', error);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTulokset(data.results);
    } catch (error) {
      console.error('Virhe:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let url = '';

      if (genre && haku) {
        url = `${searchUrl}&with_genres=${genre}`;
      } else if (genre) {
        url = apiUrl;
      } else if (haku) {
        url = searchUrl;
      } 

      const response = await fetch(url);
      const data = await response.json();
      setTulokset(data.results);
      setHaku('');
    } catch (error) {
      console.error('Virhe:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={haku}
          onChange={(event) => setHaku(event.target.value)}
          placeholder="Search for a movie"
        />
        <select value={genre} onChange={(event) => setGenre(event.target.value)}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>

      <div className="tulokset">
        {tulokset.map((elokuva, index) => (
          <div key={index} className="elokuva">
            <h2>{elokuva.title}</h2>
            <p>Vuosi: {elokuva.release_date}</p>
            <p>Arvosana: {elokuva.vote_average}</p>
            {elokuva.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${elokuva.poster_path}`}
                alt={elokuva.title}
                className="elokuvan-kuva"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Elokuvalista;
