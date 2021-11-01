require('dotenv').config();
module.exports = function () {
	var config_database = {
		"development": {
			"username": process.env.DB_DEV_USER,
			"password": process.env.DB_DEV_PSSWD,
			"database": process.env.DB_DEV_DATABASE,
			/*"schema": process.env.DB_DEV_SCHEMA,*/
			"host": process.env.DB_DEV_HOST,
			"dialect": process.env.DB_DEV_DIALECT,
		},
		"test": {
			"username": process.env.DB_TST_USER,
			"password": process.env.DB_TST_PSSWD,
			"database": process.env.DB_TST_DATABASE,
			"schema": process.env.DB_TST_SCHEMA,
			"host": process.env.DB_TST_HOST,
			"dialect": process.env.DB_TST_DIALECT,
			"dialectOptions": {
				"encrypt": true
			}
		},
		"production": {
			"username": process.env.DB_PRD_USER,
			"password": process.env.DB_PRD_PSSWD,
			"database": process.env.DB_PRD_DATABASE,
			/*"schema": process.env.DB_PRD_SCHEMA,*/
			"host": process.env.DB_PRD_HOST,
			"dialect": process.env.DB_PRD_DIALECT,
			"dialectOptions": {
				"encrypt": true
			}
		}
	};
	return config_database;
};