import React from 'react';
import'./Footer.css'


export default function Footer() {
  return (
    <footer>

      <div className="powered-by">
      <p>Site powered by</p>
      </div>

      <div className="logo-container">
        <a href="https://www.themoviedb.org/" target="_blank">
          <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="Themoviedb logo" width="80px;"/>
        </a>
        <a href="https://www.finnkino.fi/" target="_blank">
          <img src="https://www.finnkino.fi/CustomAssets/new-finnkino-fi/Images/header-logo.png" alt="Finnkino Logo" width="80px;" />
        </a>
      </div>
    </footer>
  );
}
