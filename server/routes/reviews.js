const {addReview,getReview,delReview} = require("../database/reviews_db");
const router = require("express").Router();
router.post("/addreview", async (req, res) => {
    console.log(req.body);

    
    const accountname = req.body.accountname
    const mediaid = req.body.media_id
    const userreview = req.body.userreview
    await addReview(mediaid, userreview, accountname)
    
    res.end()
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