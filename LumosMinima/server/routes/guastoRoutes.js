const express = require("express");
const guastoController = require('../controllers/guastoController')

const router = express.Router();

router.get('/guasti',guastoController.getAllGuasti)
router.get('/numeroGuasti',guastoController.getNumeroGuasti)
router.get('/guasti/:id',guastoController.getOneGuasto)


module.exports = router;