const express = require("express");
const guastoController = require('../controllers/guastoController')

const router = express.Router();

router.get('/guasti',guastoController.getAllGuasti)
router.get('/numeroGuasti',guastoController.getNumeroGuasti)
router.get('/guasti/:id',guastoController.getOneGuasto)
router.post('/eliminaGuasto/:id', guastoController.eliminaGuasto)
router.post('/modificaGuasto/:id/:new_stato/:new_note/:new_id_area_illuminata',guastoController.modificaGuasto)
router.post('/aggiungiGuasto/:dataRilevamento/:stato/:note/:id_area_illuminata',guastoController.aggiungiGuasto)

module.exports = router;