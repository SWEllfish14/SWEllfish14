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
  return ("Luminosità aumentata");
};
const diminuisciLuminositaArea = async (id) => {
  const area = await Area.findByPk(id);
  const result = await area.decrement('luminosità_manuale',{by:1})
  return ("Luminosità diminuita");
};

const aggiungiArea = async(data) =>{
  console.log("chiamo funzione aggiunta da service")
  const {id,citta,zonaGeografica,luminositaDefault,luminositaRilevamento,modalita,stato} =data
  const newArea = await Area.create({ ID: id,città:citta,zona_geografica_città:zonaGeografica,modalità_funzionamento:modalita,stato:stato,luminosità_standard:luminositaDefault,luminosità_rilevamento:luminositaRilevamento,luminosità_manuale:0})
  await newArea.save()
  return("Area aggiunta");
}

const modificaArea = async(data,id) =>{
  console.log("chiamo funzione salvataggio")
  const {citta,modalita,stato,zonaGeografica,luminositaDefault,luminositaRilevamento} = data

  const  area=await Area.findByPk(id);

  console.log(città)
  console.log(zonaCitta)
  if(citta){
    area.set({
      città:città
    })
  }
  if(zonaCitta){
    area.set({
      zona_geografica_città:zonaGeografica
    })  }
    if(stato){
      area.set({
        stato:stato
      })  }
      if(modalita){
        area.set({
          modalità_funzionamento:modalita
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
    return ("Area modificata")
}

const eliminaArea = async(id) =>{
  area = await Area.findOne({
    where: {
      id: id,
    },
 });
 count = await area.destroy();
  return(`deleted row(s): ${count}`);
}
const cambiaModalitaArea = async(id) =>{
  const  area=await Area.findByPk(id);
  if(area.modalità_funzionamento === "M"){
    result = await Area.update({ modalità_funzionamento: "A" }, {
      where: {
        ID: id,
      },
    });
  }
  else{
    result = await Area.update({ modalità_funzionamento: "M" }, {
      where: {
        ID: id,
      },
    });
  }
  return("Modalità funzionamento cambiata");
}

const cambiaStatoArea = async(id) => {
  const area= await Area.findByPk(id);
  if(area.stato){
    result = await Area.update({ stato: 0}, {
      where: {
        ID: id,
      },
    });
    return("Area spenta")
  }else{
    result = await Area.update({ stato: 1}, {
      where: {
        ID: id,
      },
    });
    return("Area accesa")
  }
}

module.exports = {
  getAllAree,
  getNumeroAree,
  getFiveAree,
  getOneArea,
  aumentaLuminositaArea,
  diminuisciLuminositaArea,
  aggiungiArea,
  modificaArea,
  eliminaArea,
  cambiaModalitaArea,
  cambiaStatoArea
};
