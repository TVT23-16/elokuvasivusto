const pgPool = require ("./pg_connection")

const sql = {
    ADD_FAVOURITE: "INSERT INTO table_favourites (accountname, movietitle, media_id) VALUES ($1, $2, $3)",
    GET_FAVOURITES: "SELECT * FROM table_favourites WHERE accountname = $1"
}

async function addFavourite(movie_title, media_id,accountname){
    await pgPool.query(sql.ADD_FAVOURITE, [accountname,movie_title, media_id,])
}

async function getFavourites(accountname) {
    const result = await pgPool.query(sql.GET_FAVOURITES,[accountname])
    return result.rows
}


module.exports = {addFavourite,getFavourites}