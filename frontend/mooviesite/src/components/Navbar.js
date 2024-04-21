import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useLanguage } from '../LanguageContext';
import DropdownMenu from './DropdownMenu';

const Navbar = ({ user }) => {
  const { language, toggleLanguage } = useLanguage();

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
        </ul>
      </div>

      <div>
        <ul>
          <li>
            <button className="language-button" onClick={toggleLanguage}>
              {language}
            </button>
          </li>
          <li>
            {user === null ? (
              <Link to="/login">{language === 'ENG' ? 'LOGIN' : 'KIRJAUDU SISÄÄN'}</Link>
            ) : (
              <Link to="/logout">{language === 'ENG' ? 'LOGOUT' : 'KIRJAUDU ULOS'}</Link>
            )}
          </li>
          <DropdownMenu user={user} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;