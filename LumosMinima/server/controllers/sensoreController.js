sensoreService = require("../services/sensoreService")
    const getAllSensoriFromArea = async (req,res) => {
        const {
            params: { id },
          } = req;
          if (!id) {
            res
              .status(400)
              .send({
                status: "FAILED",
                data: { error: "Parameter ':id' can not be empty" },
              });
          }
        try{
            const allSensori = await sensoreService.getAllSensoriFromArea(id);
            res.status(200).send(allSensori)
          }catch(error) {
            res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
          }
    }
  
  const getNumeroSensori= async (req, res) => {
    try{
      const numeroSensori = await sensoreService.getNumeroSensori();
      res.status(200).send({numeroSensori:numeroSensori})
    }catch(error) {
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
      
    };

    const aggiungiSensore = async (req, res) => {
      console.log("aggiunta sensore da controller")
      console.log(req.body.id_area)
      console.log(req.body.polling)
      console.log(req.body.ip)
      console.log(req.body.raggio_azione)
      console.log(req.body.tipo_interazione)
      try{
        const result = await sensoreService.aggiungiSensore(req.body.ip,req.body.polling,req.body.zona_geografica,req.body.tipo_interazione,req.body.raggio_azione,req.body.id_area);
        res.status(200).send({result:result})
      }catch (error){
        res.status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } })
      }
    };

    const modificaSensore = async (req, res) => {
      console.log("modifica sensore da controller")
      console.log(req.body.id)
      console.log(req.body.ip)
      console.log(req.body.polling_time)
      console.log(req.body.raggio_azione)
      console.log(req.body.tipo_interazione)
      try{
        const result = await sensoreService.modificaSensore(req.body);
        res.status(200).send({result:result})
      }catch (error){
        res.status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } })
      }
    };

    const getOneSensore= async (req, res) => {
      const {
        params: { id },
      } = req;
      if (!id) {
        res
          .status(400)
          .send({
            status: "FAILED",
            data: { error: "Parameter ':id' can not be empty" },
          });
      }
      try {
        const sensore = await sensoreService.getOneSensore(id);
        res.status(200).send(sensore)
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
      };
    module.exports = {
        getAllSensoriFromArea,
        getNumeroSensori,
        aggiungiSensore,
        modificaSensore,
        getOneSensore
    }