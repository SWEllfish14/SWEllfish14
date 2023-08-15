const express = require("express");
const sensoreController = require('../controllers/sensoreController')

const router = express.Router();

router.get('/sensori/:id',sensoreController.getAllSensoriFromArea)
router.get('/numeroSensori',sensoreController.getNumeroSensori)

module.exports = router;