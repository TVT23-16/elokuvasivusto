const { addUser, getPw } = require("../database/auth_db");
require("dotenv").config()
const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/add", async (req,res) => {


    const accountname = req.body.accountname
    const password = req.body.password

    const hashPw = await bcrypt.hash(password,10)
    if(accountname && password) {
    await addUser(hashPw, accountname) // Kutsutaan addUser-funktiota uuden käyttäjän lisäämiseksi
    console.log(req.body.password);

    res.status(200).json({success:"account created"})
} else if (!accountname && password) {
    res.status(401).json({error: "you must give username and password"})
}
})


router.post("/login", async (req,res) => {
    const uname = req.body.accountname // otetaan saapuvasta pyynnöstä talteen accountname
    const pw = req.body.password // salasana
    const db_pw = await getPw(uname) // kutsutaan getpw funktiota jolle annetaan parametrina tunnus

    if(db_pw) { // jos salasana löytyy, ajetaan if lause
        const authenticated = await bcrypt.compare(pw, db_pw) // verrataan tietokannata löytyvää cryptattyä salasanaa ja käyttäjän syöttämää salasanaa
        if(authenticated){   // jos true
            const token = jwt.sign({username: uname}, process.env.JWT_SECRET ) // luodaan jwt tokeni
            res.status(200).json({jwtToken: token})
            console.log(token);
        }else{
            res.status(401).json({error: "Wrong password"})
        }
    } else {
        res.status(404).json({error: "User not found"})
    }
})


module.exports = router;