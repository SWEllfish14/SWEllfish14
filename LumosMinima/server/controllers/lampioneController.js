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
    /*const aggiungiLampione = async (req, res) => {
      try{
        const result = await lampioneService.aggiungiLampione(req.body);
        res.status(200).send({result:result})
      }catch (error){
        res.status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } })
      }
    };
  */
    module.exports = {
        getAllLampsFromArea,
        eliminaLampione,
        getNumeroLampioni
    }