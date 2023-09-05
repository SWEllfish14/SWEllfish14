const guastoController = require("../controllers/guastoController");
const guastoService = require("../services/guastoService");

describe("Guasto Controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("getAllGuastiAperti should return all guasti aperti", async () => {
    const mockGuasti = [
      { id: 1, data_rilevamento: "2023-05-09" },
      { id: 2, data_rilevamento: "2023-09-05" },
    ];
    const getAllGuastiApertiSpy = jest.spyOn(guastoService, "getAllGuastiAperti");
    getAllGuastiApertiSpy.mockResolvedValue(mockGuasti);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await guastoController.getAllGuastiAperti(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockGuasti);
    expect(getAllGuastiApertiSpy).toHaveBeenCalled();
  });

  it("should handle errors and return a 500 status for errors for getAllGuastiAperti", async () => {
    const errorMessage = "An error occurred";
    const spy = jest
      .spyOn(guastoService, "getAllGuastiAperti")
      .mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await guastoController.getAllGuastiAperti(req, res);

    expect(spy).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });

    spy.mockRestore();
  });
  
  it("getAllGuastiChiusi should return all guasti chiusi", async () => {
    const mockGuasti = [
      { id: 1, data_rilevamento: "2023-05-09" },
      { id: 2, data_rilevamento: "2023-09-05" },
    ];
    const getAllGuastiChiusiSpy = jest.spyOn(guastoService, "getAllGuastiChiusi");
    getAllGuastiChiusiSpy.mockResolvedValue(mockGuasti);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await guastoController.getAllGuastiChiusi(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockGuasti);
    expect(getAllGuastiChiusiSpy).toHaveBeenCalled();
  });
  it("should handle errors and return a 500 status for errors for getAllGuastiChiusi", async () => {
    const errorMessage = "An error occurred";
    const spy = jest
      .spyOn(guastoService, "getAllGuastiChiusi")
      .mockRejectedValue(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await guastoController.getAllGuastiChiusi(req, res);

    expect(spy).toHaveBeenCalledWith();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });

    spy.mockRestore();
  });

  it("should return a guasto when a valid ID is provided", async () => {
    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const sampleGuasto = {
      id: 1,
      data_rilevamento: "2023-09-05",
    };
    const getOneGuastoSpy = jest.spyOn(guastoService, "getOneGuasto");
    getOneGuastoSpy.mockResolvedValue(sampleGuasto);

    await guastoController.getOneGuasto(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(sampleGuasto);
    expect(getOneGuastoSpy).toHaveBeenCalled();
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

    await guastoController.getOneGuasto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: "Parameter ':id' can not be empty" },
    });
  });
  it("should return an error when getOneGuasto throws an error", async () => {
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
    const getOneGuastoSpy = jest.spyOn(guastoService, "getOneGuasto");
    getOneGuastoSpy.mockRejectedValue(new Error(errorMessage));

    await guastoController.getOneGuasto(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "FAILED",
      data: { error: errorMessage },
    });
  });

  it("should add a guasto and return the result when valid data is provided in aggiungiGuasto", async () => {
    const req = {
      body: {
        dataRilevamento: "2023-09-05",
        stato: 0,
        note: "Sample note",
        id_area: 1
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const sampleResult = {
      message: "Guasto added successfully",
    };
    const aggiungiGuastoSpy = jest.spyOn(guastoService, "aggiungiGuasto");
    aggiungiGuastoSpy.mockResolvedValue(sampleResult);

    await guastoController.aggiungiGuasto(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(sampleResult);
  });

  it("should return an error when invalid data is provided in aggiungiGuasto", async () => {
    const req = {
      body: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await guastoController.aggiungiGuasto(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
  describe('modificaGuasto', () => {
    let req, res, spy;
  
    beforeEach(() => {
      req = {
        params: {
          id: 1,
        },
      };
      res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      spy = jest.spyOn(guastoService, 'modificaGuasto');
    });
  
    afterEach(() => {
      spy.mockRestore();
    });
  it("should modify a guasto and return the result when valid data is provided in modificaGuasto", async () => {
    let req, res, spy;
  
    beforeEach(() => {
      req = {
        params: {
          id: 1,
          new_stato: 1,
          new_note: 'nota modificata',
          new_id_area_illuminata: 2
        },
      };
      res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      spy = jest.spyOn(guastoService, 'modificaGuasto');
    });
  
    afterEach(() => {
      spy.mockRestore();
    });
    it('should handle errors and return a 500 status for errors', async () => {
        const errorMessage = 'An error occurred';
        spy.mockRejectedValue(new Error(errorMessage));
    
        await guastoController.modificaGuasto(req, res);
    
        expect(spy).toHaveBeenCalledWith(req.params.id);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
      });
    
      it('should return a 400 status and error message if id is missing', async () => {
        req.params.id = undefined;
    
        await guastoController.modificaGuasto(req, res);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
          status: 'FAILED',
          data: { error: "Parameter 'id' can not be empty" },
        });
      });
})
  })
describe('chiudiGuasto', () => {
    let req, res, spy;
  
    beforeEach(() => {
      req = {
        params: {
          id: 1,
        },
      };
      res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      spy = jest.spyOn(guastoService, 'chiudiGuasto');
    });
  
    afterEach(() => {
      spy.mockRestore();
    });
it('should close a guasto and return a success response when successful', async () => {
    const mockResult = { closed: true };
    spy.mockResolvedValue(mockResult);

    await guastoController.chiudiGuasto(req, res);

    expect(spy).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ result: mockResult });
  });
  it('should handle errors and return a 500 status for errors', async () => {
    const errorMessage = 'An error occurred';
    spy.mockRejectedValue(new Error(errorMessage));

    await guastoController.chiudiGuasto(req, res);

    expect(spy).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
  });

  it('should return a 400 status and error message if id is missing', async () => {
    req.params.id = undefined;

    await guastoController.chiudiGuasto(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      status: 'FAILED',
      data: { error: "Parameter 'id' can not be empty" },
    });
  });
})
})
  

 /* it("should modify a guasto and return the result when valid data is provided in modificaGuasto", async () => {
    const req = {
      body: {
        id: 1,
        new_stato: 0,
        new_note: "Sample note",
        new_id_area_illuminata: 1
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const sampleResult = {
      message: "Guasto modified successfully",
    };
    const modificaGuastoSpy = jest.spyOn(guastoService, "modificaGuasto");
    modificaGuastoSpy.mockResolvedValue(sampleResult);

    await guastoController.modificaGuasto(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(sampleResult);
  });

  it("should return an error when invalid data is provided in modificaGuasto", async () => {
    const req = {
      body: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await guastoController.modificaGuasto(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
  */
