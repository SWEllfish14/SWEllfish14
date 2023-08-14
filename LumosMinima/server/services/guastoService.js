const db = require("../models/index");
Guasto = db.guasti;

const getAllGuasti = async () => {
  const guasti = await Guasto.findAll();
  return guasti;
};

const getNumeroGuasti = async () => {
  const numeroGuasti = await Guasto.count();
  return numeroGuasti.toString();
};

module.exports = {
    getAllGuasti,
    getNumeroGuasti
}