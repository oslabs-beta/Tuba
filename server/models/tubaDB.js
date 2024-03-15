const { Pool } = require('pg');
require('dotenv').config();

const {TUBA_PG_URI} = process.env;

const pool = new Pool({
  connectionString: TUBA_PG_URI
});


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};