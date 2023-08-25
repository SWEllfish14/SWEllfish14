const express = require("express");
const areaController = require('../controllers/areaController')

const router = express.Router();

router.get('/aree',areaController.getAllAree)
router.get('/numeroAree',areaController.getNumeroAree)
router.get('/areelimit',areaController.getFiveAree)
router.get('/area/:id',areaController.getOneArea)
router.post('/area/:id/aumentaluminosita',areaController.aumentaLuminositaArea)
router.post('/area/:id/diminuisciluminosita',areaController.diminuisciLuminositaArea)
router.post('/aggiungiArea/:citta/:zonaGeografica/:stato/:modalita/:luminositaDefault/:luminositaRilevamento',areaController.aggiungiArea)
router.post('/modificaArea/:id/:citta/:zonaGeografica/:stato/:modalita/:luminositaDefault/:luminositaRilevamento',areaController.modificaArea)
router.post('/eliminaArea/:id', areaController.eliminaArea)
router.post('/cambiaModalitaArea/:id',areaController.cambiaModalitaArea)
router.post('/accendiArea/:id',areaController.accendiArea)
module.exports = router;