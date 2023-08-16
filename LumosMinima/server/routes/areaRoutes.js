const express = require("express");
const areaController = require('../controllers/areaController')

const router = express.Router();

router.get('/aree',areaController.getAllAree)
router.get('/numeroAree',areaController.getNumeroAree)
router.get('/areelimit',areaController.getFiveAree)
router.get('/area/:id',areaController.getOneArea)
router.post('/area/:id/aumentaluminosita',areaController.aumentaLuminositaArea)
router.post('/area/:id/diminuisciluminosita',areaController.diminuisciLuminositaArea)
router.post('/aggiungiArea',areaController.aggiungiArea)
module.exports = router;