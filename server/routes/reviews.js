const {addReview } = require("../database/reviews_db");

router.post("/addreview/:username", authjwt, async (req, res) => {
    console.log(req.body);

    
    const accountname = req.body.accountname
    const mediaid = req.body.media_id
    const userreview = req.body.userreview
    await addReview(mediaid, userreview, accountname)
    
    res.end()
})

router.delete("/delete/:username", authjwt, async (req,res) => {
    console.log(req.query);
    const usernam = req.params.username
    await delUser(usernam)
    res.status(200).json({message:"käyttäjä poistettu."})
})


module.exports = router;