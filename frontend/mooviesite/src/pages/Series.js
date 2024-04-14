import React, { useState } from 'react';


function TVSeriesList() {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [results, setResults] = useState([]); 

  const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811'; 
  const apiUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(apiUrl + searchQuery);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search for a TV series"
        />
        <button type="submit">Search</button>
      </form>

      <div className="results">
        {results.map((series, index) => (
          <div key={index} className="series">
            <h2>{series.name}</h2>
            <p>First air date: {series.first_air_date}</p>
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
    </div>
  );
}

export default TVSeriesList;
