import React, { useState, useEffect } from 'react';
import './Movies.css';
import { Link } from 'react-router-dom';

function Movies() {
  // Tilamuuttujat, joiden avulla hallitaan hakua ja suodattimia
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [ageRating, setAgeRating] = useState(''); 
  const [language, setLanguage] = useState(''); // Alkuperäiskielen tila
  const [languages, setLanguages] = useState([]); // Alkuperäiskielten tila
  const [genres, setGenres] = useState([]); // Genret
  const [results, setResults] = useState([]); // Hakutulokset
  const [page, setPage] = useState(1); // Sivunumero hakutulosten selaamiseen
  const [hasMore, setHasMore] = useState(true); // Onko lisää hakutuloksia saatavilla

  const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811'; // API-avain
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&certification_country=US&certification=${ageRating}&with_original_language=${language}&sort_by=popularity.desc&page=${page}`; // Hakupyynnön URL, joka käyttää suodattimia kuten genreä, ikärajaa ja alkuperäiskieltä
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(search)}&page=${page}&with_original_language=${language}`; // Hakupyyntö erityisellä hakusanalla ja alkuperäiskielellä
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`; // URL genren hakemiseksi
const languagesUrl = `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`; // URL alkuperäiskielten hakemiseksi

useEffect(() => {
  fetchGenres(); // Haetaan genret
  fetchLanguages(); // Haetaan kielet
  fetchMovies(); // Haetaan elokuvat
}, [genre, ageRating, language, page]); // Riippuvuudet, jotka määrittävät milloin useEffect ajetaan uudelleen

const fetchGenres = async () => {
  try {
    const response = await fetch(genresUrl); // Lähetetään pyyntö genresUrl:iin
    const data = await response.json(); // Muunnetaan vastaus JSON-muotoon
    setGenres(data.genres); // Päivitetään genret vastauksen datalla
  } catch (error) {
    console.error('Error:', error); // Jos tapahtuu virhe, tulostetaan virhe konsoliin
  }
};

const fetchLanguages = async () => { // Alkuperäiskielten haku
  try {
    const response = await fetch(languagesUrl); // Lähetetään pyyntö languagesUrl:iin
    const data = await response.json(); // Muunnetaan vastaus JSON-muotoon
    setLanguages(data); // Päivitetään kielet vastauksen datalla
  } catch (error) {
    console.error('Error:', error); // Jos tapahtuu virhe, tulostetaan virhe konsoliin
  }
};

const fetchMovies = async () => {
  try {
    let url = ''; // Alustetaan URL-muuttuja

    // Tarkistetaan, onko genre ja/tai hakusana asetettu
    if (genre && search) {
      url = `${searchUrl}&with_genres=${genre}`; // Jos sekä genre että hakusana asetettu, lisätään genre hakuparametreihin
    } else if (genre) {
      url = apiUrl; // Jos vain genre asetettu, käytetään apiUrl:ää
    } else if (search) {
      url = searchUrl; // Jos vain hakusana asetettu, käytetään searchUrl:ää
    } else {
      url = apiUrl; // Muulloin käytetään apiUrl:ää
    }

    const response = await fetch(url); // Lähetetään HTTP-pyyntö URL:iin
    const data = await response.json(); // Muunnetaan vastaus JSON-muotoon
    
    if (page === 1) {
      setResults(data.results); // Jos sivunumero on 1, asetetaan hakutulokset suoraan saatuun dataan
    } else {
      // Muussa tapauksessa lisätään uudet tulokset aiempien perään käyttäen funktionaalista päivitystä
      setResults(prevResults => [...prevResults, ...data.results]);
    }
    
    // Tarkistetaan, onko hakutulosten määrä yhtä suuri tai pienempi kuin pyydetty sivunumero
    if (data.total_pages <= page) {
      setHasMore(false); // Jos ei ole enempää sivuja saatavilla, asetetaan hasMore falseksi
    }
  } catch (error) {
    console.error('Error:', error); // Tulostetaan virhe konsoliin
  }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Estetään lomakkeen oletustoiminto, jotta sivu ei päivity automaattisesti
  
    setPage(1); // Asetetaan sivunumero takaisin 1:ksi, koska käyttäjä aloittaa uuden haun ensimmäiseltä sivulta
    setHasMore(true); // Asetetaan hasMore takaisin trueksi, jotta voidaan pyytää lisää tuloksia tarvittaessa
  
    fetchMovies(); // Kutsutaan fetchMovies-funktiota, joka hakee elokuvat uudelleen API:sta vastaamaan uutta hakua tai suodattimia
  
    setSearch(''); // Tyhjennetään hakukenttä, jotta se on valmiina uutta hakua varten
  };
  
  const loadMore = () => {
    setPage(prevPage => prevPage + 1); // Kasvatetaan sivunumeroa yhdellä joka kerta, kun käyttäjä pyytää lisää tuloksia
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}> {/* Lomake, joka suorittaa handleSubmit-funktion lomakkeen lähetyksen yhteydessä */}
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)} 
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
        <select value={ageRating} onChange={(event) => setAgeRating(event.target.value)}> 
          <option value="">All Ratings</option>
          <option value="G">G (General Audience)</option>
          <option value="PG">PG (Parental Guidance Suggested)</option>
          <option value="PG-13">PG-13 (Parents Strongly Cautioned)</option>
          <option value="R">R (Restricted)</option>
          <option value="NC-17">NC-17 (No One 17 and Under Admitted)</option>
        </select>
        <select value={language} onChange={(event) => setLanguage(event.target.value)}> {/* Lisätty alkuperäiskielten dropdown-valikko */}
          <option value="">All Languages</option>
          {languages.map((lang) => ( 
            <option key={lang.iso_639_1} value={lang.iso_639_1}>  {/* key = antaa uniikin avaimen jokaiselle vaihtoehdolle value taas määrittää arvon joka tallenetaan kun valitaan tämä vaihtoehto eli tuok kielen tunnus ISO... */}
              {lang.english_name} ({lang.iso_639_1}){/* Näytetään kielen englanninkielinen nimi ja lyhenne */}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>

      <div className="results">
        {results.map((movie, index) => (
          <Link key={index} to={`/movie/${movie.id}`} className="movie-link">
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
          </Link>
        ))}
      </div>

      {hasMore && <button onClick={loadMore} className="load-more-button">Load More</button>}
    </div>
  );
}

export default Movies;
