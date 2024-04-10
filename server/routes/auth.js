const { addUser, getPw } = require("../database/auth_db");
require("dotenv").config()
const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/add", async (req,res) => {


    const accountname = req.body.accountname
    const password = req.body.password

    const hashPw = await bcrypt.hash(password,10)
    await addUser(hashPw, accountname) // Kutsutaan addUser-funktiota uuden käyttäjän lisäämiseksi
    console.log(req.body.password);

    res.end();
   
})


router.post("/login", async (req,res) => {
    const uname = req.body.accountname
    const pw = req.body.password
    const db_pw = await getPw(uname)

    if(db_pw) {
        const authenticated = await bcrypt.compare(pw, db_pw)
        if(authenticated){  
            const token = jwt.sign({username: uname}, process.env.JWT_SECRET )
            res.status(200).json({jwtToken: token})
        }else{
            res.status(401).json({error: "Wrong password"})
        }
    } else {
        res.status(404).json({error: "User not found"})
    }
})


module.exports = router;