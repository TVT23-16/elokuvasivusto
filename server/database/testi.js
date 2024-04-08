const pgPool = require("./pg_connection.js")
async function test(){
    await pgPool.query("insert into table_account (password) values ('asdasdaasd')")
}

const sql = {
    ABC: "INSERT INTO table_account VALUES ($1,$2)"
}

async function testi(){
    await pgPool.query("INSERT INTO table_account VALUES (abc, cba)")
}
testi()