guastoService = require("../services/guastoService")

const getAllGuasti= async (req, res) => {
    try{
      const allAree = await guastoService.getAllGuasti();
      res.status(200).send(allAree)
    }catch(error) {
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
    };
  const getNumeroGuasti= async (req, res) => {
    try{
      const numeroGuasti = await guastoService.getNumeroGuasti();
      res.status(200).send({numeroGuasti:numeroGuasti})
    }catch(error) {
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
      
    };

    const getOneGuasto= async (req, res) => {
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
        const guasto = await guastoService.getOneGuasto(id);
        res.status(200).send(guasto)
      } catch (error) {
        res
          .status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
      };
      

      const eliminaGuasto = async  (req,res) => {
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
          const result = await guastoService.eliminaGuasto(id)
          res.status(200).send({result:result})
        }catch (error){
          res.status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } })
        }
      }

      const modificaGuasto = async (req,res) => {
        const {
          params: {id, new_data_rilevamento, new_stato, new_id_area_illuminata },
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
          const result = await guastoService.modificaGuasto( id, new_data_rilevamento, new_stato, new_id_area_illuminata);
          res.status(200).send({result:result})
        }catch (error){
          res.status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } })
        }
        
      }

    module.exports = {
        getAllGuasti,
        getNumeroGuasti,
        getOneGuasto,
        eliminaGuasto,
        modificaGuasto
    }