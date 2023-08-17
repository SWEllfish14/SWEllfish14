const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:142';
const db = require("../models/index");
Area = db.aree;
const getAllAree = async () => {
  const aree = await Area.findAll();
  return aree;
};
const getNumeroAree = async () => {
  const numeroAree = await Area.count();
  return numeroAree.toString();
};
const getFiveAree = async () => {
  const fiveAree = await Area.findAll({ order: [["ID", "ASC"]], limit: 5 });
  return fiveAree;
};
const getOneArea = async (id) => {
  const area = await Area.findByPk(id);
  return area;
};
const aumentaLuminositaArea = async (id) => {
  const area = await Area.findByPk(id);
  const result = await area.increment('luminosità_manuale',{by:1})
  return result;
};
const diminuisciLuminositaArea = async (id) => {
  const area = await Area.findByPk(id);
  const result = await area.decrement('luminosità_manuale',{by:1})
  return result;
};

const aggiungiArea = async(data) =>{
  const {id,citta,zonaGeografica,luminositaDefault,luminositaRilevamento,modalita,stato} =data
  const newArea = await Area.create({ ID: id,città:citta,zona_geografica_città:zonaGeografica,modalità_funzionamento:modalita,stato:stato,luminosità_standard:luminositaDefault,luminosità_rilevamento:luminositaRilevamento,luminosità_manuale:0})
  return("1");
}

const modificaArea = async(data,id) =>{
  const {citta,zonaCitta,luminositaDefault,luminositaRilevamento} = data
  const  area=await Area.findByPk(id);
  if(citta){
    area.set({
      città:citta
    })
  }
  if(zonaCitta){
    area.set({
      zona_geografica_città:zonaCitta
    })  }
  if(luminositaDefault){
    area.set({
      luminosità_standard:luminositaDefault
    })  }
  if(luminositaRilevamento){
    area.set({
      luminosità_rilevamento:luminositaRilevamento
    })  }
    await area.save()
    return ("1")
}

module.exports = {
  getAllAree,
  getNumeroAree,
  getFiveAree,
  getOneArea,
  aumentaLuminositaArea,
  diminuisciLuminositaArea,
  aggiungiArea,
  modificaArea
};
