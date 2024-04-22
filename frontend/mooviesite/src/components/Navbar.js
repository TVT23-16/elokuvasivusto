import { Link } from 'react-router-dom'
import './Navbar.css'
import React from 'react'
import DropdownMenu from './DropdownMenu';
import { useLanguage } from '../LanguageContext';


const Navbar = ({ user }) => {
const { language, toggleLanguage } = useLanguage();
  /* alasvetovalikoon muutos tekstistä ovi-kuvakkeeksi, koodi alkaa *
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  * alasvetovalikoon muutos tekstistä ovi-kuvakkeeksi, koodi päättyy */

  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/series">Series</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <li>
              <li>

              </li>
            </li>
            
          </li>
         <li>
          </li>
          <li>
            <li>
              <li>
              
              </li>
              <DropdownMenu user={user} />  
            </li>
            {user === null && <Link to="/login">Login</Link>}
            {user && <Link to="/logout">Logout</Link>}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

/* korvaa button-dropdown osio tällä

          <li>
          <button onClick={handleProfileClick}>
              <img src="path/to/door-icon.png" alt="My Profile" />
            </button>
            {isDropdownVisible && <DropdownMenu user={user} />}
            </li>*/