const {addReview } = require("../database/reviews_db");
const router = require("express").Router();
router.post("/addreview", async (req, res) => {
    console.log(req.body);

    
    const accountname = req.body.accountname
    const mediaid = req.body.media_id
    const userreview = req.body.userreview
    await addReview(mediaid, userreview, accountname)
    
    res.end()
})


module.exports = router;