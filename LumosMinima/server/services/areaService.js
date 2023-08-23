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



const aggiungiArea = async(citta,zonaGeografica,stato,modalita,luminositaDefault,luminositaRilevamento) =>{
  console.log("chiamo funzione aggiunta da service")
  var id = await Area.count() +1;
  console.log(id)
  console.log(citta)
  console.log(zonaGeografica)
  console.log(stato)
  console.log(modalita)
  console.log(luminositaDefault)
  console.log(luminositaRilevamento)
  const lum_manuale = 0;
  
  //const {citta,zonaGeografica,luminositaDefault,luminositaRilevamento,modalita,stato} =data
  const newArea = await Area.create({id:id,città:citta,zona_geografica_città:zonaGeografica,modalità_funzionamento:modalita,luminosità_standard:luminositaDefault,luminosità_rilevamento:luminositaRilevamento,luminosità_manuale:0,stato:stato})
 await newArea.save()
  return("Area aggiunta");
}

const modificaArea = async(id,citta,zonaGeografica,stato,modalita,luminositaDefault,luminositaRilevamento) =>{
  console.log("chiamo funzione modifica da service")
  //const {citta,modalita,stato,zonaGeografica,luminositaDefault,luminositaRilevamento} = data
console.log(id)
console.log(citta)
console.log(zonaGeografica)
  const  area=await Area.findByPk(id);

  if(citta){
    area.update({
      città:citta
    },{ where: {
      ID: id,
    }})
  }
  if(zonaGeografica){
    area.update({
      zona_geografica_città:zonaGeografica
    },{ where: {
      ID: id,
    }})  }
    if(stato){
      area.update({
        stato:modalita
      },{ where: {
        ID: id,
      }})  }
      if(modalita){
        area.update({
          modalità_funzionamento:stato
        },{ where: {
          ID: id,
        }})  }
  if(luminositaDefault){
    area.update({
      luminosità_standard:luminositaDefault
    },{ where: {
      ID: id,
    }})  }
  if(luminositaRilevamento){
    area.update({
      luminosità_rilevamento:luminositaRilevamento
    },{ where: {
      ID: id,
    }})  }
    //await area.save()
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
