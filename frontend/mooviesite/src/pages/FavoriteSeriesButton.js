import React, { useState } from 'react';
import './FavoriteSeriesButton.css';

function FavoriteSeriesButton(props) {
  const [isFavoriteSeriesd, setIsFavoriteSeriesd] = useState(false);

  const handleClick = () => {
    setIsFavoriteSeriesd(!isFavoriteSeriesd);
    // Voit kutsua tässä kohtaa handleAddToFavorites-funktiota, 
    // jos haluat tallentaa tykkäyksen tietokantaan tai muuhun paikkaan.
    props.addToFavoriteSeriess(props.movieId);
  };

  return (
    <button className="favoriteseries-button" onClick={handleClick}>
      {isFavoriteSeriesd ? 'Tykkään' : 'Tykkää'}
    </button>
  );
}

export default FavoriteSeriesButton;