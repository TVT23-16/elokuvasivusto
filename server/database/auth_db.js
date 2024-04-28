const pgPool = require ("./pg_connection")

const sql = {
    ADD_USER: "INSERT INTO table_account (password, accountname) VALUES ($1, $2)",
    GET_PW: "SELECT password FROM table_account WHERE accountname =$1"
}

async function addUser(password, accountname){
    const existingUser = await getPw(accountname);
    if (existingUser) {
        throw new Error("Username already exists");
    }
}

async function getPw(username) {
    const result = await pgPool.query(sql.GET_PW, [username])

    return result.rowCount > 0 ? result.rows[0].password : null
}

module.exports = {addUser, getPw}