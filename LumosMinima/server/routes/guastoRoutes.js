const express = require("express");
const guastoController = require('../controllers/guastoController')

const router = express.Router();

router.get('/guasti',guastoController.getAllGuastiAperti)
router.get('/numeroGuasti',guastoController.getNumeroGuasti)
router.get('/guasti/:id',guastoController.getOneGuasto)
router.post('/chiudiGuasto/:id', guastoController.chiudiGuasto)
router.post('/modificaGuasto/:id/:new_stato/:new_note/:new_id_area_illuminata',guastoController.modificaGuasto)
router.post('/aggiungiGuasto/:dataRilevamento/:stato/:note/:id_area',guastoController.aggiungiGuasto)

module.exports = router;