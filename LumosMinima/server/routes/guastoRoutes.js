const express = require("express");
const guastoController = require('../controllers/guastoController')

const router = express.Router();

router.get('/guasti',guastoController.getAllGuasti)
router.get('/numeroGuasti',guastoController.getNumeroGuasti)
router.get('/guasti/:id',guastoController.getOneGuasto)
router.post('/eliminaGuasto/:id', guastoController.eliminaGuasto)
router.post('/modificaGuasto/:id/:new_data_rilevamento/:new_stato/:new_id_area_illuminata/:new_data_risoluzione',guastoController.modificaGuasto)


module.exports = router;