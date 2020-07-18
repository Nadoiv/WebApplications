var express = require('express');
var carCtrl = require('./car.controller');

const router = express.Router();

router.get('/',carCtrl.getAll);
router.delete('/:id',carCtrl.delete);
router.post('/',carCtrl.add);
router.post('/filter',carCtrl.filter);
router.put('/',carCtrl.update);
router.put('/rented/',carCtrl.rented);

module.exports = router;