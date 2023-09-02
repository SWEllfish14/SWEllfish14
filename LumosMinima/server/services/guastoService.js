const { raw } = require("express");
const db = require("../models/index");
Guasto = db.guasti;
Area = db.aree;
const getAllGuastiAperti = async () => {
  const guasti = await Guasto.findAll(
    {
      order : [["data_rilevamento", "DESC"]],
      where: {
        stato: 0
      },
      include: [
        {
                model: Area,
                as: 'area',
                attributes: ['città','zona_geografica_città']
      }  ],
          raw:true,
         
        }
    
    
  );
  return guasti;
};


const getAllGuastiChiusi = async () => {
  const guasti = await Guasto.findAll(
    {
      order : [["data_rilevamento", "DESC"]],
      where: {
        stato: 1
      },
      include: [
        {
                model: Area,
                as: 'area',
                attributes: ['città','zona_geografica_città']
      }  ],
          raw:true,
         
        }
    
    
  );
  return guasti;
};


const getGuastiForSensoreRotto = async () => {
  const guasti = await Guasto.findAll(
    {
      attributes : ["ID"],
      where: {
        note: "sensore rotto"
      },
          raw:true,
         
        }
    
    
  );
  return guasti;
};


const getNumeroGuasti = async () => {
  const numeroGuasti = await Guasto.count();
  return numeroGuasti.toString();
};

const getOneGuasto = async (id) => {
  const guasto = await Guasto.findByPk(id);
  return guasto;
};

const chiudiGuasto = async(id) =>{
  guasto = await Guasto.findOne({
    where: {
      id: id,
    },
 });

 /*const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
*/
  

 guasto.update({
  stato:1
 })
 const dateOfToday = new Date()

 guasto.update({
  data_risoluzione : dateOfToday
 })
 
 //count = await guasto.destroy();
 // return(`deleted row(s): ${count}`);
}

const eliminaGuastiArea = async(id) =>{
  const guasti = await Guasto.findAll({
    where: {
      id: id,
    },
 });
 return guasti;
}
const eliminaGuasto = async(id) =>{
  const guasto = await Guasto.findOne({
    where: {
      id: id,
    },
 });

 /*const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
*/
  

 count = await guasto.destroy();
 return(`deleted row(s): ${count}`);
}

const modificaGuasto = async(id, new_stato, new_note, new_id_area_illuminata, new_data_risoluzione) =>{
  
 const  guasto  = await Guasto.findByPk(id);

  if(new_stato){
    guasto.update({
    stato:new_stato
  },{ where: {
    ID: id,
  }})  }

  if(new_note){
    guasto.update({
    note:new_note
  },{ where: {
    ID: id,
  }})  }

  if(new_id_area_illuminata){
    guasto.update({
    id_area_illuminata:new_id_area_illuminata
  },{ where: {
    ID: id,
  }})  }

  // se lo stato viene impostato a 0 ovvero se il guasto è chiuso viene impostata la data di risoluzione del guasto
  if(new_stato == 0){
    const new_data_risoluzione = new Date();

    guasto.update({
    data_risoluzione:new_data_risoluzione
  },{ where: {
    ID: id,
  }})  }

  return ("Guasto modificato")
}

const aggiungiGuasto = async(dataRilevamento,stato,note,id_area) =>{
  console.log("chiamo funzione aggiunta da service")
  var id = await Guasto.count() +1;
  console.log(id)
  console.log(dataRilevamento)
  console.log(stato)
  console.log(note)
  console.log(id_area)
  
  //const {citta,zonaGeografica,luminositaDefault,luminositaRilevamento,modalita,stato} =data
  const newGuasto = await Guasto.create({ID:id,data_rilevamento:dataRilevamento,stato:stato,note:note,id_area_illuminata:id_area})
 await newGuasto.save()
  return("Guasto aggiunto");
}

module.exports = {
    getAllGuastiAperti,
    getAllGuastiChiusi,
    getNumeroGuasti,
    getOneGuasto,
    chiudiGuasto,
    modificaGuasto,
    aggiungiGuasto,
    eliminaGuasto,
    eliminaGuastiArea,
    getGuastiForSensoreRotto
}