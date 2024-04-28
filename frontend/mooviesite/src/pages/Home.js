import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useLanguage } from '../LanguageContext'; // Ota käyttöön useLanguage-koukku

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const { language } = useLanguage(); // Hae nykyinen kieli

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
        const date = new Date();
        const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        const formattedDate = lastMonth.toISOString().split('T')[0]; // YYYY-MM-DD
        const languageCode = language === 'ENG' ? 'en-US' : 'fi-FI'; // Määritä kielen koodi
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${formattedDate}&sort_by=vote_average.desc&vote_count.gte=500&language=${languageCode}&page=1`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        // Otetaan talteen vain kolme parhaiten arvosteltua elokuvaa
        const topThreeMovies = data.results.slice(0, 3);
        setTopMovies(topThreeMovies);
      } catch (error) {
        console.error('Virhe:', error);
      }
    };

    fetchTopMovies();
  }, [language]); // Päivitä elokuvat, kun kieli muuttuu

  return (
    <div className="home-container">
      <div className="logo-and-link">
        <img src="https://www.finnkino.fi/CustomAssets/new-finnkino-fi/Images/header-logo.png" alt="Finnkino Logo" width="80px" />
        <ul className="link-list">
          <li>
            <Link to="/schedules" className="linkki_finnkino">{language === 'ENG' ? 'FINNKINO SHOWTIMES' : 'FINNKINO NÄYTÖSAJAT'}</Link>
          </li>
        </ul>
      </div>
      <div className="top-movies">
        <h1>{language === 'ENG' ? 'TMDB Top 3 Movies of the Month' : 'TMDB Kuukauden Top 3 elokuvat'}</h1>
        <div id="content">
          <section id="main">
            {/* Näytetään kolme parhaiten arvosteltua elokuvaa */}
            {topMovies.map((elokuva, index) => (
              <Link key={index} to={`/movie/${elokuva.id}`}>
                <article>
                  <div className="movie-container">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${elokuva.poster_path}`}
                      alt={elokuva.title}
                      className="center"
                    />
                    <h3 className="movie-title">{elokuva.title}</h3>
                    <p className="movie-rating">{language === 'ENG' ? 'Rating' : 'Arvosana'}: {elokuva.vote_average}</p>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        </div>
        <div id="empty-space"></div>
      </div>
    </div>
  );
}