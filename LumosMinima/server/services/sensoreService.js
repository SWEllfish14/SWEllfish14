
const db = require("../models/index");
const { raw } = require("express");
const sensoriModel = require("../models/sensoriModel");
const cron = require('node-cron');
const axios = require('axios');
const lampioneService = require("../services/lampioneService");
const areaService = require("../services/areaService");
Sensore = db.sensori;
Area = db.aree;


/*const updateUrl = 'http://127.0.0.1:4205/sensor'; // Replace with your update API URL
const interval = 0.5; // Interval in minutes
const  checkForUpdate = async () =>{
  console.log('Checking for updates...');
 axios.get(updateUrl)
    .then(async response => {
      //console.log('Update response:', response.data);
      console.log(response.data.sensor_id)
      console.log(response.data.sensor_detection)
      console.log(response.data.id_area)
      const modalità = await areaService.getModalitaArea(response.data.id_area)
     if(modalità[0].modalità_funzionamento === "A"){
      if(response.data.sensor_detection === true){
        console.log("ok ho un rilevamento")
        const result = await lampioneService.accendiLampioniArea(response.data.id_area)
      }
      else{
        console.log("ok, niente rilevamenti")
        const result = await lampioneService.spegniLampioniArea(response.data.id_area)
      }
    
    }
  else{
      console.log("area in modalità manuale")
  }
    })
    .catch(error => {
      console.error('Error checking for updates:', error.message);
    });

   
}
*/

// Set up a cron job to run every N minutes
//cron.schedule("*/10 * * * * *", checkForUpdate);

//console.log(`Update worker scheduled to run every ${interval} minutes.`);

const getAllSensoriFromArea = async (id) => {
  const sensori = await db.sensori.findAll({
      where: {
          id_area_illuminata: id
      }
  });
  return sensori;
}

const getAllAreeFromSensorID = async (id) => {
  const result = await Area.findAll({
    attributes: ['ID', ['sensore.ID', 'SensoreID']],
    include: {
      model: sensoriModel,
      as: 'sensore',
      attributes: [],
    },
  });

  console.log(result);
  return result;
}



const getNumeroSensori = async () => {
  const numeroSensori = await Sensore.count();
  return numeroSensori.toString();
};

const aggiungiSensore = async(ip,polling,zona_geografica,tipo_interazione,raggio_azione, id_area) =>{
  console.log("aggiungi sensore da service")
  
  var id = await Sensore.count()+1;
  console.log(id)
  id = id+1;

  console.log(id)
  console.log(ip)
  console.log(polling)
  console.log(zona_geografica)
  console.log(tipo_interazione)
  console.log(raggio_azione)
  console.log(id_area)
  
   const newSensore = await Sensore.create({ ID: id, IP:ip,polling_time:polling,zona_geografica_posizionamento:zona_geografica,tipo_interazione:tipo_interazione,raggio_azione:raggio_azione,id_area_illuminata:id_area})
   await newSensore.save()
   return("sensore aggiunto");
};

const modificaSensore = async(id,ip,polling_time,zona_geografica,tipo_interazione,raggio_azione) =>{
    console.log("chiamo funzione modifica da service")
    //const {citta,modalita,stato,zonaGeografica,luminositaDefault,luminositaRilevamento} = data
  console.log(id)
  console.log(ip)
  console.log(polling_time)
  console.log(zona_geografica)
  console.log(tipo_interazione)
  console.log(raggio_azione)
    const  sensore=await Sensore.findByPk(id);
  
    if(ip){
      sensore.update({
        IP:ip
      },{ where: {
        ID: id,
      }})
    }
    if(polling_time){
      sensore.update({
        polling_time:polling_time
      },{ where: {
        ID: id,
      }})  }
      if(zona_geografica){
        sensore.update({
          zona_geografica_posizionamento:zona_geografica
        },{ where: {
          ID: id,
        }})  }
        if(tipo_interazione){
          sensore.update({
            tipo_interazione:tipo_interazione
          },{ where: {
            ID: id,
          }})  }
    if(raggio_azione){
      sensore.update({
        raggio_azione:raggio_azione
      },{ where: {
        ID: id,
      }})  }

      return ("Sensore modificato")
  }

  const getNumeroSensoriAreaCount = async (id) => {
    const sensori = await Sensore.count({
        where: {
            id_area_illuminata: id
        }
    });
    return sensori;
  }
  
  
const eliminaSensore = async(id) =>{
  sensore = await Sensore.findOne({
    where: {
      id: id,
    },
 });
 count = await sensore.destroy();
 return(`deleted row(s): ${count}`);
}

  const getOneSensore = async (id) => {
    const sensore = await Sensore.findByPk(id);
    return sensore;
  };
module.exports = {
    getAllSensoriFromArea,
    getNumeroSensori,
    aggiungiSensore,
    modificaSensore,
    getOneSensore,
    eliminaSensore,
    getNumeroSensoriAreaCount,
    getAllAreeFromSensorID,
    //checkForUpdate
}