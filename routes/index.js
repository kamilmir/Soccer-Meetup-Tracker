var express = require('express');
var router = express.Router();

const users = require('./user/user.controller')
const matches = require('./match/match.controller')

const jwtMiddleware = require('../middlewares/auth.middleware');

router.get('/', function(req, res, next) {
  res.json({
    date: new Date()
  })
});

router.use('/user', users)
router.use('/match', jwtMiddleware, matches)

module.exports = router;
