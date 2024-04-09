const { getUsers, addUser, delUser } = require("../database/user_db");

const router = require("express").Router();

router.get("/all", async (req,res) => {
    const users = await getUsers();
    console.log(users);
    res.json(users);
})



    router.delete("/delete/:usernam", async (req,res) => {
        console.log(req.params);
        const usernam = req.params.usernam
        await delUser(usernam)
        res.status(200).json({message:"käyttäjä poistettu."})
    })
    
module.exports = router;