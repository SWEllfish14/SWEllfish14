const axios = require('axios');
const db = require("../models/index");
const cron = require('node-cron');
Lampione = db.lampioni;
Area = db.area;
const schedule =  require('node-schedule');

const getAllLampsFromArea = async (id) => {
    const lampioni = await Lampione.findAll({
        where: {
            id_area_illuminata: id
        }
    });
    /*temp = lampioni
    result = await Promise.all(temp.map(async (lamp) => {
      try {
        port = 3000 + lamp.ID
        const response = await axios.get('http://127.0.0.1:'+port+"/lamp")
        //response.data.ip = lamp.IP
        lamp.luminosità_impostata = parseInt(response.data.brightness)
        lamp.stato = response.data.lamp_status
        console.log(lamp.stato)
        //result.push(response.data)
      }
      catch (e) {
      // console.log(e)
      }
      }))
    return temp;
    */
   return lampioni;
}



const getLampIDtoPowerOn = async (id) => {
  const lampioni = await Lampione.findAll({
    attributes: ['ID'],
      where: {
          id_area_illuminata: id
      }
  });
  const res = [];
  for(let i = 0; i < lampioni.length; i++){
    //console.log(lampioni[i].ID)
    res.push(lampioni[i].ID)
  }

  return res;
}


const getBrightnessofArea = async (id) => {
  const brightness = await Area.findAll({
    attributes: ['luminosità_standard'],
      where: {
          ID: id
      }
  });

  return brightness[0].luminosità_standard;
}
const getBrightnessManualeArea = async (id) => {
  const brightness = await Area.findAll({
    attributes: ['luminosità_manuale'],
      where: {
          ID: id
      }
  });

  return brightness[0].luminosità_manuale;
}



const getBrightnessRilevamento = async (id) => {
  const brightness = await Area.findAll({
    attributes: ['luminosità_rilevamento'],
      where: {
          ID: id
      }
  });

  return brightness[0].luminosità_rilevamento;
}



const getBrightnessofLamp = async (id) => {
  const brightness = await Lampione.findAll({
    attributes: ['luminosità_impostata'],
      where: {
          ID: id
      }
  });

  return brightness[0].luminosità_impostata;
}


const getAllLampsFromAreaCount = async (id) => {
  const lampioni = await Lampione.count({
      where: {
          id_area_illuminata: id
      }
  });
 
  return lampioni;

 
}

 
const getOneLampione = async (id) => {
    const lampione = await Lampione.findByPk(id);
    return lampione;
  };
const getNumeroLampioni = async () => {
  const numeroLampioni = await Lampione.count();
  return numeroLampioni.toString();
};

const eliminaLampione = async (id) => {
     lampione = await Lampione.findOne({
        where: {
            ID: id
        }
    })
    count = await lampione.destroy();
    return(`deleted row(s): ${count}`);
}

