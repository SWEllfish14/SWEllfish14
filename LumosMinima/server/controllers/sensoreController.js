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

    const getNumeroSensoriAreaCount= async (req, res) => {
      const {
        params: { id },
      } = req;
      try{
        const numeroSensori = await sensoreService.getNumeroSensoriAreaCount(id);
        res.status(200).send({numeroSensori:numeroSensori})
      }catch(error) {
        res.status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } })
      }
      };

  
  
  const getNumeroSensori= async (req, res) => {
    try{
      const numeroSensori = await sensoreService.getNumeroSensori();
      res.status(200).send({numeroSensori:numeroSensori})
    }catch(error) {
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
      
    };

    
  const eliminaSensore = async  (req,res) => {
    const {
      params: { id },
    } = req;
    if (!id) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter 'id' can not be empty" },
        });
    }
    try{
      const result = await sensoreService.eliminaSensore(id)
      res.status(200).send({result:result})
    }catch (error){
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
  }
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
      const {
        params: { id,ip,polling_time,zona_geografica,tipo_interazione,raggio_azione },
      } = req;
      console.log("modifica sensore da controller")
      console.log(req.params.id)
      console.log(req.params.ip)
      console.log(req.params.polling_time)
      console.log(req.params.raggio_azione)
      console.log(req.params.tipo_interazione)
      console.log(req.params.zona_geografica)
      try{
        const result = await sensoreService.modificaSensore(id,ip,polling_time,zona_geografica,tipo_interazione,raggio_azione);
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
        getOneSensore,
        eliminaSensore,
        getNumeroSensoriAreaCount
    }