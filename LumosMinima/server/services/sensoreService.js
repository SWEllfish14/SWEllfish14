
const db = require("../models/index");
const { raw } = require("express");
Sensore = db.sensori;
Area = db.aree;
const getAllSensoriFromArea = async (id) => {
  const sensori = await db.sensori.findAll({
      where: {
          id_area_illuminata: id
      }
  });
  return sensori;
}


const getNumeroSensori = async () => {
  const numeroSensori = await Sensore.count();
  return numeroSensori.toString();
};

module.exports = {
    getAllSensoriFromArea,
    getNumeroSensori
}