
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

const aggiungiSensore = async(ip,polling,zona_geografica,tipo_interazione,raggio_azione, id_area) =>{
  // const {id,ip,tipo_interazione,luminosità_default,luminositaRilevamento,modalita,stato, id_area} =data
   const newSensore = await Sensore.create({ ID: id, IP:ip,polling_time:polling,zona_geografica_posizionamento:zona_geografica,tipo_interazione:tipo_interazione,raggio_azione:raggio_azione,id_area_illuminata:id_area})
   return("sensore aggiunto");
 }
module.exports = {
    getAllSensoriFromArea,
    getNumeroSensori,
    aggiungiSensore
}