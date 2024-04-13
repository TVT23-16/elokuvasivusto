import React, { useState, useEffect } from 'react';
import './Home.css';

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
        const date = new Date();
        const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        const formattedDate = lastMonth.toISOString().split('T')[0]; // YYYY-MM-DD
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${formattedDate}&sort_by=vote_average.desc&vote_count.gte=500&language=en-US&page=1`;

  
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
  }, []);

  return (
    <div>
      <h1>Top 3 Movies of the Month</h1>
      <div id="content">
        <section id="main">
          {/* Näytetään kolme parhaiten arvosteltua elokuvaa */}
          {topMovies.map((elokuva, index) => (
            <article key={index}>
              <div className="movie-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${elokuva.poster_path}`}
                  alt={elokuva.title}
                  className="center"
                />
                <h3 className="movie-title">{elokuva.title}</h3>
                <p className="movie-rating">Arvosana: {elokuva.vote_average}</p> {/* Lisätään arvosana tähän */}
              </div>
            </article>
          ))}
        </section>
      </div>

      <div>
        <h2>Tähän jotain sisältöä</h2>
        <p>Liibalaba</p>
        <p>Liibalaba</p>
        <p>Liibalaba</p>
        <p>Liibalaba</p>
        <p>Liibalaba</p>
        <p>Liibalaba</p>
      </div>

      <div id="empty-space"></div>
    </div>
  );
}

