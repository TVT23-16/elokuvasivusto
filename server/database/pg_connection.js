require('dotenv').config();
const {Pool} = require('pg');

const pgPool = new Pool({
    host: process.env.PG_host,
    port: process.env.PG_port,
    database: process.env.PG_database,
    user: process.env.PG_user,
    password: process.env.PG_password,
    ssl: true
});

pgPool.connect( (err) => {
    if(err){
        console.log(err.message);
    }else{
        console.log("Postgre connection ready");

    }
});

module.exports = pgPool;