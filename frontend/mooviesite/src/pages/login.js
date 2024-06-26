// Login.js

import React, { useState } from "react";
import "./login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";


export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage()
  const validate = async (e) => {
    e.preventDefault(); // ei lähe backendii vielä
    //backendiin pitäs lähtiä tästä nuo salasanat ja kirjautmishommat
    
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        //käytetään fetchiä ja lähetetään kirjautumistiedot palvelimelle ./Login routeen
        method: "POST",
        headers: { "Content-Type": "application/json" }, //lähetämme pyynnön JSON-muodossa
        body: JSON.stringify({
          //muutetaan json muotoon
          accountname: username,
          password: password,
        }),
      });

      if (response.ok) {
        // jos vastaus ok
        const vastaus = await response.json()
        const token = vastaus.jwtToken
        console.log("tässpä tokeni" + token);
        localStorage.setItem("jwtToken", token)
        setUser({ user: username, password: password }); //asetetaan tilamuuttujaan oikeat arvot
        navigate("/"); // sen jälkeen navigoidaan kotisivulle
      } else {
        const errorRes = await response.json()
        setErrormsg(errorRes.error)
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div id="login-form">
      <form onSubmit={validate}>
        <h3 className="login-h3">{language === "ENG" ? "Login" : "Kirjaudu sisään"}</h3>
        <div>
          <label className="custom-label">{language === "ENG" ? "Username" : "Käyttäjänimi"}</label>
          <input
            className="custom-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="custom-label">{language === "ENG" ? "Password" : "Salasana"}</label>
          <input
            className="custom-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className="custom-button">{language === "ENG" ? "Login" : "Kirjaudu"}</button>
        <div>
        <div>{errormsg && <p className="error-message">{errormsg}</p>}</div>
        {language === 'ENG' ? 'Not a user yet? Create your MOOvies account from the button down below!' : 'Etkö ole vielä käyttäjä? Luo MOOvies tunnuksesi alla olevasta napista!'}
         
        </div>
        <div>
        <button onClick={() => navigate("/register")} className="custom-button">{language === "ENG" ? "Register" : "Rekisteröidy"}</button>
        </div>
      </form>
    </div>
  );
}
