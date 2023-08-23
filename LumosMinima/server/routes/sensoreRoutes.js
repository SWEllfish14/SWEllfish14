const express = require("express");
const sensoreController = require('../controllers/sensoreController')

const router = express.Router();

router.get('/sensori/:id',sensoreController.getAllSensoriFromArea)
router.get('/numeroSensori',sensoreController.getNumeroSensori)
router.post('/aggiungiSensore/:ip/:polling/:zona_geografica/:tipo_interazione/:raggio_azione/:id_area',sensoreController.aggiungiSensore)

module.exports = router;