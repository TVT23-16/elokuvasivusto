import React, { useState, useEffect } from 'react';
import './MovieDetail.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../LanguageContext'; // Ota käyttöön useLanguage-koukku
import { FaStar } from 'react-icons/fa';



function MovieDetail({ user }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [Userreview, setUserreview] = useState("");
  const [uname, setUname] = useState("");
  const [result, setResult] = useState([]);
  const { language } = useLanguage(); // Hae nykyinen kieli
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [heartClicked, setHeartClicked] = useState(false);
  const [heartHover, setHeartHover] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const { user: username } = user;
      setUname(username);
    }
  }, [user]);
  
  useEffect(() => {
    
    
    const fetchMovieDetails = async () => {
      try {
        const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${language === 'ENG' ? 'en-US' : 'fi-FI'}`;
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id, language]);

  const addReview = async () => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/addreview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie_title: movie.title,
          media_id: id,
          userreview: Userreview,
          accountname: uname,
          stars: rating
        }),
      });
      if (response.ok) {
        setResult([...result, { userreview: Userreview, accountname: uname }]);
        setRating(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await fetch(`http://localhost:3001/favourites/hasLikedMovie`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            media_id: id,
            accountname: uname
          }),
        });
  
        if (!response.ok) {
          throw new Error("Error checking if user has liked the movie");
        }
  
        const data = await response.json();
  
        if (data.error) {
          console.log(data.error);
          return;
        }
  
        if (data.liked) {
          console.log("User has already liked this movie");
          setHasLiked(true);
        }
      } catch (error) {
        console.error("Error checking if user has liked the movie:", error);
      }
    };
  
    checkIfLiked();
  }, [id, uname]);


  useEffect(() => {
    const addFavourite = async () => {
      try {
        // tarkistetaan onko käyttäjä jo tykännyt elokuvasta
        const response = await fetch(`http://localhost:3001/favourites/hasLikedMovie`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            media_id: id,
            accountname: uname
          }),
        });
  
        if (!response.ok) {
          console.log(data.error);
        }
        
        const data = await response.json();
        
        if (data.error) {
          console.log(data.error); 
          return;
        }
        
        if (data.liked) {
          console.log("User has already liked this movie"); 
          console.log(hasLiked);
          setHasLiked(true) //jos jo tykätty, asetetaan muuttujan arvoksi true
          return;
        }
  
        // jos ei ole vielä tykätty, lisätään tykätyksi
        const responseAdd = await fetch(`http://localhost:3001/favourites/addfavourite`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            movie_title: movie.title,
            media_id: id,
            accountname: uname
          }),
        });
  
        if (responseAdd.ok) {
          //kun tykkäys ok, asetetaan muuttujan arvoksi true
          console.log("Movie added to favourites");
          setHasLiked(true); 
        } else {
          throw new Error("Error adding movie to favourites");
        }
      } catch (error) {
        console.error("Error adding movie to favourites:", error);
      }
    };
  
    if (heartClicked) {
      addFavourite();
    }
  }, [heartClicked, id, uname, movie]);
  
    

  useEffect(() => {
    if (movie) {
      const getReview = async () => {
        try {
          const response = await fetch(`http://localhost:3001/reviews/getreview/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (response.ok) {
            const result = await response.json();
            setResult(result);
          }
        } catch (error) {
          alert(error);
        }
      };
      getReview();
    }
  }, [id, movie, Userreview]);

  const handleuserReview = (e) => {
    setUserreview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === null || rating === undefined) {
      alert(language === 'ENG' ? 'Please select stars before submitting your review!' : 'Valitse tähdet ennen kuin lähetät arvostelun!');
      return;
    }
    if (user) {
      addReview();
      // Tyhjennä tekstikentän arvo
      setUserreview("");
      // Nollaa tähtien arvostelu
      setRating(null);
    } else {
      navigate("/login");
    }
  };  

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-content">
        <div className="text-details">
          <div className="text-container">
            <h1>{movie.title}</h1>
            <p className='p-overview'>{language === 'ENG' ? 'Overview' : 'Yleiskatsaus'}: {movie.overview}</p>
            <p className='p-overview'>{language === 'ENG' ? 'Release Date' : 'Julkaisupäivä'}: {movie.release_date}</p>
            <p className='p-overview'>{language === 'ENG' ? 'Rating' : 'Arvostelu'}: {movie.vote_average}</p>
            {hasLiked && (
            <div className="already-liked">
              {language === 'ENG' ? 'This one is your favorite!' : 'Tämä on suosikkisi!'}
            </div>
          )}
            <div className="heart">
              <button
                type='button'
                className='favourites-button'
                onClick={() => {
                  if (user) {
                    setHeartClicked(!heartClicked);
                  } else {
                    navigate("/login");
                  }
                }}
                onMouseEnter={() => setHeartHover(true)}
                onMouseLeave={() => setHeartHover(false)}
                style={{ color: (heartClicked || heartHover) ? 'red' : 'black' }}
              >
                ❤
              </button>
            </div>

            <h2>{language === 'ENG' ? 'Leave rating' : 'Jätä arvostelu'}</h2>

            <form onSubmit={handleSubmit}>
              <div className='tahdet'>
                {[...Array(5)].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <div key={index} className='star-container'>
                      <FaStar
                        className='star'
                        size={50}
                        color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => setRating(currentRating)}
                      />
                    </div>
                  );
                })}
                </div>
                <div className="review-form">
                <p>
                  {language === 'ENG'
                    ? rating
                      ? rating === 1
                        ? 'Your rating: 1 star'
                        : `Your rating: ${rating} stars`
                      : 'Add stars to your rating'
                    : rating
                      ? rating === 1
                        ? 'Arviosi: 1 tähti'
                        : `Arviosi: ${rating} tähteä`
                      : 'Lisää tähdet arvosteluusi'}
                </p>

                <textarea name="postContent" rows={4} cols={40} value={user ? Userreview : "Kirjaudu sisään kirjoittaaksesi arvostelun"} onChange={handleuserReview} className="postContent" />
                <button type='submit'>{language === 'ENG' ? 'Submit' : 'Lähetä'}</button>
                <h2>{language === 'ENG' ? 'Other users reviews' : 'Muiden käyttäjien arvostelut'}</h2>
                </div>
            </form>
          </div>


          
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="moviedetail-pic"
            />
          )}
        </div>
      </div>
      
      
      
      <div className="reviews">
        {result.length > 0 && (
          result.map((review, index) => (
            <label key={index}className="review-block">
              <textarea 
  value={`${
    language === 'ENG' ? 'Reviewer' : 'Arvostelija'
  } ${review.accountname}\n\n${
    language === 'ENG' ? 'Stars' : 'Tähdet'
  }: ${review.stars}\n\n${review.userreview}`} 
  rows={4} 
  cols={40} 
  readOnly 
  className="postContent" 
/>
            </label>
          ))
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
