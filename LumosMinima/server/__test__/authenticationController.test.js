const authenticationController = require("../controllers/authenticationController");
const authenticationService = require("../services/authenticationService");

describe("authentication Controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shouldlogin and return the result when valid data is provided", async () => {
    const req = {
      body: {
        username: "1",
        password: "0"
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const sampleResult = {
      message: "logged in successfully",
    };
    const loginSpy = jest.spyOn(authenticationService, "login");
    loginSpy.mockResolvedValue(sampleResult);

    await authenticationController.login(req, res);

    //expect(res.status).toHaveBeenCalledWith(200);
    //expect(res.send).toHaveBeenCalledWith(sampleResult);
  });

  it("should return an error when invalid data is provided in login", async () => {
    const req = {
      body: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await authenticationController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
})

