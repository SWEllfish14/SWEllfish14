const axios = require('axios');
const db = require("../models/index");
Lampione = db.lampioni;
Area = db.area;

const getAllLampsFromArea = async (id) => {
    const lampioni = await Lampione.findAll({
        where: {
            id_area_illuminata: id
        }
    });
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
    attributes: ['luminosità_manuale'],
      where: {
          ID: id
      }
  });

  return brightness[0].luminosità_manuale;
}




const getBrightnessofLamp = async (id) => {
  const brightness = await Lampione.findAll({
    attributes: ['luminosità_manuale'],
      where: {
          ID: id
      }
  });

  return brightness[0].luminosità_manuale;
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
    const result = await Lampione.destroy({
        where: {
            ID: id
        }
    })
    return result;
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
      if(stato){
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

    //console.log(bright);
    console.log(lampioni.length)

    for(let i = 0; i < lampioni.length; i++){
      console.log(lampioni[i])
        let port = 3000 + (lampioni[i]);
       console.log(port)
       await axios.post("http://127.0.0.1:"+port+"/lamp",{brightness:bright,lamp_status:true,lamp_id:" " +lampioni[i]},{
    headers: {
          'Content-Type': 'application/json'
      } })
         
     
      
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
          let port = 3000 + (lampioni[i]);
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
        //console.log(result)
      }

}



module.exports = {
    getAllLampsFromArea,
    getNumeroLampioni,
    eliminaLampione,
    aggiungiLampione,
    getOneLampione,
    modificaLampione,
    getAllLampsFromAreaCount,
    accendiLampioniArea,
    spegniLampioniArea,
    getBrightnessofLamp,
    spegniLampioniArea
}