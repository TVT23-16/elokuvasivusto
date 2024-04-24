import React, { useState, useEffect } from 'react';
import './MovieDetail.css';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

function SeriesDetail({ user }) {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [uname, setUname] = useState("");
  const [UserReview, setUserReview] = useState("");
  const [Result, setResult] = useState([]);
  const { language } = useLanguage(); // Hae nykyinen kieli

  useEffect(() => {
    if (user) {
      const { user: username } = user; // Destructure username from user object
      setUname(username);
      console.log(username);
    }
  }, [user]);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811';
        const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setSeries(data);
      } catch (error) {
        console.error('Error fetching series details:', error);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  useEffect(() => {
    if (series) {
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
  }, [id, series, UserReview]);

  if (!series) {
    return <div>Loading...</div>;
  }

  const addReview = async () => {
    try {
      const response = await fetch(`http://localhost:3001/reviews/addreview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie_title: series.name,
          media_id: id,
          userreview: UserReview,
          accountname: uname,
          stars: "5"
        }),
      })
      if (response.ok) {
        setResult([...Result, { userreview: UserReview, accountname: uname }]); //...result tekee kopion result taulukosta ja lisää sinne suoraan uuden arvostelun
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleuserReview = (e) => {
    const selected = e.target.value
    setUserReview(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview();
  };

  return (
    <div className="movie-details-container">
      <div className="movie-details-content">
        <div className="text-details">
          <div className="text-container">
            <h1>{series.name}</h1>
            <p className='p-overview'>Overview: {series.overview}</p>
            <p className='p-overview'>First Air Date: {series.first_air_date}</p>
            <p className='p-overview'>Rating: {series.vote_average}</p>
            <h2>{language === 'ENG' ? 'Leave rating' : 'Jätä arvostelu'}</h2>
            <form onSubmit={handleSubmit}>
              <div className='writeRating'>
                <textarea name="postContent" rows={4} cols={40} value={UserReview} onChange={handleuserReview} className="postContent" />
                <button type='submit'>{language === 'ENG' ? 'Submit' : 'Lähetä'}</button>
              </div>
            </form>
            </div>
            {series.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
                alt={series.name}
                className="moviedetail-pic"
              />
            )}
            </div>
            <h2>{language === 'ENG' ? 'Other users reviews' : 'Muiden käyttäjien arvostelut'}</h2>
            <div className="reviews">
              {Result.length > 0 && (
                Result.map((review, index) => (
                  <label key={index}>

                    <textarea value={"Reviewer:" + review.accountname + "\n\n" + review.userreview} rows={4} cols={40} readOnly className="postContent" />

                  </label>
                ))
              )}
        </div>
      </div>
    </div>
  );
}

export default SeriesDetail;
