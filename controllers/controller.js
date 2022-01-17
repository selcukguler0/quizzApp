const { connection } = require('../models/database');

exports.getHome = (req, res) => {
	req.session.error = " ";
	req.session.correctAnswers = 0;
	res.render('index');
};
exports.postHome = (req, res) => {
	req.session.error = " ";
	const { name } = req.body;
	req.session.name = name;
	const sqlSl = "SELECT name FROM users WHERE name=?";
	connection.query(sqlSl, [name], (err, result) => {
		try {
			if (result[0]) {
				if (result[0].name === req.session.name) {
					req.session.error = "This name already in use.";
					return res.render("index", { errorMessage: req.session.error });
				}
			}
			
		const sql = "INSERT INTO users (name) VALUES (?)";
		connection.query(sql, [name], (err, results) => {
			if (err) throw err;
			return res.redirect("/question/1");
		});
		} catch (err) {
			console.log(err);
		}
		
	});
};

exports.getQuestions = (req, res) => {
	const questionNumber = req.params.number;

	req.session.questionNumber = questionNumber;
	const sql = 'SELECT * FROM questions WHERE id=?';
	connection.query(sql, [questionNumber], (err, result) => {
		if (err) throw err;
		console.log(result);
		if (req.session.questionNumber >= 2) {
			res.render('question', {
				questionNumber,
				question: result[0].question,
				choiceA: result[0].a,
				choiceB: result[0].b,
				choiceC: result[0].c,
				choiceD: result[0].d,
				button: 'Finish Quizz',
			});
		} else {
			res.render('question', {
				questionNumber,
				question: result[0].question,
				choiceA: result[0].a,
				choiceB: result[0].b,
				choiceC: result[0].c,
				choiceD: result[0].d,
				button: 'Next',
			});
		}
	});
};
exports.postQuestions = (req, res) => {
	const answer = req.body.choice;
	// console.log("answer: "+req.body.choice)

	const sql = 'SELECT answer from questions WHERE id=?';
	connection.query(sql, [req.session.questionNumber], (err, result) => {
		if (err) throw err;
		if (result[0].answer === answer) {
			// console.log("Result0: "+result[0].answer)
			// console.log("Result: "+result)
			req.session.correctAnswers++;
		}
		console.log(req.session.correctAnswers);
		req.session.questionNumber++;
		if (req.session.questionNumber > 2) {
			const sql2 = 'UPDATE users SET correctAnswers=? WHERE name=?';
			connection.query(
				sql2,
				[req.session.correctAnswers, req.session.name],
				(err, result) => {
					if (err) throw err;
					res.redirect('/scoreboard');
				},
			);
		} else {
			res.redirect(`/question/${req.session.questionNumber}`);
		}
	});
};
exports.getScoreboard = (req, res) => {
	req.session.correctAnswers = 0;
	req.session.destroy();
	res.render("scoreboard");
};
