const pgPool = require("./pg_connection")

const sql = {
    GET_ALL_REVIEWS : "SELECT * from table_reviews",
    GET_REVIEW: "SELECT * from table_reviews WHERE media_id=$1",
    DELETE_REVIEW: "DELETE FROM table_reviews WHERE accountname = $1",
    ADD_REVIEW: "INSERT INTO table_reviews ( media_id, userreview, accountname) VALUES ($1, $2, $3)"
}

async function addReview( mediaid, userreview,accountname){
    console.log(mediaid);
    await pgPool.query(sql.ADD_REVIEW, [ mediaid, userreview, accountname])
}

async function getReview(mediaid) {
    const result = await pgPool.query(sql.GET_REVIEW, [mediaid])
    return result.rows
    
}

async function delReview(accountname) {
    await pgPool.query(sql.DELETE_REVIEW, [accountname])
}

    
module.exports = {addReview, getReview,delReview }