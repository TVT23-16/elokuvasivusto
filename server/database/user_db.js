const pgPool = require("./pg_connection")

const sql = {
    GET_ALL_USERS : "SELECT * from table_account",
    GET_USER : "SELECT * from table_account WHERE usernam=$1",
    ADD_USER: "INSERT INTO table_account ( password) VALUES ($1)"
}

async function getUsers() {
   let result = await pgPool.query(sql.GET_ALL_USERS)

   return result.rows;
}

async function addUser(password){
    await pgPool.query(sql.ADD_USER, [password])
    console.log(password)
}


module.exports = {getUsers, addUser}