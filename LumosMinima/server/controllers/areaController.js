areaService = require("../services/areaService")

const getAllAree= async (req, res) => {
  try{
    const allAree = await areaService.getAllAree();
    res.status(200).send(allAree)
  }catch(error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } })
  }
  };
const getNumeroAree= async (req, res) => {
  try{
    const numeroAree = await areaService.getNumeroAree();
    res.status(200).send({numeroAree:numeroAree})
  }catch(error) {
    res.status(error?.status || 500)
    .send({ status: "FAILED", data: { error: error?.message || error } })
  }
    
  };
const getFiveAree= async (req, res) => {
    try{
      const fiveAree = await areaService.getFiveAree();
      res.status(200).send(fiveAree)
    }catch (error){
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
  };
const getOneArea= async (req, res) => {
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
    const area = await areaService.getOneArea(id);
    res.status(200).send(area)
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
  };
const aumentaLuminositaArea= (req, res) => {
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
    result = areaService.aumentaLuminositaArea(id);
    res.status(200).send({result:result})
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
  };
const diminuisciLuminositaArea= (req, res) => {
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
    result = areaService.diminuisciLuminositaArea(id);
    res.status(200).send({result:result})
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
  };

  
  const aggiungiArea = async (req, res) => {
    console.log("chiamo funzione aggiunta da controller")
    try{
      console.log(req.body.citta)
      console.log(req.body.zonaGeografica)
      console.log(req.body.stato)
      console.log(req.body.modalita)
      console.log(req.body.luminositaDefault)
      console.log(req.body.luminositaRilevamento)
      const result = await areaService.aggiungiArea(req.body.citta, req.body.zonaGeografica, req.body.stato, req.body.modalita, req.body.luminositaDefault, req.body.luminositaRilevamento);
      res.status(200).send(result)
    }catch (error){
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
  };

  const modificaArea = async (req,res) => {
    const {
      params: { id,citta,zonaGeografica,stato,modalita,luminositaDefault,luminositaRilevamento },
    } = req;
    console.log("chiamo funzione modifica da controller")
    console.log(req.params.id)
    console.log(req.params.citta)
      console.log(req.params.zonaGeografica)
      console.log(req.params.stato)
      console.log(req.params.modalita)
      console.log(req.params.luminositaDefault)
      console.log(req.params.luminositaRilevamento)
    if (!id) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Parameter 'id' can not be empty" },
        });
    }
    try{
      
      const result = await areaService.modificaArea(id,citta,zonaGeografica,stato,modalita,luminositaDefault,luminositaRilevamento);
      res.status(200).send({result:result})
    }catch (error){
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
    
  }

  const eliminaArea = async  (req,res) => {
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
      const result = await areaService.eliminaArea(id)
      res.status(200).send({result:result})
    }catch (error){
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
  }


  const cambiaModalitaArea = async  (req,res) => {
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
      const result = await areaService.cambiaModalitaArea(id)
      res.status(200).send({result:result})
    }catch (error){
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
  }

  const accendiArea = async (req,res) => {
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
      const result = await areaService.accendiArea(id)
      res.status(200).send({result:result})
    }catch (error){
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
  }



  module.exports = {
    getAllAree,
    getNumeroAree,
    getFiveAree,
    getOneArea,
    aumentaLuminositaArea,
    diminuisciLuminositaArea,
    aggiungiArea,
    modificaArea,
    eliminaArea,
    cambiaModalitaArea,
    accendiArea
  }