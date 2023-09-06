const sensoreController = require("../controllers/sensoreController");
const sensoreService = require("../services/sensoreService");

describe("sensore Controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getAllSensoriFromArea', () => {
    let req, res, spy;
  
    beforeEach(() => {
      req = {
        params: {
          id: 1
        },
      };
      res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      spy = jest.spyOn(sensoreService, 'getAllSensoriFromArea');
    });
  
    afterEach(() => {
      spy.mockRestore();
    });
  
    it('should get tutti i sensori di un area and return a success response when successful', async () => {
      const mockResult = { updated: true };
      spy.mockResolvedValue(mockResult);
  
      await sensoreController.getAllSensoriFromArea(req, res);
  
      expect(spy).toHaveBeenCalledWith(
        req.params.id,
      );
      expect(res.status).toHaveBeenCalledWith(200);
      //expect(res.send).toHaveBeenCalledWith({ result: mockResult });
    });
    it("should handle errors and return a 500 status for errors in getAllSensoriFromArea", async () => {
        const req = {
          params: {
            id: null,
          },
        };
    
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await sensoreController.getAllSensoriFromArea(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
          status: "FAILED",
          data: { error: "Parameter ':id' can not be empty" },
        });
      });
  
    it('should handle errors and return a 500 status for errors in getAllSensoriFromArea', async () => {
      const errorMessage = 'An error occurred';
      spy.mockRejectedValue(new Error(errorMessage));
  
      await sensoreController.getAllSensoriFromArea(req, res);
  
      expect(spy).toHaveBeenCalledWith(
        req.params.id,
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
    });
  
    // Add more test cases as needed for different scenarios
  })

  it("should return the number of sensori of an area when successful", async () => {
    const req = {
        params: {
          id: 1,
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
    const mockNumerSensoriArea = 42;
    const spy = jest
      .spyOn(sensoreService, "getNumeroSensoriAreaCount")
      .mockResolvedValue(mockNumerSensoriArea);

   

    await sensoreController.getNumeroSensoriAreaCount(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.send).toHaveBeenCalledWith({ numeroSenori: mockNumerSensoriArea });

    spy.mockRestore();
  });
  it("should return an error when getNumeroSensoriAreaCount throws an error", async () => {
    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const errorMessage = "An error occurred";
    const getAllLampsSpy = jest.spyOn(sensoreService, "getNumeroSensoriAreaCount");
    getAllLampsSpy.mockRejectedValue(new Error(errorMessage));

    await sensoreController.getNumeroSensoriAreaCount(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });
  });

  it("should return the number of senori  when successful", async () => {
    const req = {
    
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
  
    const mockNumerSensori = 42;
    const spy = jest
      .spyOn(sensoreService, "getNumeroSensori")
      .mockResolvedValue(mockNumerSensori);

   

    await sensoreController.getNumeroSensori(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.send).toHaveBeenCalledWith({ numeroSensori: mockNumerSensori });

    spy.mockRestore();
  });
  it("should return an error when getNumeroSensori throws an error", async () => {
    const req = {
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const errorMessage = "An error occurred";
    const getAllLampsSpy = jest.spyOn(sensoreService, "getNumeroSensori");
    getAllLampsSpy.mockRejectedValue(new Error(errorMessage));

    await sensoreController.getNumeroSensori(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });
  });

  it("should return the number of sensori when successful", async () => {
    const mockNumeroSensori = 42;
    const spy = jest
      .spyOn(sensoreService, "getNumeroSensori")
      .mockResolvedValue(mockNumeroSensori);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await sensoreController.getNumeroSensori(req, res);

    expect(spy).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.send).toHaveBeenCalledWith({ numeroLampioni: mockNumeroSensori });

    spy.mockRestore();
  });

  it("should handle errors and return a 500 status for errors in getNumeroSensori", async () => {
    const errorMessage = "An error occurred";
    const spy = jest
      .spyOn(sensoreService, "getNumeroSensori")
      .mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await sensoreController.getNumeroSensori(req, res);

    expect(spy).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });

    spy.mockRestore();
  });

  
  it("should return a sensore when a valid ID is provided", async () => {
    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const sampleSensore = {
      id: 1,
      ip: "4.5.6.67",
    };
    const getOneLampioneSpy = jest.spyOn(sensoreService, "getOneSensore");
    getOneLampioneSpy.mockResolvedValue(sampleSensore);

    await sensoreController.getOneSensore(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.send).toHaveBeenCalledWith(sampleLampione);
    expect(getOneLampioneSpy).toHaveBeenCalled();
  });

  it("should return an error when an invalid ID is provided in getOneSensore", async () => {
    const req = {
      params: {
        id: null,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await sensoreController.getOneSensore(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: "Parameter ':id' can not be empty" },
    });
  });
  it("should return an error when getOneSensore throws an error", async () => {
    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const errorMessage = "An error occurred";
    const getOneLampioneSpy = jest.spyOn(sensoreService, "getOneSensore");
    getOneLampioneSpy.mockRejectedValue(new Error(errorMessage));

    await sensoreController.getOneSensore(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });
  });

  describe('eliminaSensore', () => {
    let req, res, spy;
  
    beforeEach(() => {
      req = {
        params: {
          id: 2,
        },
      };
      res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      spy = jest.spyOn(sensoreService, 'eliminaSensore');
    });
  
    afterEach(() => {
      spy.mockRestore();
    });
  
    it('should delete a sensore and return a success response when successful', async () => {
      const mockResult = { deleted: true };
      spy.mockResolvedValue(mockResult);
  
      await sensoreController.eliminaSensore(req, res);
  
      expect(spy).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ result: mockResult });
    });
  
    it('should handle errors and return a 500 status for errors in eliminaSensore', async () => {
      const errorMessage = 'An error occurred';
      spy.mockRejectedValue(new Error(errorMessage));
  
      await sensoreController.eliminaSensore(req, res);
  
      expect(spy).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
    });
  
    it('should return a 400 status and error message if id is missing in eliminaSensore', async () => {
      req.params.id = undefined;
  
      await sensoreController.eliminaSensore(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        status: 'FAILED',
        data: { error: "Parameter 'id' can not be empty" },
      });
    });
  
    // Add more test cases as needed for different scenarios
  });

  describe('modificaSensore', () => {
    let req, res, spy;
  
    beforeEach(() => {
      req = {
        params: {
          id: 1,
          ip: 'Baku',
          polling_time: 10,
          raggio_azione: 4,
          zona_geografica: "panchina",
          tipo_interazione: "PUSH"
          

        },
      };
      res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      spy = jest.spyOn(sensoreService, 'modificaSensore');
    });
  
    afterEach(() => {
      spy.mockRestore();
    });
  
    it('should modify a sensore and return a success response when successful', async () => {
      const mockResult = { updated: true };
      spy.mockResolvedValue(mockResult);
  
      await sensoreController.modificaSensore(req, res);
  
      expect(spy).toHaveBeenCalledWith(
        req.params.id,
        req.params.ip,
        req.params.polling_time,
        req.params.raggio_azione,
        req.params.zona_geografica,
        req.params.tipo_interazione
        
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ result: mockResult });
    });
  
    it('should handle errors and return a 500 status for errors in modificaSensore', async () => {
      const errorMessage = 'An error occurred';
      spy.mockRejectedValue(new Error(errorMessage));
  
      await sensoreController.modificaSensore(req, res);
  
      expect(spy).toHaveBeenCalledWith(
        req.params.id,
        req.params.ip,
        req.params.polling_time,
        req.params.raggio_azione,
        req.params.zona_geografica,
        req.params.tipo_interazione
        
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
    });
  
  
    // Add more test cases as needed for different scenarios
  });

  describe('aggiungiSensore', () => {
    let req, res, spy;
  
    beforeEach(() => {
      req = {
        params: {
          ip: 'Baku',
          polling: 10,
          zona_geografica: "panchina",
          tipo_interazione: "PUSH",
          raggio_azione: 4,
          id_area: 2
        },
      };
      res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      spy = jest.spyOn(sensoreService, 'aggiungiSensore');
    });
  
    afterEach(() => {
      spy.mockRestore();
    });
  
    it('should aggiungere a sensore and return a success response when successful', async () => {
      const mockResult = { updated: true };
      spy.mockResolvedValue(mockResult);
  
      await sensoreController.aggiungiSensore(req, res);
  
      expect(spy).toHaveBeenCalledWith(
        req.params.id_area,
        req.params.ip,
        req.params.polling,
        req.params.raggio_azione,
        req.params.zona_geografica,
        req.params.tipo_interazione
        
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ result: mockResult });
    });
  
    it('should handle errors and return a 500 status for errors in aggiungiSensore', async () => {
      const errorMessage = 'An error occurred';
      spy.mockRejectedValue(new Error(errorMessage));
  
      await sensoreController.aggiungiSensore(req, res);
  
      expect(spy).toHaveBeenCalledWith(
        req.params.id_area,
        req.params.ip,
        req.params.polling,
        req.params.raggio_azione,
        req.params.zona_geografica,
        req.params.tipo_interazione
        
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
    });
  
  
    // Add more test cases as needed for different scenarios
  });

})