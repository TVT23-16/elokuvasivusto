
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail({user}) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [Userreview, setUserreview] = useState("");
  const [uname, setUname] = useState("")
  const [result, setResult] = useState([])
  
  useEffect(() => {
    if (user) {
      const { user: username } = user; // Destructure username from user object
      console.log(user);
      setUname(username)
      console.log(uname);
    }
  }, [user]);
  console.log(typeof movie);
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
      console.log(movie);
      const response = await fetch(`http://localhost:3001/reviews/addreview`, {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        media_id: id,
        userreview: Userreview,
        accountname: uname
      }),
      
      })
      if (response.ok) {
        setResult([...result, { userreview: Userreview, accountname: uname }]); //...result tekee kopion result taulukosta ja lisää sinne suoraan uuden arvostelun
      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    if (movie) {
      const getReview = async () => {
        try {
          const response = await fetch(`http://localhost:3001/reviews/getreview/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          console.log("tuleeks mitään" + response);
          if (response.ok) {
            const result = await response.json();
            
            console.log("Vastaus:", result);
            setResult(result);
          }
        } catch (error) {
          alert(error);
        }
      };
  
      getReview();
    }
  }, [id, movie,Userreview]);
  
  console.log("what type" + result);
  

  const handleuserReview = async (e) => {
    const selected = e.target.value
    setUserreview(selected)
    console.log(Userreview);

   
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    addReview()
  }

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
      <form onSubmit={handleSubmit}>
      <div className='writeRating'>
      <textarea name="postContent" rows={4} cols={40} value={Userreview} onChange={handleuserReview} />
      <button type='submit'>submit</button>
      </div>
      </form>
      <div className="reviews">
      {result.length > 0 && (
  result.map((review, index) => (
    <label key={index}>
      <textarea value={review.userreview + review.accountname} rows={4} cols={40} readOnly />
    </label>
  ))
)}
      </div>
    </div>
  );
}

export default MovieDetail;