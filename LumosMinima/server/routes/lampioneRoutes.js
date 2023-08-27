const express = require("express");
const lampioneController = require('../controllers/lampioneController')
const router = express.Router();

router.get('/lamps/:id',lampioneController.getAllLampsFromArea)
router.get('/numeroLampioni',lampioneController.getNumeroLampioni)
router.get('/numeroLampioniArea/:id',lampioneController.getAllLampsFromAreaCount)
router.get('/lampione/:id',lampioneController.getOneLampione)
router.post('/eliminaLampione/:id',lampioneController.eliminaLampione)
router.post('/aggiungiLampione/:area/:ip/:tipo_interazione/:luminositaDefault/:luminositaManuale/:stato',lampioneController.aggiungiLampione)
router.post('/modificaLampione/:id/:ip/:tipo_interazione/:luminositaDefault/:luminositaManuale/:stato',lampioneController.modificaLampione)
router.post('/accendiLampioniArea/:id',lampioneController.accendiLampioniArea)
router.post('/spegniLampioniArea/:id',lampioneController.spegniLampioniArea)
router.post('/accendiLampione/:lampId',lampioneController.accendiLampione)
router.post('/spegniLampione/:lampId',lampioneController.spegniLampione)
module.exports = router;