// MovieDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail({user}) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [Userreview, setUserreview] = useState("");
  const { username }  = user;
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const addReview = async () => {

    const review= ""
    try {
      const response = await fetch(`https://localhost:3001/user/addreview`, {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        media_id: id,
        userreview: review,
        accountname: username
      }),

      })
    } catch (error) {
      console.log(error);
    }

  }
  const handleuserReview = async (e) => {
    const selected = e.target.value
    
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Overview: {movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      )}

      <div className='writeRating'>
      <textarea name="postContent" rows={4} cols={40} value={Userreview} onChange={handleuserReview} />
       
      </div>

    </div>
  );
}

export default MovieDetail;