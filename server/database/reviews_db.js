const pgPool = require("./pg_connection")

const sql = {
    GET_ALL_REVIEWS : "SELECT * from table_reviews",
    GET_REVIEW: "SELECT * from table_reviews WHERE media_id=$1",
    DELETE_REVIEW: "DELETE FROM table_reviews WHERE accountname = $1",
    ADD_REVIEW: "INSERT INTO table_reviews ( media_id, userreview, accountname, movietitle, stars) VALUES ($1, $2, $3,$4 ,$5)",
    GET_MY_REVIEWS: "SELECT * from table_reviews WHERE accountname=$1",
    CHECK_ACCOUNT_EXISTENCE: "SELECT * FROM table_account WHERE accountname = $1"
}

async function addReview( mediaid, userreview,accountname,movietitle, stars){
    console.log(mediaid);
    const accountExists = await checkAccountExistence(accountname)
    if (!accountExists) {
        throw new Error("Account does not exist");
      }
    await pgPool.query(sql.ADD_REVIEW, [ mediaid, userreview, accountname, movietitle, stars])
}

async function getReview(mediaid) {
    
    const result = await pgPool.query(sql.GET_REVIEW, [mediaid])
    if (result.rowCount > 0){
        return result.rows
    } else {
        throw new Error("no reviews found")
    }
    

}
async function getUserReview(accountname) {
    const accountExists = await checkAccountExistence(accountname)
    if (!accountExists) {
        throw new Error("Account does not exist");
      }
    const result = await pgPool.query(sql.GET_MY_REVIEWS, [accountname])
    return result.rows
    
}

async function delReview(accountname) {
    const accountExists = await checkAccountExistence(accountname)
    if (!accountExists) {
        throw new Error("Account does not exist");
      }
    await pgPool.query(sql.DELETE_REVIEW, [accountname])
}

async function checkAccountExistence(accountname) {
    const result = await pgPool.query(sql.CHECK_ACCOUNT_EXISTENCE, [accountname]);
    return result.rows.length > 0;
  }
  
    
module.exports = {addReview, getReview,delReview,getUserReview }