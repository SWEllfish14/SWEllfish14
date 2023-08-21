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
    const {id,ip,tipo_interazione,luminosità_default,luminositaRilevamento,modalita,stato, id_area} =data
    const newLampione = await Lampione.create({ ID: id, IP:ip,tipo_interazione:tipo_interazione,luminosità_default:luminosità_default,luminosità_impostata:luminositaRilevamento,stato:stato,id_area_illuminata:id_area})
    return("Lampione aggiunto");
  }

module.exports = {
    getAllLampsFromArea,
    getNumeroLampioni,
    eliminaLampione,
    aggiungiLampione
}