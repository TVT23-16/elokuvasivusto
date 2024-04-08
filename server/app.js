require("dotenv").config();
const express = require("express");
const app = express();
app.use( express.urlencoded({extended: false}) );
const cors = require('cors');

const user = require("./routes/user")


const pgPool = require("./database/pg_connection")
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
app.use(cors());


app.use(express.json());

app.use("/user", user)
app.use("/add", user)
//routet

app.get("/", (req, res) => {
  console.log("getting root");
  res.send("Serveri toimii jee");
});

app.get("/login", (req, res) => {
  console.log("getting root");
  res.send("anna käyttäjätiedot");
});