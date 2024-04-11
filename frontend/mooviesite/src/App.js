import './App.css';
import Home from './pages/Home';
import Login from './pages/login';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Myprofile from './pages/Myprofile';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/Notfound';
import { useState } from 'react';



function App() {
  const [user, setUser] =useState(null)
  return (
    <>
    <Header></Header>
    <Navbar user ={user}></Navbar>
    <div className= 'container'>
    <Routes>
      <Route path="/"exact element ={<Home/>} />
      <Route path="/login" element ={<Login setUser={setUser}/>} />
      <Route path ="/movies" element ={<Movies user={user}/>}/>
      <Route path ="*" element={<NotFound/>}/>
      <Route path ="/series" element ={<Series/>}/>
      <Route path ="/myprofile" element ={<Myprofile user={user}/>}/>
      <Route path="/home"exact element ={<Home/>} />


    </Routes>


    </div>
    <Footer></Footer>

</>
  );
}

export default App;
