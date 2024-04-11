import React from 'react';
import Box from './Box';

const MyFavoriteSeriesFavoriteMovies = ({ user }) => {
  const series = user.myfavoriteSeries; // Hakee sarjat käyttäjän tiedoista

  return (
    <Box title="Suosikki Sarjat">
      {series.map((series) => (
        <li key={serie.id}>{serie.title}</li>
      ))}
    </Box>
  );
};

export default MyFavoriteSeries;