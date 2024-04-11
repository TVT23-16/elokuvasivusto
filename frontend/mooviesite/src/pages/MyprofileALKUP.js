import React from 'react';
import {Navigate } from 'react-router-dom';

export default function myprofile({user}) 
{
  if (user === null)
  {
    return <Navigate to ="/login"/>
  }

  return (
    <div>MINUN PROFIILINI</div>
  )
}

/*
//Ja tässä tietokannasta elokuvasuosikkien hakeminen:

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

function getReviews(profileId) {
  const query = `
  SELECT * FROM reviews
  WHERE user_id = $1
  ORDER BY created_at DESC
  `;

  return client.query(query, [profileId]);
}

function Myprofile() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(profileId).then((data) => setReviews(data.rows));
  }, []);

  return (
    <div>
      <h1>PROFIILINI</h1>
      <br />
      <button>Poista profiilini</button>
      <br />
      <div className="profile-lists">
        <div className="profile-list">
          <h2>Suosikki elokuvani</h2>
          <br />
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>{review.title}</li>
            ))}
          </ul>
          <br />
        </div>
        ...
      </div>
    </div>
  );
}
*/