const router = require("express").Router();
const {addFavourite, getFavourites,hasLikedMovie} = require("../database/favourites_db");

router.post("/addfavourite", async (req, res) => {
    try {
        console.log(req.body);
    const movie_title = req.body.movie_title
    const media_id = req.body.media_id
    const accountname = req.body.accountname
    await addFavourite(movie_title, media_id,accountname)
    

    } catch (error) {
        console.error("Error adding favourite:", error);
        res.status(500).json({ error: "Error adding favourite" });
    }
    
    
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

router.post("/hasLikedMovie", async (req, res) => {
    try {
        const { media_id, accountname } = req.body;
        const liked = await hasLikedMovie(accountname, media_id);

        res.json({ liked }); // palauttaa boolean arvon true jos tykätty.
    } catch (error) {
        console.error("Error checking if user has liked the movie:", error);
        res.status(500).json({ error: "Error checking if user has liked the movie" });
    }
});


module.exports = router;