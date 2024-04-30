import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';
import { useLanguage } from '../LanguageContext';

const DropdownMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef(null); // Ref dropdown-elementille

  useEffect(() => {
    setIsLoggedIn(user !== null);
  }, [user]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown-menu-container" ref={dropdownRef}>
      <button className={`dropdown-toggle ${isLoggedIn ? 'logged-in' : ''}`} onClick={toggleDropdown}>
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
