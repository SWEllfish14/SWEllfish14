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
    res.status(200).send(numeroAree)
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
    res.status(200).send(result)
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
    res.status(200).send(result)
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
  };

  const aggiungiArea = async (req, res) => {
    try{
      const result = await areaService.aggiungiArea(req.body);
      res.status(200).send(result)
    }catch (error){
      res.status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
    }
  };

  const modificaArea = async (req,res) => {
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
      const result = await areaService.modificaArea(req.body,id)
      res.status(200).send(result)
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
    modificaArea
  }