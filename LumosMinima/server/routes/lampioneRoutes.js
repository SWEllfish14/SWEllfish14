const express = require("express");
const lampioneController = require('../controllers/lampioneController')

const router = express.Router();

router.get('/lamps/:id',lampioneController.getAllLampsFromArea)
router.get('/numeroLampioni',lampioneController.getNumeroLampioni)
router.post('/eliminaLampione/:id',lampioneController.eliminaLampione)

module.exports = router;