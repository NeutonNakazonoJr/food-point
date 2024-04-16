const dotenv = require("dotenv");

const config = {
	PORT: process.env.PORT || 3000,
	SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
	
	DB_HOST: process.env.DB_HOST,
    DB_DATABASE_NAME: process.env.DB_DATABASE_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT
};

module.exports = config;
