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
      const numeroAree = await guastoService.getNumeroGuasti();
      res.status(200).send(numeroAree)
    }catch(error) {
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
      
    };

    module.exports = {
        getAllGuasti,
        getNumeroGuasti
    }