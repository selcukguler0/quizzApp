const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const router = require("./routers/router");
const { connection } = require("./models/database");

const httpServer = createServer(app);
const io = new Server(httpServer);

app.set("trust proxy", 1);
app.use(
	session({
		secret: "little slim shady",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.use(express.static("public"));

app.use(router);

io.on("connection", (socket) => {
	setInterval(() => {
		const sql = "SELECT * FROM users ORDER BY correctAnswers DESC";
		connection.query(sql, (err, result) => {
			if (err) throw err;
			socket.emit("scores", result);
		});
	}, 5000);
});

httpServer.listen(process.env.PORT || 3000);
