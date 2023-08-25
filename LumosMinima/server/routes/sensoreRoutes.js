const express = require("express");
const sensoreController = require('../controllers/sensoreController')

const router = express.Router();

router.get('/sensori/:id',sensoreController.getAllSensoriFromArea)
router.get('/numeroSensori',sensoreController.getNumeroSensori)
router.get('/numeroSensoriArea/:id',sensoreController.getNumeroSensoriAreaCount)
router.get('/sensore/:id', sensoreController.getOneSensore)
router.post('/aggiungiSensore/:ip/:polling/:zona_geografica/:tipo_interazione/:raggio_azione/:id_area',sensoreController.aggiungiSensore)
router.post('/modificaSensore/:id/:ip/:polling_time/:zona_geografica/:tipo_interazione/:raggio_azione',sensoreController.modificaSensore)
router.post('/eliminaSensore/:id',sensoreController.eliminaSensore)
module.exports = router;