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
            <li>
              <li>

              </li>
            </li>
            
          </li>
         <li>
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

