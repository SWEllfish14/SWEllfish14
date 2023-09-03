import { AggiungiAreaViewModel } from '../ViewModel/AggiungiAreaViewModel';
import { AreeStore } from '../stores/AreeStore';
import { useInstance } from 'react-ioc';

// Mock the dependencies (AreeStore)
jest.mock('../stores/AreeStore', () => ({
  AreeStore: jest.fn(),
}));
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    useParams: jest.fn(), 
  }));
  jest.mock('react-ioc', () => ({
    useInstance: jest.fn(),
  }));
  jest.mock('react', () => ({
    useState: jest.fn(),
  }));
  const mockSetState = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((initialState) => [initialState, mockSetState]),
}));
describe('AggiungiAreaViewModel', () => {
  let areeStoreMock : any;
 
  
  beforeEach(() => {
    // Reset the mocks and create a new instance for each test
    jest.clearAllMocks();
    const mockMutateAsync = jest.fn();
    areeStoreMock = {
      getAreaDetails: jest.fn().mockReturnValue({
        isLoading: true, 
        isError:false
      }),
      aggiungiAreaMutation: {
        mutateAsync: mockMutateAsync,
      },
    };
    mockMutateAsync.mockResolvedValue({
      isSuccess: false,
      error: null,
    });
    // Mock the dependencies
    require('react-ioc').useInstance.mockReturnValue(areeStoreMock);
    require('../stores/AreeStore').AreeStore.mockReturnValue(areeStoreMock);
    require('react-router-dom').useParams.mockReturnValue({ id: '1' })
  });

  it('should call getAreaDetails with the correct ID', () => {
    const viewModel = AggiungiAreaViewModel();
    
    viewModel.areaDetails();
    expect(areeStoreMock.getAreaDetails).toHaveBeenCalled();
  });

  it('viene chiamata getAreaDetails con isLoading', () => {
    const viewModel = AggiungiAreaViewModel();
    
    expect(viewModel.isLoading()).toBe(true);
    expect(areeStoreMock.getAreaDetails).toBeCalled()
  });

  it('viene chiamata getAreaDetails con isError', () => {
    const viewModel = AggiungiAreaViewModel();
    
    expect(viewModel.isError()).toBe(false);
    expect(areeStoreMock.getAreaDetails).toBeCalled()
  });

  it('viene chiamata getAreaDetails con error', () => {
    const viewModel = AggiungiAreaViewModel();
    
    viewModel.error();
    expect(areeStoreMock.getAreaDetails).toBeCalled()
  });

  it('should call mutateAsync when submitting', async () => {
    const viewModel = AggiungiAreaViewModel();
    

const formElement = document.createElement('form');
const input1 = document.createElement('input');
input1.name = 'citta';
input1.value = 'value1';
formElement.appendChild(input1);
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

const mockNavigate = jest.fn();
require('react-router-dom').useNavigate.mockReturnValue(mockNavigate); 
    await viewModel.submit(formEventMock);
    expect(areeStoreMock.aggiungiAreaMutation.mutateAsync).toHaveBeenCalled();
  });

  // Add more test cases for other functions

  it('should set submitHasError to true when there is an error', () => {
    const viewModel = AggiungiAreaViewModel();
    viewModel.clearError(); // Make sure submitHasError is initially false
    expect(viewModel.submitIsError()).toBe(false);
  });

  it('should set submitError when there is an error', async () => {
    const viewModel = AggiungiAreaViewModel();
  const errorMessage = 'An error occurred';
  viewModel.clearError(); // Make sure submitError is initially undefined
  
  // Mock mutateAsync to resolve with an error
  areeStoreMock.aggiungiAreaMutation.mutateAsync.mockResolvedValue({
    isSuccess: false, // Indicate that it's not a success
    error: new Error(errorMessage), // Simulate an error with an error message
  });
  
  // Trigger the submit function
  await viewModel.submit({ preventDefault: jest.fn() });

  expect(viewModel.submitError()).toBe(errorMessage);
});
});