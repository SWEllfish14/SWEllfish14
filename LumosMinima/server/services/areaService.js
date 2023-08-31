const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:142';
const db = require("../models/index");
Area = db.aree;

const lampioniService = require("../services/lampioneService");
const guastiService = require("../services/guastoService");

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

const getModalitaArea = async (id) => {
  const area = await Area.findAll({
    attributes: ['modalità_funzionamento'],
      where: {
          ID: id
      }
    })
  return area;
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

const getIDAreeMax = async() => {
  const IDAreeMax = await Area.findAll({
    attributes: [Sequelize.fn('max', Sequelize.col('ID'))]
  });

  console.log(IDAreeMax)
  return IDAreeMax;
}



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
  
  //const {citta,zonaGeografica,luminositaDefault,luminositaRilevamento,modalita,stato} =data
  const newArea = await Area.create({ID:id,città:citta,zona_geografica_città:zonaGeografica,modalità_funzionamento:modalita,luminosità_standard:luminositaDefault,luminosità_rilevamento:luminositaRilevamento,luminosità_manuale:1,stato:stato})
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
  console.log("elimino area")
  const lampioni = await lampioniService.getAllLampsFromArea(id);
  if(lampioni.length == 0){
  }
  else{
    console.log("lamps")
  for(let i = 0; i < lampioni.length; i++){

    const ris = await lampioniService.eliminaLampione(lampioni[i].ID);

  }
  
  }
   const sensori = await sensoriService.getAllSensoriFromArea(id)
  if(sensori.length == 0) {
  }
  else{
  for(let i = 0; i < sensori.length; i++){
    const ris = await sensoriService.eliminaSensore(sensori[i].ID);

  }
}
const guasti = await guastiService.eliminaGuastiArea(id)
if(guasti.length == 0){
}
else{
  for(let i = 0; i < guasti.length; i++){
    const ris = await guastiService.eliminaGuasto(guasti[i].ID);

  }
}

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

const accendiArea = async(id) => {
  console.log("accendo area da service")
  const area= await Area.findByPk(id);
  if(area.stato === 0){
    result = await Area.update({ stato: 1}, {
      where: {
        ID: id,
      },
    });
   
    
      const reslt = await lampioniService.accendiLampioniManualeArea(id)
    return("Area accesa")
}
}

const spegniArea = async(id) => {
  console.log("accendo area da service")
  const area= await Area.findByPk(id);
  if(area.stato === 1){
    result = await Area.update({ stato: 0}, {
      where: {
        ID: id,
      },
    });

    const reslt = await lampioniService.spegniLampioniArea(id)
    return("Area spenta")
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
  accendiArea,
  spegniArea,
  getIDAreeMax,
  getModalitaArea,
  diminuisciLuminositaArea
};
