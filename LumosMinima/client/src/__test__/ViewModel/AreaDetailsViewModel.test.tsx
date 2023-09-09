import { useState } from 'react';
import { AreaDetailsViewModel } from '../../ViewModel/AreaDetailsViewModel';
import { AreeStore } from '../../stores/AreeStore';
import { LampioniStore } from '../../stores/LampioniStore';
import { SensoriStore } from '../../stores/SensoriStore';
import { useInstance } from 'react-ioc';
import { useNavigate, useParams } from "react-router-dom";
import { MobxMutation } from '../../utils/mobx_mutation';

// Mock the dependencies (AreeStore, LampioniStore, SensoriStore)
jest.mock('../../stores/AreeStore', () => ({
  AreeStore: jest.fn(),
}));

jest.mock('../../stores/LampioniStore', () => ({
  LampioniStore: jest.fn(),
}));

jest.mock('../../stores/SensoriStore', () => ({
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

jest.mock('../../utils/mobx_mutation', () => {
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
describe('AreaDetailsViewModel', () => {
  let areeStoreMock: { getAreaDetails: any; aumentaLuminositàMutation?: { mutate: jest.Mock<any, any, any>; }; diminuisciLuminositàMutation?: { mutate: jest.Mock<any, any, any>; }; eliminaAreaMutation?: MobxMutation<unknown, unknown, unknown, unknown>; cambiaModalitaMutation?:MobxMutation<unknown, unknown, unknown, unknown>; accendiAreaMutation?: MobxMutation<unknown, unknown, unknown, unknown>;};
  let lampioniStoreMock: { accendiLampioniAreaMutation: MobxMutation<unknown, unknown, unknown, unknown>; spegniLampioniAreaMutation?: MobxMutation<unknown, unknown, unknown, unknown> };
  let sensoriStoreMock;
  let navigateMock;
  let eliminaAreaMutationMock:MobxMutation<unknown, unknown, unknown, unknown>;
  let accendiAreaMutationMock: MobxMutation<unknown, unknown, unknown, unknown>;
  let spegniAreaMock: MobxMutation<unknown, unknown, unknown, unknown>;
  let cambiaModalitàMutationMock: MobxMutation<unknown, unknown, unknown, unknown>;
  let accendiLampioniAreaMutationMock: MobxMutation<unknown, unknown, unknown, unknown>;
  let spegniLampioniAreaMutationMock: MobxMutation<unknown, unknown, unknown, unknown>;

  beforeEach(() => {
    // Reset the mocks and create a new instance for each test
    jest.clearAllMocks();
    eliminaAreaMutationMock = new MobxMutation<unknown, unknown, unknown, unknown>({});
    cambiaModalitàMutationMock  = new MobxMutation<unknown, unknown, unknown, unknown>({});
    accendiAreaMutationMock = new MobxMutation<unknown, unknown, unknown, unknown>({});
    spegniAreaMock = new MobxMutation<unknown, unknown, unknown, unknown>({});
    let accendiLampioniAreaMutationMock= new MobxMutation<unknown, unknown, unknown, unknown>({});
    let spegniLampioniAreaMutationMock= new MobxMutation<unknown, unknown, unknown, unknown>({});
    areeStoreMock = {
      getAreaDetails: jest.fn(),
      aumentaLuminositàMutation: {
        mutate: jest.fn(),
      },
      diminuisciLuminositàMutation: {
        mutate: jest.fn(),
      },
      eliminaAreaMutation: eliminaAreaMutationMock,
      cambiaModalitaMutation: cambiaModalitàMutationMock,
      accendiAreaMutation:accendiAreaMutationMock,
      
    };

    lampioniStoreMock = {
      accendiLampioniAreaMutation: accendiLampioniAreaMutationMock,
      spegniLampioniAreaMutation: spegniLampioniAreaMutationMock,
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

  it('should call getAreaDetails and isLoading true', () => {
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { modalità_funzionamento: "M" },isLoading:true ,isError:false});
    
    const viewModel = AreaDetailsViewModel();
    
    const result =viewModel.isLoading()
    expect(result).toBe(true)
    expect(areeStoreMock.getAreaDetails).toHaveBeenCalledWith('1');
  });

  it('should call getAreaDetails and return isError false', () => {
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { modalità_funzionamento: "M" },isLoading:true ,isError:false});
    
    const viewModel = AreaDetailsViewModel();
    
    const result =viewModel.isError()
    expect(result).toBe(false)
    expect(areeStoreMock.getAreaDetails).toHaveBeenCalledWith('1');
  });

  it('should call aumentaLuminositàMutation if conditions are met', () => {
    
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { luminosità_manuale: '5' } });
    const viewModel = AreaDetailsViewModel();
    viewModel.aumentaLuminosità();

    expect(areeStoreMock.aumentaLuminositàMutation?.mutate).toHaveBeenCalled();

  });

  it('should not call aumentaLuminositàMutation if luminosità is already at max', () => {
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { luminosità_manuale: '10' } });
    const viewModel = AreaDetailsViewModel();
    viewModel.aumentaLuminosità();
    expect(areeStoreMock.aumentaLuminositàMutation?.mutate).not.toHaveBeenCalled();
  });

  it('should call diminuisciLuminosità if conditions are met', () => {
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { luminosità_manuale: '3' } });
    const viewModel = AreaDetailsViewModel();
    viewModel.diminuisciLuminosità();
    expect(areeStoreMock.diminuisciLuminositàMutation?.mutate).toHaveBeenCalled();
  });

  it('should not call aumentaLuminositàMutation if luminosità is already at min', () => {
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { luminosità_manuale: '0' } });
    const viewModel = AreaDetailsViewModel();
    viewModel.diminuisciLuminosità();
    expect(areeStoreMock.diminuisciLuminositàMutation?.mutate).not.toHaveBeenCalled();
  });

  it('should call eliminaAreaMutation when eliminaArea is called', () => {
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { luminosità_manuale: '0' } });
    const viewModel = AreaDetailsViewModel();
    viewModel.eliminaArea()
    expect(areeStoreMock.eliminaAreaMutation?.mutateAsync).toHaveBeenCalled();
  });

  it('should call cambiaModalitaMutation when cambiaModalità is called', () => {
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { luminosità_manuale: '0' } });
    const viewModel = AreaDetailsViewModel();
    viewModel.cambiaModalità()
    expect(areeStoreMock.cambiaModalitaMutation?.mutateAsync).toHaveBeenCalled();
  }); 

  it('should call accendiAreaMutation when accendiArea is called', () => {
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { luminosità_manuale: '0' } });
    const viewModel = AreaDetailsViewModel();
    viewModel.accendiArea()
    expect(areeStoreMock.accendiAreaMutation?.mutateAsync).toHaveBeenCalled();
  }); 


  it('should call accendiLampioniAreaMutation when accendiLampioniArea is called', () => {
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { luminosità_manuale: '0' } });
    const viewModel = AreaDetailsViewModel();
    viewModel.accendiLampioniArea()
    expect(lampioniStoreMock.accendiLampioniAreaMutation?.mutateAsync).toHaveBeenCalled();
  }); 
  it('should call spegniLampioniAreaAreaMutation when spegniLampioniArea is called', () => {
    areeStoreMock.getAreaDetails.mockReturnValue({ data: { luminosità_manuale: '0' } });
    const viewModel = AreaDetailsViewModel();
    viewModel.spegniLampioniArea()
    expect(lampioniStoreMock.spegniLampioniAreaMutation?.mutateAsync).toHaveBeenCalled();
  }); 


});