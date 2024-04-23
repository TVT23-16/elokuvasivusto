import React, { useState, useEffect } from 'react';
import './Movies.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

function Movies() {
  // Tilamuuttujat, joiden avulla hallitaan hakua ja suodattimia
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [ageRating, setAgeRating] = useState('');
  const [lang, setLanguage] = useState(''); // Muutettu nimi language -> lang
  const [languages, setLanguages] = useState([]);
  const [genres, setGenres] = useState([]);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&certification_country=US&certification=${ageRating}&with_original_language=${lang}&sort_by=popularity.desc&page=${page}`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(search)}&page=${page}&with_original_language=${lang}`;
  const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  const languagesUrl = `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`;

  useEffect(() => {
    fetchGenres();
    fetchLanguages();
    fetchMovies();
  }, [genre, ageRating, lang, page]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(genresUrl);
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Virhe:', error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch(languagesUrl);
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.error('Virhe:', error);
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

      if (data.total_pages <= page) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Virhe:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setPage(1);
    setHasMore(true);

    fetchMovies();

    setSearch('');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const { language } = useLanguage(); // This variable seems to be unused, you might want to remove it

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={language === 'ENG' ? 'Search for a movie' : 'Etsi elokuvaa'}
        />
        <select value={genre} onChange={(event) => setGenre(event.target.value)}>
          <option value="">{language === 'ENG' ? 'All Genres' : 'Kaikki genret'}</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <select value={ageRating} onChange={(event) => setAgeRating(event.target.value)}>
          <option value="">{language === 'ENG' ? 'All Ratings' : 'Kaikki ikärajat'}</option>
          <option value="G">{language === 'ENG' ? 'General Audience' : 'Soveltuu kaikenikäisille'}</option>
          <option value="PG">{language === 'ENG' ? 'Parental Guidance Suggested' : 'Vanhempien valvonta suositeltavaa'}</option>
          <option value="PG-13">{language === 'ENG' ? 'Parents Strongly Cautioned' : 'Vanhempien tiukassa valvonnassa'}</option>
          <option value="R">{language === 'ENG' ? 'Restricted' : 'Rajoitettu'}</option>
          <option value="NC-17">{language === 'ENG' ? 'No One 17 and Under Admitted' : 'Ei alle 17-vuotiaille'}</option>
        </select>
        <select value={lang} onChange={(event) => setLanguage(event.target.value)}>
          <option value="">{language === 'ENG' ? 'All Languages' : 'Kaikki kielet'}</option>
          {languages.map((lang) => (
            <option key={lang.iso_639_1} value={lang.iso_639_1}>
              {lang.english_name} ({lang.iso_639_1})
            </option>
          ))}
        </select>
        <button type="submit">{language === 'ENG' ? 'Search' : 'Hae'}</button>
      </form>

      <div className="results">
        {results.map((movie, index) => (
          <Link key={index} to={`/movie/${movie.id}`} className="movie-link">
            <div key={index} className="movie">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              ) : (
                <div className="empty-poster">
                   <p className="empty-poster-text">No image available</p>
                </div>
              )}
              <h2>{movie.title}</h2>
              <p>{language === 'ENG' ? 'Rating' : 'Arvostelu'}: {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && <button onClick={loadMore} className="load-more-button">{language === 'ENG' ? 'Load More' : 'Lataa Lisää'}</button>}
    </div>
  );
}

export default Movies;
