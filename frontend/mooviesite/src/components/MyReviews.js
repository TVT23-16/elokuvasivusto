import React from 'react';
import Box from './Box';

const MyReviews = ({ user }) => {
  const reviews = user.MyReviews; // Hakee arvostelut käyttäjän tiedoista

  return (
    <Box title="Arvostelut">
      {reviews.map((review) => (
        <li key={review.id}>{review.title}</li>
      ))}
    </Box>
  );
};

export default reviews;