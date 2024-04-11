import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';

const DropdownMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown} >
        Ovilogo
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="/profiili/asetukset">Poista tilini</Link>
          </li>
          <li>
            <Link to="/profiili/uloskirjautuminen">Kirjaudu ulos</Link>
          </li>
          {/* Lisää vaihtoehtoja tarpeen mukaan */}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;