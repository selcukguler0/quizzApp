const express = require('express');

const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.getHome);
router.post('/', controller.postHome);

router.get('/question/:number', controller.getQuestions);
router.post('/question', controller.postQuestions);

router.get('/scoreboard', controller.getScoreboard);
module.exports = router;
