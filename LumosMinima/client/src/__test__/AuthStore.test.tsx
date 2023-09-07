import MockAdapter from "axios-mock-adapter";
import { AuthStore } from "../stores/AuthStore";
import Cookies from "js-cookie";
import { queryClient } from "../utils/utils";
jest.mock("react-ioc", () => ({
  ...jest.requireActual("react-ioc"),
  inject: jest.fn(),
}));
jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));
jest.mock("axios");
const axios = require("axios");

require("react-ioc").inject.mockReturnValue(queryClient);
describe("loginMutation", () => {
  let authStore: AuthStore;

  beforeEach(() => {
    authStore = new AuthStore();
  });

  afterEach(() => {});

  it("should handle a successful login", async () => {
    const username = "testuser";
    const password = "testpassword";
    axios.post.mockResolvedValue({
      data: { token: "mocked-token" },
    });

    await authStore.loginMutation.mutateAsync({ username, password });

    expect(Cookies.set).toHaveBeenCalledWith("user-token", "mocked-token", {
      expires: 1 / 24,
    });
  });

  it("should handle a failed login", async () => {
    axios.post.mockResolvedValue({
        data: { msg:"Invalid Email Or Password" },
      });
    const alertMock = jest.spyOn(global, 'alert');
    alertMock.mockImplementation(() => {});
    const authStore = new AuthStore();

    await authStore.loginMutation.mutateAsync({
      username: "incorrect-username",
      password: "incorrect-password",
    });

    expect(Cookies.set).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
        'Unable to login. Please try after some time.'
      );
  });

  it("Calls dispose of loginMutation when dispose of AuthStore", async () => {
    const spyloginMutationtDispose=jest.spyOn(authStore.loginMutation,"dispose");
    authStore.dispose()
    expect(spyloginMutationtDispose).toBeCalled()
  });
});
