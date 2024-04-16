import React, { useState, useEffect } from 'react';
import './Series.css';

function Series() {
  const [haku, setHaku] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [tulokset, setTulokset] = useState([]);
  const [sivu, setSivu] = useState(1); // Sivunumeron tilamuuttuja

  const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
  const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genre}&sort_by=popularity.desc&page=${sivu}`;
  const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(haku)}&page=${sivu}`;
  const genresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`;

  useEffect(() => {
    fetchGenres();
    fetchSeries();
  }, [genre, sivu]); // Huomaa, että sivu lisätään riippuvuuslistalle

  const fetchGenres = async () => {
    try {
      const response = await fetch(genresUrl);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Virhe:', error);
    }
  };

  const fetchSeries = async () => {
    try {
      let url = '';

      if (genre && haku) {
        url = `${searchUrl}&with_genres=${genre}`;
      } else if (genre) {
        url = apiUrl;
      } else if (haku) {
        url = searchUrl;
      } else {
        url = apiUrl;
      }

      const response = await fetch(url);
      const data = await response.json();

      // Jos sivu on 1, korvataan aiemmat tulokset uusilla
      if (sivu === 1) {
        setTulokset(data.results);
      } else {
        // Muuten lisätään uudet tulokset olemassa oleviin tuloksiin
        setTulokset(prevTulokset => [...prevTulokset, ...data.results]);
      }





      
    } catch (error) {
      console.error('Virhe:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Asetetaan sivunumero takaisin 1, kun tehdään uusi haku
    setSivu(1);

    fetchSeries();
  };

  const loadMore = () => {
    // Lisätään sivunumeroa yhdellä
    setSivu(prevPage => prevPage + 1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={haku}
          onChange={(event) => setHaku(event.target.value)}
          placeholder="Search for a series"
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
        {tulokset.map((sarja, index) => (
          <div key={index} className="sarja">
            <h2>{sarja.name}</h2>
            <p>Arvosana: {sarja.vote_average}</p>
            {sarja.number_of_episodes && (
              <p>Jaksojen määrä: {sarja.number_of_episodes}</p>
            )}
            {sarja.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${sarja.poster_path}`}
                alt={sarja.name}
                className="sarjan-kuva"
              />
            )}
          </div>
        ))}
      </div>

      {/* Lisää napin "Lataa lisää", joka käynnistää loadMore-funktion */}
      <button onClick={loadMore} className="load-more-button">Load More</button>
    </div>
  );
}

export default Series;
