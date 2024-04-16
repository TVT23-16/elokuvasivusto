import React from 'react';
import Box from './Box';

const MyFavoriteMovies = ({ user }) => {
  const movies = user.myfavoriteMovies; // Hakee elokuvat käyttäjän tiedoista

  return (
    <Box title="Suosikki Elokuvat">
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </Box>
  );
};

export default MyFavoriteMovies;