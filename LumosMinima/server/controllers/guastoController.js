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
      

      const chiudiGuasto = async  (req,res) => {
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
          const result = await guastoService.chiudiGuasto(id)
          res.status(200).send({result:result})
        }catch (error){
          res.status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } })
        }
      }

      const modificaGuasto = async (req,res) => {
        const {
          params: {id, new_stato, new_note, new_id_area_illuminata },
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
          const result = await guastoService.modificaGuasto( id, new_stato, new_note, new_id_area_illuminata);
          res.status(200).send({result:result})
        }catch (error){
          res.status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } })
        }
        
      }

      const aggiungiGuasto = async (req, res) => {
        console.log("chiamo funzione aggiunta da controller")
        try{
          console.log(req.body.dataRilevamento)
          console.log(req.body.stato)
          console.log(req.body.note)
          console.log(req.body.id_area)
          const result = await guastoService.aggiungiGuasto(req.body.dataRilevamento, req.body.stato, req.body.note, req.body.id_area);
          res.status(200).send(result)
        }catch (error){
          res.status(error?.status || 500)
          .send({ status: "FAILED", data: { error: error?.message || error } })
        }
      };

    module.exports = {
        getAllGuasti,
        getNumeroGuasti,
        getOneGuasto,
        chiudiGuasto,
        modificaGuasto,
        aggiungiGuasto
    }