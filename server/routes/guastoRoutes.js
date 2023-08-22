const express = require("express");
const guastoController = require('../controllers/guastoController')

const router = express.Router();

router.get('/guasti',guastoController.getAllGuasti)
router.get('/numeroGuasti',guastoController.getNumeroGuasti)


module.exports = router;