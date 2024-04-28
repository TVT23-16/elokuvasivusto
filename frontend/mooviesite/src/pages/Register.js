// Register.js

import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

export default function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { language } = useLanguage();

  const registration = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountname: username,
          password: password,
        }),
      });
      console.log(response);
      if (response.ok && response != null) {
        navigate("/");
        setUser({ user: username, password: password });
      }
    } catch (error) {}
  };

  console.log(username);
  return (
    <div id="register-form">
      <form onSubmit={registration}>
        <h3 className="register-h3">{language === "ENG" ? "Register" : "Rekisteröidy"}</h3>
        <div>
          <label className="custom-label">{language === "ENG" ? "Username" : "Käyttäjänimi"}</label>
          <input className="custom-input" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label className="custom-label">{language === "ENG" ? "Password" : "Salasana"}</label>
          <input className="custom-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="custom-button">
          {language === "ENG" ? "Register" : "Rekisteröidy"}
        </button>
      </form>
    </div>
  );
}