
import './App.css';
import Home from './pages/Home';
import movies from './pages/Movies';
import Movies from './pages/Movies';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';




function App() {
  return (
    <>
    <Header></Header>
    <Navbar></Navbar>
    <div className= 'container'>
    <Routes>
      <Route path="/"exact element ={<Home/>} />
      <Route path ="/movies" element ={<Movies/>} />
     
    </Routes>
    
    
    </div>
    <Footer></Footer>
   
</>
  );
}

export default App;
