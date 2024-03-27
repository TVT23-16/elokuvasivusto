require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

app.get("/", (req, res) => {
  console.log("getting root");
  res.send("Serveri toimii jee");
});
