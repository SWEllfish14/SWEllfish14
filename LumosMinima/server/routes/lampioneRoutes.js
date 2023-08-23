const express = require("express");
const lampioneController = require('../controllers/lampioneController')

const router = express.Router();

router.get('/lamps/:id',lampioneController.getAllLampsFromArea)
router.get('/numeroLampioni',lampioneController.getNumeroLampioni)
router.get('/lampione/:id',lampioneController.getOneLampione)
router.post('/eliminaLampione/:id',lampioneController.eliminaLampione)
router.post('/aggiungiLampione/:area/:ip/:tipo_interazione/:luminositaDefault/:luminositaManuale/:stato',lampioneController.aggiungiLampione)
router.post('/modificaLampione/:id/:area/:ip/:tipo_interazione/:luminositaDefault/:luminositaManuale/:stato',lampioneController.modificaLampione)
module.exports = router;