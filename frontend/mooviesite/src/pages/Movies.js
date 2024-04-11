import React, { useState } from 'react';
import './Movies.css';

// Alustetaan React-komponentti nimeltään Elokuvalista
function Elokuvalista() {
  // Käytetään useState-hookia määrittelemään tilamuuttujat haku ja tulokset
  const [haku, setHaku] = useState(''); // Tilamuuttuja haku, alustetaan tyhjällä merkkijonolla
  const [tulokset, setTulokset] = useState([]); // Tilamuuttuja tulokset, alustetaan tyhjällä taulukolla

  // Määritellään API-avain ja API:n URL-osoite
  const apiKey = 'cfaf3af7360c5b3c0549dd08762cb811'; // Lisää tähän oma API-avaimesi
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

  // Määritellään handleSubmit-funktio, joka käsittelee lomakkeen lähetyksen
  const handleSubmit = async (event) => {
    event.preventDefault(); // Estetään lomakkeen oletustoiminto

    try {
      // Haetaan elokuvat API:sta annetun hakusanan perusteella
      const response = await fetch(apiUrl + haku);
      
      // Muutetaan vastaus JSON-muotoon
      const data = await response.json();
      // Asetetaan saadut tulokset tilamuuttujaan tulokset
      setTulokset(data.results);
    } catch (error) {
      console.error('Virhe:', error); // Tulostetaan virhe konsoliin
    }
  };

  // Palautetaan JSX-muotoinen komponentti
  return (
    <div>
      {/* Lomake, jossa käyttäjä voi syöttää hakusanan */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={haku}
          onChange={(event) => setHaku(event.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit">Hae</button>
      </form>

      
      <div className="tulokset">
        {/* Karttaa käytetään tulosten läpikäymiseen ja renderöintiin */}
        {tulokset.map((elokuva, index) => (
          <div key={index} className="elokuva">
            <h2>{elokuva.title}</h2>
            <p>Vuosi: {elokuva.release_date}</p>
            <p>Arvosana: {elokuva.vote_average}</p>
            {elokuva.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${elokuva.poster_path}`}
                
                className="elokuvan-kuva"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Komponentin exportointi
export default Elokuvalista;