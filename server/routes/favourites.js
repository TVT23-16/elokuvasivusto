const router = require("express").Router();
const {addFavourite, getFavourites} = require("../database/favourites_db");

router.post("/addfavourite", async (req, res) => {
    console.log(req.body);
    const movie_title = req.body.movie_title
    const media_id = req.body.media_id
    const accountname = req.body.accountname
    await addFavourite(movie_title, media_id,accountname)
    
    res.end()
})

router.get("/getfavourites/:username",async (req, res) => {
const accountname= req.params.username
try {
    const favourites = await getFavourites(accountname)
    res.json(favourites)

} catch (error) {
    console.error("Error retrieving reviews:", error)
        res.status(500).json({ error: "Error retrieving favourites" })
}

})


module.exports = router;