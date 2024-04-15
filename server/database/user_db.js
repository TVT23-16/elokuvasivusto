const pgPool = require("./pg_connection")

const sql = {
    GET_ALL_USERS : "SELECT * from table_account",
    GET_USER : "SELECT * from table_account WHERE userId=$1",
    DELETE_USER: "DELETE FROM table_account WHERE accountname = ($1)"
}

const reviewsql = {
    ADD_REVIEW: "INSERT INTO table_reviews ( media_id, userreview, accountname) VALUES ($1, $2, $3)"
}

async function getUsers() {
   let result = await pgPool.query(sql.GET_ALL_USERS)

   return result.rows;
}

async function delUser(delet){
    await pgPool.query(sql.DELETE_USER, [delet])
    console.log(delet)
}

async function addReview( mediaid, userreview,accountname){
    console.log(mediaid);
    await pgPool.query(reviewsql.ADD_REVIEW, [ mediaid, userreview, accountname])
}

module.exports = {getUsers, delUser, addReview}