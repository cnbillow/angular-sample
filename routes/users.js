var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send([
    {
      id:1,
      name:"gustavo",
      url: 'http://via.placeholder.com/350x350',
      active: true,
      roles: [{
        ADMIN: true,
      }]
    },
    {
      id:2,
      name:"manuel",
      url: 'http://via.placeholder.com/350x350',
      active: false,
      roles: [{
        ADMIN: false,
      }]
    }
  ]);
});

module.exports = router;
