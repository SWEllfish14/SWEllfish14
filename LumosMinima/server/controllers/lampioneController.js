lampioneService = require("../services/lampioneService")
    const getAllLampsFromArea = async (req,res) => {
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
            const allLamps = await lampioneService.getAllLampsFromArea(id);
            res.status(200).send(allLamps)
          }catch(error) {
            res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
          }
    }
  
  const getNumeroLampioni= async (req, res) => {
    try{
      const numeroLampioni = await lampioneService.getNumeroLampioni();
      res.status(200).send({numeroLampioni:numeroLampioni})
    }catch(error) {
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
      
    };

    const eliminaLampione = async(req, res) => {
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
            const result = await lampioneService.eliminaLampione(id)
            res.status(200).send({data:"Lampione eliminato"})
          } catch (error) {
            res
              .status(error?.status || 500)
              .send({ status: "FAILED", data: { error: error?.message || error } });
          }
    }
    const aggiungiLampione = async (req, res) => {
      console.log("aggiunta Lampione da controller")
      console.log(req.body.area)
      console.log(req.body.ip)
      console.log(req.body.stato)
      console.log(req.body.luminositaDefault)
      console.log(req.body.luminositaManuale)
      try{
        //const result = await lampioneService.aggiungiLampione(req.body);
        res.status(200).send({result:result})
      }catch (error){
        res.status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } })
      }
    };
    const getOneLampione= async (req, res) => {
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
        const area = await lampioneService.getOneLampione(id);
        res.status(200).send(area)
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
      };

    const modificaLampione = async (req,res) => {
      const {
        params: { ip,id,tipo_interazione,luminositaDefault,luminositaManuale,area,stato },
      } = req;
      console.log("chiamo funzione modifica lampione da controller")
      console.log(req.params.ip)
      console.log(req.params.id)
        console.log(req.params.tipo_interazione)
        console.log(req.params.luminositaDefault)
        console.log(req.params.luminositaManuale)
        console.log(req.params.area)
        console.log(req.params.stato)
      if (!id) {
        res
          .status(400)
          .send({
            status: "FAILED",
            data: { error: "Parameter 'id' can not be empty" },
          });
      }
      try{
        
        const result = await areaService.modificaLampione(ip,id,tipo_interazione,luminositaDefault,luminositaManuale,area,stato);
        res.status(200).send({result:result})
      }catch (error){
        res.status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } })
      }
      
    }
  
    module.exports = {
        getAllLampsFromArea,
        eliminaLampione,
        getNumeroLampioni,
        aggiungiLampione,
        modificaLampione,
        getOneLampione
    }