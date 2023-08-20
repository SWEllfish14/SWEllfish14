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

const aggiungiLampione = async(data) =>{
    //const {id,ip,tipo_interazione,luminosità_default,luminositaRilevamento,modalita,stato} =data
    //const newArea = await Area.create({ ID: id,città:citta,zona_geografica_città:zonaGeografica,modalità_funzionamento:modalita,stato:stato,luminosità_standard:luminositaDefault,luminosità_rilevamento:luminositaRilevamento,luminosità_manuale:0})
    return("Lampione aggiunto");
  }
  
module.exports = {
    getAllLampsFromArea,
    getNumeroLampioni,
    eliminaLampione,
    aggiungiLampione
}