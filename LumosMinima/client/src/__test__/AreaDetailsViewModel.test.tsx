import { AreaDetailsViewModel } from '../ViewModel/AreaDetailsViewModel';
import { AreeStore } from '../stores/AreeStore';
import { LampioniStore } from '../stores/LampioniStore';
import { SensoriStore } from '../stores/SensoriStore';
import { useInstance } from 'react-ioc';
import { useNavigate, useParams } from "react-router-dom";

// Mock the dependencies (AreeStore, LampioniStore, SensoriStore)
jest.mock('../stores/AreeStore', () => ({
  AreeStore: jest.fn(),
}));

jest.mock('../stores/LampioniStore', () => ({
  LampioniStore: jest.fn(),
}));

jest.mock('../stores/SensoriStore', () => ({
  SensoriStore: jest.fn(),
}));

jest.mock('react-ioc', () => ({
  useInstance: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((initialState) => [initialState, jest.fn()]), // Mock useState
}));

describe('AreaDetailsViewModel', () => {
  let areeStoreMock: { getAreaDetails: any; aumentaLuminositàMutation?: { mutate: jest.Mock<any, any, any>; }; diminuisciLuminositàMutation?: { mutate: jest.Mock<any, any, any>; }; eliminaAreaMutation?: { mutateAsync: jest.Mock<any, any, any>; }; cambiaModalitaMutation?: { mutateAsync: jest.Mock<any, any, any>; }; accendiAreaMutation?: { mutateAsync: jest.Mock<any, any, any>; }; };
  let lampioniStoreMock;
  let sensoriStoreMock;
  let navigateMock;

  beforeEach(() => {
    // Reset the mocks and create a new instance for each test
    jest.clearAllMocks();

    areeStoreMock = {
      getAreaDetails: jest.fn(),
      aumentaLuminositàMutation: {
        mutate: jest.fn(),
      },
      diminuisciLuminositàMutation: {
        mutate: jest.fn(),
      },
      eliminaAreaMutation: {
        mutateAsync: jest.fn(),
      },
      cambiaModalitaMutation: {
        mutateAsync: jest.fn(),
      },
      accendiAreaMutation: {
        mutateAsync: jest.fn(),
      },
    };

    lampioniStoreMock = {
      accendiLampioniAreaMutation: {
        mutateAsync: jest.fn(),
      },
      spegniLampioniAreaMutation: {
        mutateAsync: jest.fn(),
      },
    };

    sensoriStoreMock = {}; // Mock SensoriStore as needed

    // Mock the dependencies
    require('react-ioc').useInstance.mockReturnValue({
      ...areeStoreMock,
      ...lampioniStoreMock,
      ...sensoriStoreMock,
    });

    require('react-router-dom').useParams.mockReturnValue({ id: '1' });
    
    navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);
  });

  it('should call getAreaDetails with the correct ID', () => {
    // Mock the getAreaDetails response with data
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { modalità_funzionamento: "M" } });
    
    const viewModel = AreaDetailsViewModel();
    
    viewModel.areaDetails();
    expect(areeStoreMock.getAreaDetails).toHaveBeenCalledWith('1');
  });

  // Add more test cases for other functions
});