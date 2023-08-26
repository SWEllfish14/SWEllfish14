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


module.exports = {
    getAllGuasti,
    getNumeroGuasti,
    getOneGuasto
}