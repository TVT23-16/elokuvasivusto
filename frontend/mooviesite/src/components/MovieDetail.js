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
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const { user: username } = user; //puretaan user propsista pelkkä käyttäjätunnus
      setUname(username);
    }
  }, [user]);
  console.log(process.env.API_KEY);
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
          accountname: uname
        }),
      });
      if (response.ok) {
        setResult([...result, { userreview: Userreview, accountname: uname }]);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    if (user) {
      addReview();
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
            <h2>{language === 'ENG' ? 'Leave rating' : 'Jätä arvostelu'}</h2>

            <form onSubmit={handleSubmit}>
              <div className='writeRating'>
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
                <p>Your star rating is {rating}</p>
                <textarea name="postContent" rows={4} cols={40} value={user ? Userreview : "Kirjaudu sisään kirjoittaaksesi arvostelun"} onChange={handleuserReview} className="postContent" />
                <button type='submit'>{language === 'ENG' ? 'Submit' : 'Lähetä'}</button>
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
      <h2>{language === 'ENG' ? 'Other users reviews' : 'Muiden käyttäjien arvostelut'}</h2>
      <div className="reviews">
        {result.length > 0 && (
          result.map((review, index) => (
            <label key={index}>
              <textarea value={"Arvostelija:" + review.accountname + "\n\n" + review.userreview} rows={4} cols={40} readOnly className="postContent" />
            </label>
          ))
        )}
      </div>
    </div>
  );
}

export default MovieDetail;