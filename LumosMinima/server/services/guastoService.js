const { raw } = require("express");
const db = require("../models/index");
Guasto = db.guasti;
Area = db.aree;
const getAllGuasti = async () => {
  const guasti = await Guasto.findAll(
    {
      order : [["data_rilevamento", "DESC"]],
      include: [
        {
            
                model: Area,
                as: 'area',
                attributes: ['città','zona_geografica_città']
      }  ],
          raw:true
         
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

const eliminaGuasto = async(id) =>{
  guasto = await Guasto.findOne({
    where: {
      id: id,
    },
 });
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

module.exports = {
    getAllGuasti,
    getNumeroGuasti,
    getOneGuasto,
    eliminaGuasto,
    modificaGuasto
}