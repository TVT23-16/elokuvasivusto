import React, { useEffect, useState } from 'react'
import './Myprofile.css';

export default function Myprofile({user}) {
  const [uname, setUname] = useState("")
  const [Result, setResult] = useState([])
  useEffect(() => {
    if (user) {
      const { user: username } = user; //puretaan user propsista pelkkä käyttäjätunnus
      setUname(username);
    }
  }, [user]);
console.log(uname);
useEffect(() => {
  if (uname) {
  const myReviews = async () => {
    try {
      const response= await fetch (`http://localhost:3001/reviews/getuserreview/${uname}`, {
      method: "GET", 
      headers: {"Content-Type": "application/json"},
      })
      if(response.ok) {
        const result = await response.json()
        console.log(result);
        setResult(result)
        console.log("asd" + Result);
      }
    } catch (error) {
      alert(error)
    }
  }
myReviews()
}
}, [uname])

  



return (
  <div>
    <h1>MY PROFILE</h1>
    <br />
    <button>Delete profile</button>
    <br />
    <div className="profile-box">
      <div className="profile-list">
        <h2>My favourites</h2>
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
        <h2>My reviews</h2>
        <br />
        <ul>
        {Result.length > 0 && (
          Result.map((review, index) => (
            <label key={index}>
              <textarea value={review.userreview +"\n"+ review.movietitle} rows={4} cols={40} readOnly className="postContent" />
            </label>
          ))
        )}
        </ul>
        <br />
      </div>
    </div>
  </div>
);

};

/*muutostesti*/