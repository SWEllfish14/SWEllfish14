const db = require("../models/index");
Sensore = db.sensori;
Area = db.aree;
const getAllSensoriFromArea = async () => {
  const Sensori = await Sensore.findAll();
  return Sensori;
};

const getNumeroSensori = async () => {
  const numeroSensori = await Sensore.count();
  return numeroSensori.toString();
};

module.exports = {
    getAllSensoriFromArea,
    getNumeroSensori
}