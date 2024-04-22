import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SeriesDetail() {
  const { id } = useParams();
  const [series, setSeries] = useState(null);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
        const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setSeries(data);
      } catch (error) {
        console.error('Error fetching series details:', error);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  if (!series) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{series.name}</h1>
      <p>Overview: {series.overview}</p>
      <p>First Air Date: {series.first_air_date}</p>
      <p>Rating: {series.vote_average}</p>
      {series.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
          alt={series.name}
        />
      )}
    </div>
  );
}

export default SeriesDetail;
