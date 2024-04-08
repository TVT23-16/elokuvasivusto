const pgPool = require("./pg_connection")
async function test(){
    await pgPool.query("insert into table_account (password) values ('boo')")
}
test()