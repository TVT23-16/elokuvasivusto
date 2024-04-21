import React from 'react'
import './Myprofile.css';

export default function Myprofile() {
  return (
    <div>
      <h1>MY PROFILE</h1>
      <br />
      <button>Delete profile</button>
      <br />
      <div className="profile-lists">
        <div className="profile-list">
          <h2>My favourite movies</h2>
          <br />
          <ul>
            <li>My favouritte movies</li>
            <li>My favouritte movies</li>
            <li>My favouritte movies</li>
          </ul>
          <br />
        </div>
        <div className="profile-list">
          <h2>My favourite series</h2>
          <br />
          <ul>
            <li>My favouritte movies</li>
            <li>My favouritte movies</li>
            <li>My favouritte movies</li>
          </ul>
          <br />
        </div>
        <div className="profile-list">
          <h2>My reviews</h2>
          <br />
          <ul>
          <li>My favouritte movies</li>
          <li>My favouritte movies</li>
          <li>My favouritte movies</li>
            <br />
          </ul>
        </div>
      </div>
    </div>
  );
};

/*muutostesti*/