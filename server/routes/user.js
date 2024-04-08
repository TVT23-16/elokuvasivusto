const { getUsers, addUser } = require("../database/user_db");

const router = require("express").Router();

router.get("/all", async (req,res) => {
    const users = await getUsers();
    console.log(users);
    res.json(users);
})

router.post("/add", async (req,res) => {
        console.log(req.body);
        await addUser(req.body.password); // Kutsutaan addUser-funktiota uuden käyttäjän lisäämiseksi
        console.log(req.body.password);
        res.status(200).json({ message: "Käyttäjä lisätty onnistuneesti." }); // Lähetetään vastaus onnistuneesta lisäyksestä
    })

module.exports = router;