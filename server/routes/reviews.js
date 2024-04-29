const {addReview,getReview,delReview, getUserReview} = require("../database/reviews_db");
const router = require("express").Router();


router.post("/addreview", async (req, res) => {
    console.log(req.body);
    try {
    const accountname = req.body.accountname
    const movietitle = req.body.movie_title
    const mediaid = req.body.media_id
    const userreview = req.body.userreview
    const stars = req.body.stars
    await addReview(mediaid, userreview, accountname, movietitle, stars)
    res.status(200).json({success: "Review added succesfully"})
    } catch (error) {
        res.status(500).json({ error: "Error adding review" })
    }
    
    
   
})

router.get("/getreview/:mediaid", async (req, res) => {
    const mediaid = req.params.mediaid;
    try {
        const reviews = await getReview(mediaid);
        res.json(reviews); 
        console.log(reviews);
    } catch (error) {
        console.error("Error retrieving reviews:", error)
        res.status(500).json({ error: "Error retrieving reviews" })
    }
});

router.get("/getuserreview/:username", async (req, res) => {
    const accountname = req.params.username;
    try {
        const reviews = await getUserReview(accountname);
        res.json(reviews); 
        console.log("tässä käyttäjän arvostelut" + reviews);
    } catch (error) {
        console.error("Error retrieving reviews:", error)
        res.status(500).json({ error: "Error retrieving reviews" })
    }
});

router.delete("/deletereview/:username", async (req,res) => {
    const accountname = req.params.username
    console.log("tuleeko läpi" + accountname);
    try {
        await delReview(accountname)
        res.status(200).json({message: "Reviews deleted"})
        console.log(res);
    } catch (error) {
        res.status(500).json({error: "Error deleting reviews"});

    }
})

module.exports = router;