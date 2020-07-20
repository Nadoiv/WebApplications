var express = require('express');
var router = express.Router();
var carRoutes = require('../car/car.route')
var typeRoutes = require('../type/type.route')
var statisticsRoutes = require('../statistics/statistics.route')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});

router.use('/car',carRoutes);
router.use('/type',typeRoutes);
router.use('/statistics',statisticsRoutes);

module.exports = router;
