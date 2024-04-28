import React from 'react';
import Box from './Box';

const myFavourites = ({ user }) => {
  const favourites = user.favourites; // Hakee sarjat käyttäjän tiedoista
  
  return (
    <Box title="Suosikki Sarjat ja Elokuvat">
      {user.favourites.map((favourites) => (
        <li key={favourites.id}>
          {favourites.media_type === 'movie' ? 'Elokuva: ' : 'Sarja: '}
          {favourites.title}
        </li>
      ))}
    </Box>
  );
};

export default favourites;