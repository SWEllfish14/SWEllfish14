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
      res.status(200).send(numeroSensori)
    }catch(error) {
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
      
    };

    module.exports = {
        getAllSensoriFromArea,
        getNumeroSensori
    }