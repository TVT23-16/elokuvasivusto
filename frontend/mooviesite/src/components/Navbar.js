import { Link } from 'react-router-dom';
import './Navbar.css';
import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import { useLanguage } from '../LanguageContext';

const Navbar = ({ user }) => {
  const { language, toggleLanguage } = useLanguage();
  const [isHover, setIsHover] = useState(false);

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
            <Link to="/">{language === 'ENG' ? 'HOME' : 'ETUSIVU'}</Link>
          </li>
          <li>
            <Link to="/series">{language === 'ENG' ? 'SERIES' : 'SARJAT'}</Link>
          </li>
          <li>
            <Link to="/movies">{language === 'ENG' ? 'MOVIES' : 'ELOKUVAT'}</Link>
          </li>
          <li>
            <Link to="/schedules">{language === 'ENG' ? 'FINNKINO SHOWTIMES' : 'FINNKINO NÄYTÖSAJAT'}</Link>
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
