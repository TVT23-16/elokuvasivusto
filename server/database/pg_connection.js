require('dotenv').config();
const {Pool} = require('pg');

const pgPool = new Pool({
    host: "dpg-co6mgpcf7o1s73dmhf1g-a.frankfurt-postgres.render.com",
    port: 5432,
    database: "chartdb_7e2f",
    user: "elina",
    password: "227wlXA1Wle1CbI5XlE8ehn0XBulO6KN",
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