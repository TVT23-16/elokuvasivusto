const { getUsers, addUser, delUser, addReview } = require("../database/user_db");
const { authjwt } = require("../middleware/authjwt");


const router = require("express").Router();

router.get("/all", async (req,res) => {
    const users = await getUsers();
    console.log(users);
    res.json(users);
})



router.delete("/delete/:username", authjwt, async (req,res) => {
    console.log(req.query);
    const usernam = req.params.username
    await delUser(usernam)
    res.status(200).json({message:"käyttäjä poistettu."})
})



    
module.exports = router;