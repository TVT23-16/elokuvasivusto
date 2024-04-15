import React, { useState } from "react";
import "./login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
        setUser({ user: username, password: password }); //asetetaan tilamuuttujaan oikeat arvot
        navigate("/"); // sen jälkeen navigoidaan kotisivulle
      } else {
        alert(console.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div id="login-form">
      <form onSubmit={validate}>
        <h3>Login</h3>
        <div>
          <label>User</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button>LOGIN</button>
        <div>
          Not a user yet? Create your Moovies account from the button down
          below!
        </div>
        <div>
        <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </form>
    </div>
  );
}
