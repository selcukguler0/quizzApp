const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./routers/router');

app.set('trust proxy', 1); // trust first proxy
app.use(session({
	secret: 'little slim shady',
	resave: false,
	saveUninitialized: false,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(router);

app.listen(3000);
