const { addUser } = require("../database/auth_db");

const router = require("express").Router();



router.post("/add", async (req,res) => {


    const accountname = req.body.accountname
    const password = req.body.password

    
    await addUser(password, accountname) // Kutsutaan addUser-funktiota uuden käyttäjän lisäämiseksi
    console.log(req.body.password);

    res.end();
   
})


    
module.exports = router;