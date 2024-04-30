import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import { useLanguage } from '../LanguageContext';
import './Navbar.css';

const Navbar = ({ user }) => {
  const { language, toggleLanguage } = useLanguage();
  const [isHover, setIsHover] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
  };

  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'current-page' : ''}>
              {language === 'ENG' ? 'HOME' : 'ETUSIVU'}
            </Link>
          </li>
          <li>
            <Link to="/series" className={location.pathname === '/series' ? 'current-page' : ''}>
              {language === 'ENG' ? 'SERIES' : 'SARJAT'}
            </Link>
          </li>
          <li>
            <Link to="/movies" className={location.pathname === '/movies' ? 'current-page' : ''}>
              {language === 'ENG' ? 'MOVIES' : 'ELOKUVAT'}
            </Link>
          </li>
          <li>
            <Link to="/schedules" className={location.pathname === '/schedules' ? 'current-page' : ''}>
              {language === 'ENG' ? 'FINNKINO SHOWTIMES' : 'FINNKINO NÄYTÖSAJAT'}
            </Link>
          </li>
          <li>
            <button
              className="language-button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleLanguageToggle}
            >
              <img
                src={`${process.env.PUBLIC_URL}/${isHover ? (language === 'ENG' ? 'finnish.png' : 'english.png') : (language === 'ENG' ? 'english.png' : 'finnish.png')}`}
                alt="Language flag"
              />
            </button>
          </li>
          <li>
            <DropdownMenu user={user} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
