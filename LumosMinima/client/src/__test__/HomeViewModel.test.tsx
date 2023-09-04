
import { HomeViewModel } from '../ViewModel/HomeViewModel'; // Import the HomeViewModel
import { AreeStore } from '../stores/AreeStore';
import { GuastiStore } from '../stores/GuastiStore';
import { LampioniStore } from '../stores/LampioniStore';
import { SensoriStore } from '../stores/SensoriStore';
import React from 'react';
import { useInstance } from 'react-ioc';
jest.mock('../utils/mobx_mutation', () => {
  return {
    MobxMutation: jest.fn().mockImplementation(() => ({
      // Mock the properties and methods you need for your tests
      data: 'mockedData',
      isError: false,
      isLoading: false,
      isSuccess: true,
      status: 'success',
      mutate: jest.fn().mockResolvedValue('mutationResult'), // Mock the mutate method
      mutateAsync: jest.fn().mockResolvedValue('mutationResultAsync'), // Mock the mutateAsync method
      dispose: jest.fn(), // Mock the dispose method
    })),
  };
});
// Mock the dependencies (AreeStore, GuastiStore, LampioniStore, SensoriStore)
jest.mock('../stores/AreeStore', () => ({
  AreeStore: jest.fn(),
}));

jest.mock('../stores/GuastiStore', () => ({
  GuastiStore: jest.fn(),
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


describe('HomeViewModel', () => {
  let areeStoreMock;
  let guastiStoreMock;
  let lampioniStoreMock;
  let sensoriStoreMock;

  beforeEach(() => {
    // Reset the mocks and create new instances for each test
    jest.clearAllMocks();
    areeStoreMock = {
      aree: ['Area1', 'Area2'],
      areeIsLoading: false,
      numeroAree: 10,
      numeroAreeIsLoading: false,
      areeLimit: { data: [{
        ID: 1,
        città: 'Firenze',
        zona_geografica_città: 'Duomo',
        modalità_funzionamento: 'A',
        luminosità_standard: 10,
        luminosità_rilevamento: 10,
        luminosità_manuale: 5,
        stato: 1,
      }, {
        ID: 2,
        città: 'Venezia',
        zona_geografica_città: 'Piazza San Marco',
        modalità_funzionamento: 'M',
        luminosità_standard: 6,
        luminosità_rilevamento: 4,
        luminosità_manuale: 3,
        stato: 0,
      }], isLoading: false },
    };

    guastiStoreMock = {
      guastiNumber: { data: 5, isLoading: false },
      guasti: { data: ['Guasto1', 'Guasto2'], isLoading: false },
    };

    lampioniStoreMock = {
      numeroLampioni: { data: 3, isLoading: false },
    };

    sensoriStoreMock = {
      numeroSensori: { data: 7, isLoading: false },
    };

    // Mock the dependencies
    require('react-ioc').useInstance.mockReturnValue(areeStoreMock);
    require('../stores/AreeStore').AreeStore.mockReturnValue(areeStoreMock);
    require('../stores/GuastiStore').GuastiStore.mockReturnValue(guastiStoreMock);
    require('../stores/LampioniStore').LampioniStore.mockReturnValue(lampioniStoreMock);
    require('../stores/SensoriStore').SensoriStore.mockReturnValue(sensoriStoreMock);
  });

  it('should return aree', () => {
    const viewModel = HomeViewModel();
    const result = viewModel.aree();

    expect(result).toEqual([{
      ID: 1,
      città: 'Firenze',
      zona_geografica_città: 'Duomo',
      modalità_funzionamento: 'A',
      luminosità_standard: 10,
      luminosità_rilevamento: 10,
      luminosità_manuale: 5,
      stato: 1,
    }, {
      ID: 2,
      città: 'Venezia',
      zona_geografica_città: 'Piazza San Marco',
      modalità_funzionamento: 'M',
      luminosità_standard: 6,
      luminosità_rilevamento: 4,
      luminosità_manuale: 3,
      stato: 0,
    }]);
  });

  it('should return areeisLoading', () => {
    const viewModel = HomeViewModel();
    const result = viewModel.areeisLoading();

    expect(result).toBe(false);
  });

  it('should return numeroAree', () => {
    const viewModel = HomeViewModel();
    const result = viewModel.numeroAree();

    expect(result).toBe(10);
  });

  it('should return numeroAreeisLoading', () => {
    const viewModel = HomeViewModel();
    const result = viewModel.numeroAreeisLoading();

    expect(result).toBe(false);
  });

  // Add more test cases for other functions
});