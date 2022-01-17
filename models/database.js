const mysql = require('mysql');

// exports.connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '1234',
// 	database: 'quizz-app',
// });
exports.connection = mysql.createConnection({
	host: "eu-cdbr-west-02.cleardb.net",
	user: "b51719bc817438",
	password: "ecddcbdc",
	database: "heroku_7894ab0bc917673",
});
