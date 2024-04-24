import './App.css';
import Home from './pages/Home';
import Login from './pages/login';
import Logout from './pages/Logout';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Myprofile from './pages/Myprofile';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from './pages/Notfound';
import { useState, useEffect } from 'react'; // Tuodaan useEffect
import { LanguageProvider } from './LanguageContext'; // Tuodaan LanguageProvider
import Register from './pages/Register';
import Schedules from './pages/Schedules';
import DeleteAccount from './pages/DeleteAccount';
import MovieDetail from './components/MovieDetail';
import SerieDetail from './components/SerieDetail';

function App() {
  const [user, setUser] = useState(null);

  // Tarkistetaan LocalStoragesta käyttäjätila sovelluksen käynnistyessä
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Tallennetaan käyttäjätila LocalStorageen aina kun se päivittyy
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <LanguageProvider> {/* Lisätään LanguageProvider */}
      <>
        <Header></Header>
        <Navbar user={user}></Navbar>
        <div className='container'>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/logout" element={<Logout setUser={setUser} />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/series" element={<Series />} />
            <Route path="/myprofile" element={user ? <Myprofile user={user} /> : <Navigate to="/login" />}/>
            <Route path="/home" exact element={<Home />} />
            <Route path="register"  element={<Register setUser={setUser}/>} />
            <Route path="myprofile/delete"  element={<DeleteAccount user={user}/>} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/movie/:id" element={<MovieDetail user = {user} />} />
            <Route path="/serie/:id" element={<SerieDetail  user = {user} />}/> 
          </Routes>
        </div>
        <Footer></Footer>
      </>
    </LanguageProvider>
  );
}

export default App;
