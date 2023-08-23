const express = require("express");
const lampioneController = require('../controllers/lampioneController')

const router = express.Router();

router.get('/lamps/:id',lampioneController.getAllLampsFromArea)
router.get('/numeroLampioni',lampioneController.getNumeroLampioni)
router.post('/eliminaLampione/:id',lampioneController.eliminaLampione)
router.post('/aggiungiLampione/:area/:ip/:tipo_interazione/:luminositaDefault/:luminositaManuale/:stato',lampioneController.aggiungiLampione)
module.exports = router;