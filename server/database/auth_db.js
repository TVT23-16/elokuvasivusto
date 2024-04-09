const pgPool = require ("./pg_connection")

const sql = {
    ADD_USER: "INSERT INTO table_account (password, accountname) VALUES ($1, $2)",
}

async function addUser(password, accountname){
    await pgPool.query(sql.ADD_USER, [password, accountname])
    
}

module.exports = {addUser}