const aggiungiLampione = async(area,ip,tipo_interazione,luminositaDefault,luminositaManuale,stato) =>{
    console.log("chiamo funzione aggiunta da service")
    var id = await Lampione.count() +1; 
    console.log(id)
    console.log(ip)
    console.log(area)
    console.log(tipo_interazione)
    console.log(luminositaDefault)
    console.log(luminositaManuale)
    console.log(stato)
   // const {id,ip,tipo_interazione,luminosità_default,luminositaRilevamento,modalita,stato, id_area} =data
    const newLampione = await Lampione.create({ ID: id, IP:ip,tipo_interazione:tipo_interazione,luminosità_default:luminositaDefault,luminosità_impostata:luminositaManuale,stato:stato,id_area_illuminata:area})
    return("Lampione aggiunto");
  }
  const setStatoSingoloLampione = async (id,stato) =>{
    const lampione = findByPk(id);
    if(stato){
      lampione.update({
        stato:stato
      },{ where: {
        ID: id,
      }})  }
  }

  const modificaLampione = async(id,ip,tipo_interazione,luminositaDefault,luminositaManuale,stato) =>{
    console.log("chiamo funzione modifica da service")
    //const {citta,modalita,stato,zonaGeografica,luminositaDefault,luminositaRilevamento} = data
    console.log(id)
    console.log(ip)
    console.log(tipo_interazione)
    console.log(luminositaDefault)
    console.log(luminositaManuale)
    console.log(stato)
    const  lampione=await Lampione.findByPk(id);
  
    if(ip){
      lampione.update({
        IP:ip
      },{ where: {
        ID: id,
      }})  }
      if(tipo_interazione){
        lampione.update({
          tipo_interazione:tipo_interazione
        },{ where: {
          ID: id,
        }})  }
        if(luminositaDefault){
          lampione.update({
            luminosità_default:luminositaDefault
          },{ where: {
            ID: id,
          }})  }
    if(luminositaManuale){
      lampione.update({
        luminosità_impostata:luminositaManuale
      },{ where: {
        ID: id,
      }})  }
      if(stato.toString() != 'null'){
        lampione.update({
          stato:stato
        },{ where: {
          ID: id,
        }})  }

      //await area.save()
      return ("Lampione modificato")
  }

  const accendiLampioniArea = async(id) => {
    console.log("accendo lampioni da service")
    
    const lampioni = await getLampIDtoPowerOn(id)
    const bright = await getBrightnessofArea(id);

    console.log(bright);
    console.log(lampioni.length)

    for(let i = 0; i < lampioni.length; i++){
      console.log(lampioni[i])
        let port = 4000 + (lampioni[i]);
       console.log(port)
       await axios.post("http://127.0.0.1:"+port+"/lamp",{brightness:bright,lamp_status:true,lamp_id:" " +lampioni[i]},{
    headers: {
          'Content-Type': 'application/json'
      } })
         
     
      
    }
  }

  const accendiLampioniManualeArea = async(id) => {
    console.log("accendo lampioni da service")
    
    const lampioni = await getLampIDtoPowerOn(id)
    const bright = await getBrightnessManualeArea(id);

    //console.log(bright);
    console.log(lampioni.length)

    for(let i = 0; i < lampioni.length; i++){
      console.log(lampioni[i])
        let port = 4000 + (lampioni[i]);
       console.log(port)
       await axios.post("http://127.0.0.1:"+port+"/lamp",{brightness:bright,lamp_status:true,lamp_id:" " +lampioni[i]},{
    headers: {
          'Content-Type': 'application/json'
      } })
         
     
      
    }
  }
  

    const accendiLampioniAreaRilevamento = async(id) => {
      console.log("accendo lampioni da service")
      
      const lampioni = await getLampIDtoPowerOn(id)
      const bright = await getBrightnessRilevamento(id);
  
      //console.log(bright);
      console.log(lampioni.length)
  
      for(let i = 0; i < lampioni.length; i++){
        console.log(lampioni[i])
          let port = 4000 + (lampioni[i]);
         console.log(port)
         await axios.post("http://127.0.0.1:"+port+"/lamp",{brightness:bright,lamp_status:true,lamp_id:" " +lampioni[i]},{
      headers: {
            'Content-Type': 'application/json'
        } })
           
       //const time_ril = 0.5;
       //cron.schedule("*/10 * * * * *", accendiLampioniArea(id));
       //schedule.scheduleJob(30000,accendiLampioniArea());
       //setTimeout(accendiLampioniArea(id), 5000)
        
      }

    console.log("ok ora scrivo nel db per accendere")
    for(let i = 0; i < lampioni.length; i++){
      console.log(lampioni[i])
      const result = await modificaLampione(lampioni[i],null,null,null,null,1)
      console.log(result)
    }

  }

    const spegniLampioniArea = async(id) => {
      console.log("spengo lampioni da service")
      const lampioni = await getLampIDtoPowerOn(id)
  
      //console.log(bright);
      console.log(lampioni.length)
  
      for(let i = 0; i < lampioni.length; i++){
        //const bright = await getBrightnessofLamp(lampioni[i]);
        console.log(lampioni[i])
          let port = 4000 + (lampioni[i]);
         console.log(port)
         await axios.post("http://127.0.0.1:"+port+"/lamp",{brightness:0,lamp_status:false,lamp_id:" " +lampioni[i]},{
      headers: {
            'Content-Type': 'application/json'
        } })
           
       
        //await modificaLampione(lampioni[i],null,null,null,null,0)
      }
      
      console.log("ok ora scrivo nel db per spegnere")
      for(let i = 0; i < lampioni.length; i++){
        console.log(lampioni[i])
        const result = await modificaLampione(lampioni[i],null,null,null,null,0)
        console.log(result)
      }

}

const accendiLampione = async(lampID) =>{
  let port = 4000 +parseInt(lampID);
  const  lampione=await Lampione.findByPk(lampID);
  const bright = await getBrightnessofLamp(lampID);
  try {
    await axios.post("http://127.0.0.1:"+port+"/lamp",{brightness:bright,lamp_status:true,lamp_id:" " +lampID},{
      headers: {
            'Content-Type': 'application/json'
        } })
        lampione.update({luminosità_impostata:bright,stato:1})
        return ("Lampione Acceso")
  } catch (error) {
    console.log(error)
    return("Lampione non raggiungibile")
  }
}
const spegniLampione = async(lampID) =>{
  const bright = await getBrightnessofLamp(lampID);
  let port = 4000 +parseInt(lampID) ;
  try {
    await axios.post("http://127.0.0.1:"+port+"/lamp",{brightness:0,lamp_status:false,lamp_id:" " +lampID},{
      headers: {
            'Content-Type': 'application/json'
        } })
      const  lampione=await Lampione.findByPk(lampID);
      //  lampione.update({luminosità_impostata:bright,stato:0})
      lampione.update({stato:0})
        return ("Lampione spento")
  } catch (error) {
    console.log(error)
    return("Lampione non raggiungibile")
  }
}
module.exports = {
    getAllLampsFromArea,
    getNumeroLampioni,
    getBrightnessofArea,
    eliminaLampione,
    aggiungiLampione,
    getOneLampione,
    modificaLampione,
    getAllLampsFromAreaCount,
    accendiLampioniArea,
    spegniLampioniArea,
    getBrightnessofLamp,
    spegniLampioniArea,
    accendiLampione,
    spegniLampione,
    getBrightnessRilevamento,
    accendiLampioniAreaRilevamento,
    getBrightnessManualeArea,
    accendiLampioniManualeArea,
    getLampIDtoPowerOn,
    getBrightnessManualeArea,
    setStatoSingoloLampione
}