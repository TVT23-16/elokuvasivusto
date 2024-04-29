const pgPool = require ("./pg_connection")

const sql = {
    ADD_FAVOURITE: "INSERT INTO table_favourites (accountname, movietitle, media_id) VALUES ($1, $2, $3)",
    GET_FAVOURITES: "SELECT * FROM table_favourites WHERE accountname = $1",
    GET_FAVOURITES_BY_MEDIA_ID: "SELECT * FROM table_favourites WHERE accountname = $1 AND media_id = $2",
    DELETE_FAVOURITES: "DELETE FROM table_favourites WHERE accountname = $1",
    CHECK_ACCOUNT_EXISTENCE: "SELECT * FROM table_account WHERE accountname = $1"
}

async function addFavourite(movie_title, media_id,accountname){
    const accountExists = await checkAccountExistence(accountname)
    if (!accountExists) {
        throw new Error("Account does not exist");
      }
    await pgPool.query(sql.ADD_FAVOURITE, [accountname,movie_title, media_id,])
}

async function getFavourites(accountname) {
    const accountExists = await checkAccountExistence(accountname)
    if (!accountExists) {
        throw new Error("Account does not exist");
      }

    const result = await pgPool.query(sql.GET_FAVOURITES,[accountname])
    return result.rows
}
async function hasLikedMovie(accountname, media_id) {
    const result = await pgPool.query(sql.GET_FAVOURITES_BY_MEDIA_ID, [accountname, media_id]);
    return result.rows.length > 0;
}

async function delFavourites(accountname) {
    await pgPool.query(sql.DELETE_FAVOURITES, [accountname])
}

async function checkAccountExistence(accountname) {
    const result = await pgPool.query(sql.CHECK_ACCOUNT_EXISTENCE, [accountname]);
    return result.rows.length > 0;
  }

module.exports = {addFavourite,getFavourites,hasLikedMovie,delFavourites}