import { LoginViewModel } from "../ViewModel/LoginViewModel";
import { useNavigate } from "react-router-dom";
import { useInstance } from "react-ioc";
import { AuthStore } from "../stores/AuthStore";
// Mock the required dependencies first
jest.mock("react-ioc", () => ({
  useInstance: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Import AuthStore mock


describe("LoginViewModel", () => {
  // Define mock variables
  let authStoreMock: {
    loginMutation: {
      mutateAsync: jest.Mock;
    };
  };
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    // Create a mock function for mutateAsync
    const mockMutateAsync = jest.fn();

    // Set up the authStoreMock with loginMutation
    authStoreMock = {
      loginMutation: {
        mutateAsync: mockMutateAsync,
      },
    };

    // Mock the required dependencies
    (useInstance as jest.Mock).mockReturnValue(authStoreMock);
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should submit login form", async () => {
    // Create a view model
    const viewModel = LoginViewModel();

    // Create a form element and formEventMock
    const formElement = document.createElement("form");
    const input1 = document.createElement("input");
    input1.name = "nomeUtente";
    input1.value = "test";
    formElement.appendChild(input1);
    const input2 = document.createElement("input");
    input2.name = "password";
    input2.value = "test";
    formElement.appendChild(input2);
    const formEventMock: React.FormEvent<HTMLFormElement> = {
      preventDefault: jest.fn(),
      currentTarget: formElement,
      target: formElement,
      bubbles: false,
      cancelable: false,
      defaultPrevented: false,
  eventPhase: 0,
  isTrusted: false,
  isDefaultPrevented: function (): boolean {
    throw new Error('Function not implemented.');
  },
  stopPropagation: function (): void {
    throw new Error('Function not implemented.');
  },
  isPropagationStopped: function (): boolean {
    throw new Error('Function not implemented.');
  },
  persist: function (): void {
    throw new Error('Function not implemented.');
  },
  timeStamp: 0,
  type: '',
  nativeEvent: new Event("")
    };

    // Mock the result of mutateAsync
    authStoreMock.loginMutation.mutateAsync.mockResolvedValue({
      isSuccess: true,
      error: null,
    });

    // Act
    await viewModel.submit(formEventMock);

    // Assert
    expect(authStoreMock.loginMutation.mutateAsync).toHaveBeenCalledWith({
      username: "test",
      password: "test",
    });
  });
});
