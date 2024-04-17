const { Pool } = require("pg");
const dotenv = require("dotenv");
const {
	DB_HOST,
	DB_DATABASE_NAME,
	DB_PASSWORD,
	DB_PORT,
} = require("../config/config");
dotenv.config();

const dBConnection = new Pool({
	user: "postgres",
	host: DB_HOST,
	database: DB_DATABASE_NAME,
	password: DB_PASSWORD,
	port: DB_PORT,
});

module.exports = dBConnection;
