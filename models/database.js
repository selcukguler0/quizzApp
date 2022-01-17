const mysql = require('mysql');

exports.connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'quizz-app',
});
