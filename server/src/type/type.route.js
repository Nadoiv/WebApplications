var express = require('express');
var typeCtrl = require('./type.controller');

const router = express.Router();

router.get('/', typeCtrl.getAll);
router.post('/filter', typeCtrl.filter);
router.put('/',typeCtrl.update);
router.delete('/:id',typeCtrl.delete);
router.post('/',typeCtrl.add);

module.exports = router;