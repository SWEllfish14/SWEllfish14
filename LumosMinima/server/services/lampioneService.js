const db = require("../models/index");
Lampione = db.lampioni;

const getAllLampsFromArea = async (id) => {
    const lampioni = await Lampione.findAll({
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
      return ("Area modificata")
  }

module.exports = {
    getAllLampsFromArea,
    getNumeroLampioni,
    eliminaLampione,
    aggiungiLampione,
    getOneLampione,
    modificaLampione
}