import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';
import { useLanguage } from '../LanguageContext';

const DropdownMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false); // Tämä funktio sulkee dropdown-valikon
  };

  useEffect(() => {
    // Kuuntelija, joka sulkee dropdown-valikon, kun käyttäjä klikkaa hiirellä muualle sivustolla
    const handleClickOutside = (event) => {
      if (event.target.closest('.dropdown-menu-container') === null) {
        setIsOpen(false);
      }
    };

    // Lisää tapahtumakuuntelija kun komponentti mountataan
    window.addEventListener('click', handleClickOutside);

    // Poista tapahtumakuuntelija kun komponentti unmountataan
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []); // Tyhjä taulukko varmistaa, että useEffect suoritetaan vain kerran, kun komponentti mountataan

  return (
    <div className="dropdown-menu-container">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <img src='/profile.png' alt="profilepic" />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            {user === null ? (
              <Link to="/login" onClick={closeDropdown}>{language === 'ENG' ? 'LOGIN' : 'KIRJAUDU SISÄÄN'}</Link>
            ) : (
              <>
                <Link to="/myprofile" onClick={closeDropdown}>{language === 'ENG' ? 'My profile' : 'Profiili'}</Link>
                <Link to="/myprofile/delete" onClick={closeDropdown}>{language === 'ENG' ? 'Delete account' : 'Poista käyttäjä'}</Link>
                <Link to="/Logout" onClick={closeDropdown}>{language === 'ENG' ? 'Logout' : 'Kirjaudu ulos'}</Link>
              </>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
