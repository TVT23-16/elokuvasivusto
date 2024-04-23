import React, { useState } from 'react';
import './FavoriteMoviesButton.css';

function FavoriteMoviesButton(props) {
  const [isFavoriteMovied, setIsFavoriteMovied] = useState(false);

  const handleClick = () => {
    setIsFavoriteMovied(!isFavoriteMovied);
    // Voit kutsua tässä kohtaa handleAddToFavoriteMovies-funktiota, 
    // jos haluat tallentaa tykkäyksen tietokantaan tai muuhun paikkaan.
    props.addToFavoriteMoviess(props.movieId);
  };

  return (
    <button className="favoritemovies-button" onClick={handleClick}>
      {isFavoriteMovied ? 'Tykkään' : 'Tykkää'}
    </button>
  );
}

export default FavoriteMoviesButton;
