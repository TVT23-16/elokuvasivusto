import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Myprofile.css';
import { useLanguage } from '../LanguageContext';

export default function Myprofile({ user }) {
  const [uname, setUname] = useState("");
  const [result, setResult] = useState([]);
  const { language } = useLanguage();

  useEffect(() => {
    if (user) {
      const { user: username } = user;
      setUname(username);
    }
  }, [user]);

  useEffect(() => {
    if (uname) {
      const myReviews = async () => {
        try {
          const response = await fetch(`http://localhost:3001/reviews/getuserreview/${uname}`, {
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
      myReviews();
    }
  }, [uname]);

  return (
    <div>
      <h1>{language === 'ENG' ? 'MY PROFILE' : 'OMA PROFIIILI'}</h1>
      <br />
      <div className="profile-box">
        <div className="profile-list">
          <h2>{language === 'ENG' ? 'My favourites' : 'Suosikkini'}</h2>
          <br />
          <ul>
            <li>Movie 1</li>
            <li>Movie 2</li>
            <li>Movie 3</li>
          </ul>
          <br />
        </div>
      </div>
      <div className="profile-box">
        <div className="profile-list">
          <h2>{language === 'ENG' ? 'My reviews' : 'Arvosteluni'}</h2>
          <br />
          <ul className="reviews">
            {result.length > 0 && (
              result.map((review, index) => (
                <label key={index}>
                  <textarea value={  review.movietitle + "\n"+" \n"+ "\n"+ "Stars: " +review.stars + "\n" + "\n" + review.userreview + "\n"} rows={4} cols={40} readOnly className="postContent" />
                </label>
              ))
            )}
          </ul>
          <br />
        </div>
        <br />
        <Link to="/myprofile/delete">
          <button className="delete-button">{language === 'ENG' ? 'Delete account' : 'Poista käyttäjä'}</button>
        </Link>
      </div>
    </div>
  );
}