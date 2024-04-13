const { Pool } = require('pg')
const dotenv = require('dotenv');
dotenv.config();

const dBConnection = new Pool({
    user: 'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = dBConnection;