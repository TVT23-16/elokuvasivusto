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
            <li>First movies</li>
            <li>First movies</li>
            <li>First movies</li>
          </ul>
          <br />
        </div>
        <div className="profile-list">
          <h2>My favourite series</h2>
          <br />
          <ul>
            <li>First movies</li>
            <li>First movies</li>
            <li>First movies</li>
          </ul>
          <br />
        </div>
        <div className="profile-list">
          <h2>My ratings</h2>
          <br />
          <ul>
            <li>First movies</li>
            <li>First movies</li>
            <li>First movies</li>
            <br />
          </ul>
        </div>
      </div>
    </div>
  );
};