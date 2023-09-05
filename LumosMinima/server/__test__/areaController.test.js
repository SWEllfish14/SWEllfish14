const areaController = require("../controllers/areaController");
const areaService = require("../services/areaService");

describe("Area Controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("getAllAree should return all areas", async () => {
    const mockAreas = [
      { id: 1, name: "Area 1" },
      { id: 2, name: "Area 2" },
    ];
    const getAllAreeSpy = jest.spyOn(areaService, "getAllAree");
    getAllAreeSpy.mockResolvedValue(mockAreas);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await areaController.getAllAree(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockAreas);
    expect(getAllAreeSpy).toHaveBeenCalled();
  });
  it("should handle errors and return a 500 status for errors", async () => {
    const errorMessage = "An error occurred";
    const spy = jest
      .spyOn(areaService, "getAllAree")
      .mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await areaController.getAllAree(req, res);

    expect(spy).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });

    spy.mockRestore();
  });
  it("should return an area when a valid ID is provided", async () => {
    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const sampleArea = {
      id: 1,
      name: "Sample Area",
    };
    const getOneAreaSpy = jest.spyOn(areaService, "getOneArea");
    getOneAreaSpy.mockResolvedValue(sampleArea);

    await areaController.getOneArea(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(sampleArea);
    expect(getOneAreaSpy).toHaveBeenCalled();
  });

  it("should return an error when an invalid ID is provided", async () => {
    const req = {
      params: {
        id: null,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await areaController.getOneArea(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: "Parameter ':id' can not be empty" },
    });
  });

  it("should return an error when areaService throws an error", async () => {
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
    const getOneAreaSpy = jest.spyOn(areaService, "getOneArea");
    getOneAreaSpy.mockRejectedValue(new Error(errorMessage));

    await areaController.getOneArea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });
  });

  it("should add an area and return the result when valid data is provided", async () => {
    const req = {
      body: {
        citta: "Sample City",
        zonaGeografica: "Sample Zone",
        stato: "Sample State",
        modalita: "Sample Mode",
        luminositaDefault: 50,
        luminositaRilevamento: 75,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const sampleResult = {
      message: "Area added successfully",
    };
    const aggiungiAreaSpy = jest.spyOn(areaService, "aggiungiArea");
    aggiungiAreaSpy.mockResolvedValue(sampleResult);

    await areaController.aggiungiArea(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(sampleResult);
  });

  it("should return an error when invalid data is provided", async () => {
    const req = {
      body: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await areaController.aggiungiArea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
  it("should return the number of areas when successful", async () => {
    const mockNumeroAree = 42;
    const spy = jest
      .spyOn(areaService, "getNumeroAree")
      .mockResolvedValue(mockNumeroAree);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await areaController.getNumeroAree(req, res);

    expect(spy).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ numeroAree: mockNumeroAree });

    spy.mockRestore();
  });

  it("should handle errors and return a 500 status for errors", async () => {
    const errorMessage = "An error occurred";
    const spy = jest
      .spyOn(areaService, "getNumeroAree")
      .mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await areaController.getNumeroAree(req, res);

    expect(spy).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });

    spy.mockRestore();
  });
  it("should return an error when areaService throws an error", async () => {
    const req = {
      body: {
        citta: "Sample City",
        zonaGeografica: "Sample Zone",
        stato: "Sample State",
        modalita: "Sample Mode",
        luminositaDefault: 1,
        luminositaRilevamento: 10,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const errorMessage = "An error occurred";
    const aggiungiAreaSpy = jest.spyOn(areaService, "aggiungiArea");
    aggiungiAreaSpy.mockRejectedValue(new Error(errorMessage));

    await areaController.aggiungiArea(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });
  });

  it("should return the max area ID when successful", async () => {
    const mockIDAreeMax = 42; // Replace with your desired mock value
    const spy = jest
      .spyOn(areaService, "getIDAreeMax")
      .mockResolvedValue(mockIDAreeMax);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await areaController.getIDAreeMax(req, res);

    expect(spy).toHaveBeenCalledWith(); // Check if areaService.getIDAreeMax was called
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockIDAreeMax);

    spy.mockRestore(); // Restore the original implementation of areaService.getIDAreeMax
  });

  it("should handle errors and return a 500 status for errors", async () => {
    const errorMessage = "An error occurred";
    const spy = jest
      .spyOn(areaService, "getIDAreeMax")
      .mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await areaController.getIDAreeMax(req, res);

    expect(spy).toHaveBeenCalledWith(); // Check if areaService.getIDAreeMax was called
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });

    spy.mockRestore(); // Restore the original implementation of areaService.getIDAreeMax
  });

  it('should return five areas when successful', async () => {
    const mockFiveAree = [/* Replace with an array of five mock areas */];
    const spy = jest.spyOn(areaService, 'getFiveAree').mockResolvedValue(mockFiveAree);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await areaController.getFiveAree(req, res);

    expect(spy).toHaveBeenCalledWith(); // Check if areaService.getFiveAree was called
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockFiveAree);

    spy.mockRestore(); // Restore the original implementation of areaService.getFiveAree
  });

  it('should handle errors and return a 500 status for errors', async () => {
    const errorMessage = 'An error occurred';
    const spy = jest.spyOn(areaService, 'getFiveAree').mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await areaController.getFiveAree(req, res);

    expect(spy).toHaveBeenCalledWith(); // Check if areaService.getFiveAree was called
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });

    spy.mockRestore(); // Restore the original implementation of areaService.getFiveAree
  });

  
});
describe('aumentaLuminositaArea', () => {
    let req, res, mockAreaId, spy;
  
    beforeEach(() => {
      mockAreaId = 'mockAreaId';
      req = { params: { id: mockAreaId } };
      res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      spy = jest.spyOn(areaService, 'aumentaLuminositaArea');
    });
  
    afterEach(() => {
      spy.mockRestore();
    });
  
    it('should increase brightness and return a success response when successful', async () => {
      spy.mockResolvedValue(true);
  
      await areaController.aumentaLuminositaArea(req, res);
  
      expect(spy).toHaveBeenCalledWith(mockAreaId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ result: true });
    });
  
    it('should handle errors and return a 500 status for errors', async () => {
      const errorMessage = 'An error occurred';
      spy.mockRejectedValue(new Error(errorMessage));
  
      await areaController.aumentaLuminositaArea(req, res);
  
      expect(spy).toHaveBeenCalledWith(mockAreaId);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
    });
  
    it('should return a 400 status and error message if id is missing', async () => {
      req.params.id = undefined;
  
      await areaController.aumentaLuminositaArea(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        status: 'FAILED',
        data: { error: "Parameter ':id' can not be empty" },
      });
    });
  });
  describe('diminuisciLuminositaArea', () => {
    let req, res, mockAreaId, spy;
  
    beforeEach(() => {
      mockAreaId = 'mockAreaId';
      req = { params: { id: mockAreaId } };
      res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      spy = jest.spyOn(areaService, 'diminuisciLuminositaArea');
    });
  
    afterEach(() => {
      spy.mockRestore();
    });
  
    it('should decrease brightness and return a success response when successful', async () => {
      spy.mockResolvedValue(true);
  
      await areaController.diminuisciLuminositaArea(req, res);
  
      expect(spy).toHaveBeenCalledWith(mockAreaId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ result: true });
    });
  
    it('should handle errors and return a 500 status for errors', async () => {
      const errorMessage = 'An error occurred';
      spy.mockRejectedValue(new Error(errorMessage));
  
      await areaController.diminuisciLuminositaArea(req, res);
  
      expect(spy).toHaveBeenCalledWith(mockAreaId);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
    });
  
    it('should return a 400 status and error message if id is missing', async () => {
      req.params.id = undefined;
  
      await areaController.diminuisciLuminositaArea(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        status: 'FAILED',
        data: { error: "Parameter ':id' can not be empty" },
      });
    });

    describe('aggiungiArea', () => {
        let req, res, spy;
      
        beforeEach(() => {
          req = {
            body: {
              citta: 'mockCitta',
              zonaGeografica: 'mockZona',
              stato: 'mockStato',
              modalita: 'mockModalita',
              luminositaDefault: 50,
              luminositaRilevamento: 60,
            },
          };
          res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
          spy = jest.spyOn(areaService, 'aggiungiArea');
        });
      
        afterEach(() => {
          spy.mockRestore();
        });
      
        it('should add an area and return a success response when successful', async () => {
          const mockResult = { areaId: 'mockAreaId' };
          spy.mockResolvedValue(mockResult);
      
          await areaController.aggiungiArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(
            req.body.citta,
            req.body.zonaGeografica,
            req.body.stato,
            req.body.modalita,
            req.body.luminositaDefault,
            req.body.luminositaRilevamento
          );
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith(mockResult);
        });
      
        it('should handle errors and return a 500 status for errors', async () => {
          const errorMessage = 'An error occurred';
          spy.mockRejectedValue(new Error(errorMessage));
      
          await areaController.aggiungiArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(
            req.body.citta,
            req.body.zonaGeografica,
            req.body.stato,
            req.body.modalita,
            req.body.luminositaDefault,
            req.body.luminositaRilevamento
          );
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
        });
      
        // Add more test cases as needed for different scenarios
      });

      
      describe('modificaArea', () => {
        let req, res, spy;
      
        beforeEach(() => {
          req = {
            params: {
              id: 'mockAreaId',
              citta: 'mockCitta',
              zonaGeografica: 'mockZona',
              stato: 'mockStato',
              modalita: 'mockModalita',
              luminositaDefault: 50,
              luminositaRilevamento: 60,
            },
          };
          res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
          spy = jest.spyOn(areaService, 'modificaArea');
        });
      
        afterEach(() => {
          spy.mockRestore();
        });
      
        it('should modify an area and return a success response when successful', async () => {
          const mockResult = { updated: true };
          spy.mockResolvedValue(mockResult);
      
          await areaController.modificaArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(
            req.params.id,
            req.params.citta,
            req.params.zonaGeografica,
            req.params.stato,
            req.params.modalita,
            req.params.luminositaDefault,
            req.params.luminositaRilevamento
          );
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ result: mockResult });
        });
      
        it('should handle errors and return a 500 status for errors', async () => {
          const errorMessage = 'An error occurred';
          spy.mockRejectedValue(new Error(errorMessage));
      
          await areaController.modificaArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(
            req.params.id,
            req.params.citta,
            req.params.zonaGeografica,
            req.params.stato,
            req.params.modalita,
            req.params.luminositaDefault,
            req.params.luminositaRilevamento
          );
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
        });
      
        it('should return a 400 status and error message if id is missing', async () => {
          req.params.id = undefined;
      
          await areaController.modificaArea(req, res);
      
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.send).toHaveBeenCalledWith({
            status: 'FAILED',
            data: { error: "Parameter 'id' can not be empty" },
          });
        });
      
        // Add more test cases as needed for different scenarios
      });

      
      describe('eliminaArea', () => {
        let req, res, spy;
      
        beforeEach(() => {
          req = {
            params: {
              id: 'mockAreaId',
            },
          };
          res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
          spy = jest.spyOn(areaService, 'eliminaArea');
        });
      
        afterEach(() => {
          spy.mockRestore();
        });
      
        it('should delete an area and return a success response when successful', async () => {
          const mockResult = { deleted: true };
          spy.mockResolvedValue(mockResult);
      
          await areaController.eliminaArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(req.params.id);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ result: mockResult });
        });
      
        it('should handle errors and return a 500 status for errors', async () => {
          const errorMessage = 'An error occurred';
          spy.mockRejectedValue(new Error(errorMessage));
      
          await areaController.eliminaArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(req.params.id);
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
        });
      
        it('should return a 400 status and error message if id is missing', async () => {
          req.params.id = undefined;
      
          await areaController.eliminaArea(req, res);
      
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.send).toHaveBeenCalledWith({
            status: 'FAILED',
            data: { error: "Parameter 'id' can not be empty" },
          });
        });
      
        // Add more test cases as needed for different scenarios
      });

      
      describe('cambiaModalitaArea', () => {
        let req, res, spy;
      
        beforeEach(() => {
          req = {
            params: {
              id: 'mockAreaId',
            },
          };
          res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
          spy = jest.spyOn(areaService, 'cambiaModalitaArea');
        });
      
        afterEach(() => {
          spy.mockRestore();
        });
      
        it('should change the mode of an area and return a success response when successful', async () => {
          const mockResult = { modeChanged: true };
          spy.mockResolvedValue(mockResult);
      
          await areaController.cambiaModalitaArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(req.params.id);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ result: mockResult });
        });
      
        it('should handle errors and return a 500 status for errors', async () => {
          const errorMessage = 'An error occurred';
          spy.mockRejectedValue(new Error(errorMessage));
      
          await areaController.cambiaModalitaArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(req.params.id);
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
        });
      
        it('should return a 400 status and error message if id is missing', async () => {
          req.params.id = undefined;
      
          await areaController.cambiaModalitaArea(req, res);
      
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.send).toHaveBeenCalledWith({
            status: 'FAILED',
            data: { error: "Parameter 'id' can not be empty" },
          });
        });
      
        // Add more test cases as needed for different scenarios
      });

      
      describe('accendiArea', () => {
        let req, res, spy;
      
        beforeEach(() => {
          req = {
            params: {
              id: 'mockAreaId',
            },
          };
          res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
          spy = jest.spyOn(areaService, 'accendiArea');
        });
      
        afterEach(() => {
          spy.mockRestore();
        });
      
        it('should turn on an area and return a success response when successful', async () => {
          const mockResult = { areaTurnedOn: true };
          spy.mockResolvedValue(mockResult);
      
          await areaController.accendiArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(req.params.id);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ result: mockResult });
        });
      
        it('should handle errors and return a 500 status for errors', async () => {
          const errorMessage = 'An error occurred';
          spy.mockRejectedValue(new Error(errorMessage));
      
          await areaController.accendiArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(req.params.id);
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
        });
      
        it('should return a 400 status and error message if id is missing', async () => {
          req.params.id = undefined;
      
          await areaController.accendiArea(req, res);
      
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.send).toHaveBeenCalledWith({
            status: 'FAILED',
            data: { error: "Parameter 'id' can not be empty" },
          });
        });
      
        // Add more test cases as needed for different scenarios
      });

      
      describe('accendiAllAree', () => {
        let req, res, spy;
      
        beforeEach(() => {
          req = {};
          res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
          spy = jest.spyOn(areaService, 'accendiAllAree');
        });
      
        afterEach(() => {
          spy.mockRestore();
        });
      
        it('should turn on all areas and return a success response when successful', async () => {
          const mockResult = { allAreasTurnedOn: true };
          spy.mockResolvedValue(mockResult);
      
          await areaController.accendiAllAree(req, res);
      
          expect(spy).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ result: mockResult });
        });
      
        it('should handle errors and return a 500 status for errors', async () => {
          const errorMessage = 'An error occurred';
          spy.mockRejectedValue(new Error(errorMessage));
      
          await areaController.accendiAllAree(req, res);
      
          expect(spy).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
        });
      
        // Add more test cases as needed for different scenarios
      });

      describe('spegniAllAree', () => {
        let req, res, spy;
      
        beforeEach(() => {
          req = {};
          res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
          spy = jest.spyOn(areaService, 'spegniAllAree');
        });
      
        afterEach(() => {
          spy.mockRestore();
        });
      
        it('should turn off all areas and return a success response when successful', async () => {
          const mockResult = { allAreasTurnedOff: true };
          spy.mockResolvedValue(mockResult);
      
          await areaController.spegniAllAree(req, res);
      
          expect(spy).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ result: mockResult });
        });
      
        it('should handle errors and return a 500 status for errors', async () => {
          const errorMessage = 'An error occurred';
          spy.mockRejectedValue(new Error(errorMessage));
      
          await areaController.spegniAllAree(req, res);
      
          expect(spy).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
        });
      
        // Add more test cases as needed for different scenarios
      });

      describe('spegniArea', () => {
        let req, res, mockAreaId, spy;
      
        beforeEach(() => {
          mockAreaId = 'mockAreaId';
          req = { params: { id: mockAreaId } };
          res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
          spy = jest.spyOn(areaService, 'spegniArea');
        });
      
        afterEach(() => {
          spy.mockRestore();
        });
      
        it('should turn off the specified area and return a success response when successful', async () => {
          const mockResult = { areaTurnedOff: true };
          spy.mockResolvedValue(mockResult);
      
          await areaController.spegniArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(mockAreaId);
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith({ result: mockResult });
        });
      
        it('should handle errors and return a 500 status for errors', async () => {
          const errorMessage = 'An error occurred';
          spy.mockRejectedValue(new Error(errorMessage));
      
          await areaController.spegniArea(req, res);
      
          expect(spy).toHaveBeenCalledWith(mockAreaId);
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
        });
      
        it('should return a 400 status and error message if id is missing', async () => {
          req.params.id = undefined;
      
          await areaController.spegniArea(req, res);
      
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.send).toHaveBeenCalledWith({
            status: 'FAILED',
            data: { error: "Parameter 'id' can not be empty" },
          });
        });
      });
      
  });
  