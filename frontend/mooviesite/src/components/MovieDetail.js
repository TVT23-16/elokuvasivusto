import React from 'react';

export default function MovieDetail({ posterUrl, genre, ageRating, language }) {
  return (
    <div>
      <img src={posterUrl} alt="Movie Poster" />
      <p>Genre: {genre}</p>
      <p>Age Rating: {ageRating}</p>
      <p>Language: {language}</p>
    </div>
  );
}