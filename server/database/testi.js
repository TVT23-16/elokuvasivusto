const pgPool = require("./pg_connection.js")
async function test(){
    await pgPool.query("insert into table_account (password) values ('asdasdaasd')")
}
test()