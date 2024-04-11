import React from 'react'
import './Myprofile.css';

export default function Myprofile() {
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
            <li>Listan eka rivi</li>
            <li>Listan toka rivi</li>
            <li>Listan kolmas rivi</li>
          </ul>
          <br />
        </div>
        <div className="profile-list">
          <h2>Suosikki sarjani</h2>
          <br />
          <ul>
            <li>Listan eka rivi</li>
            <li>Listan toka rivi</li>
            <li>Listan kolmas rivi</li>
          </ul>
          <br />
        </div>
        <div className="profile-list">
          <h2>Arvosteluni</h2>
          <br />
          <ul>
            <li>Listan eka rivi</li>
            <li>Listan toka rivi</li>
            <li>Listan kolmas rivi</li>
            <br />
          </ul>
        </div>
      </div>
    </div>
  );
};

/*muutostesti*/