const authenticationController = require("../controllers/authenticationController");
const authenticationService = require("../services/authenticationService");

describe("authentication Controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('login', () => {
    let req, res, spy;
  
    beforeEach(() => {
      req = {
        body: {
          username: '1',
          password: '1'
        },
      };
      res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      spy = jest.spyOn(authenticationService, 'login');
    });
  
    afterEach(() => {
      spy.mockRestore();
    });
  
    it('should login and return a success response when successful', async () => {
      const mockResult = { updated: true };
      spy.mockResolvedValue(mockResult);
  
      await authenticationController.login(req, res);
  
      /*expect(spy).toHaveBeenCalledWith(
        req.body,
      );
      */
      expect(res.status).toHaveBeenCalledWith(200);
      //expect(res.send).toHaveBeenCalledWith({ result: mockResult });
    });
   /* it("should handle errors and return a 500 status for errors in login", async () => {
        const req = {
          body: {
            username: null,
            password: null
          },
        };
    
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
    
        await authenticationController.login(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
          status: "FAILED",
          data: { error: "Invalid Email Or Password" },
        });
      });
  
    it('should handle errors and return a 400 status for errors in login', async () => {
      const errorMessage = 'An error occurred';
      spy.mockRejectedValue(new Error(errorMessage));
  
      await sensoreController.getAllSensoriFromArea(req, res);
  
      expect(spy).toHaveBeenCalledWith(
        req.params.id,
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', data: { error: errorMessage } });
    });
  
    // Add more test cases as needed for different scenarios
  })
*/
})
})