var express = require('express');
var router = express.Router();

const users = require('./user/user.controller')

router.get('/', function(req, res, next) {
  res.json({
    date: new Date()
  })
});

router.use('/user', users)

module.exports = router;
