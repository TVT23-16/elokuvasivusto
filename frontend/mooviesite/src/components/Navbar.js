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
            <Link to="/">{language === 'ENG' ? 'Home' : 'Etusivu'}</Link>
          </li>
          <li>
            <Link to="/series">{language === 'ENG' ? 'Series' : 'Sarjat'}</Link>
          </li>
          <li>
            <Link to="/movies">{language === 'ENG' ? 'Movies' : 'Elokuvat'}</Link>
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
              <Link to="/login">{language === 'ENG' ? 'Login' : 'Kirjaudu sisään'}</Link>
            ) : (
              <Link to="/logout">{language === 'ENG' ? 'Logout' : 'Kirjaudu ulos'}</Link>
            )}
          </li>
          <DropdownMenu user={user} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
