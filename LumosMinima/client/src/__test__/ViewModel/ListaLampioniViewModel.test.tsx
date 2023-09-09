import { ListaLampioniViewModel } from '../../ViewModel/ListaLampioniViewModel';
import { LampioniStore } from '../../stores/LampioniStore';
import { AreeStore } from '../../stores/AreeStore';
import { MobxMutation } from '../../utils/mobx_mutation';
import { useInstance } from 'react-ioc';
import { useParams } from 'react-router-dom';

// Mock the LampioniStore and its dependencies
jest.mock('../../stores/LampioniStore', () => ({
    LampioniStore: jest.fn(),
  }));
jest.mock('../../stores/AreeStore', () => ({
    AreeStore: jest.fn(),
  }));
jest.mock('react-ioc', () => ({
  useInstance: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
  }));
jest.mock('../../utils/mobx_mutation', () => ({
  MobxMutation: jest.fn().mockImplementation(() => ({
    data: 'mockedData',
    isError: false,
    isLoading: false,
    isSuccess: true,
    status: 'success',
    mutate: jest.fn().mockResolvedValue('mutationResult'),
    mutateAsync: jest.fn().mockResolvedValue('mutationResultAsync'),
    dispose: jest.fn(),
  })),
}));

describe('ListaLampioniViewModel', () => {
  let lampioniStoreMock: { accendiLampioneMutation: any; spegniLampioneMutation: any; getlistaLampioni?: jest.Mock<any, any, any>; getdettagliLampioni?: jest.Mock<any, any, any>; };
  let areaStoreMock: { getAreaDetails: any; }
  let paramsMock;

  beforeEach(() => {
    jest.clearAllMocks();

    areaStoreMock = {
        getAreaDetails : jest.fn()
    };
    lampioniStoreMock = {
      getlistaLampioni: jest.fn().mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      }),
      getdettagliLampioni: jest.fn().mockReturnValue({
        data: {},
        isLoading: false,
        error: null,
      }),
      accendiLampioneMutation: new MobxMutation({}),
      spegniLampioneMutation: new MobxMutation({}),
    };
    paramsMock = { id: '1' };

    require("react-ioc").useInstance.mockReturnValueOnce(lampioniStoreMock);
    require('react-router-dom').useParams.mockReturnValue(paramsMock);
  });

  it('should return areaDetails', () => {
    require("react-ioc").useInstance.mockReturnValueOnce(areaStoreMock);
    const viewModel = ListaLampioniViewModel();
    viewModel.areaDetails()
    expect(areaStoreMock.getAreaDetails).toHaveBeenCalled();
  });

  it('should return dettagliLampione', () => {
    const viewModel = ListaLampioniViewModel();
    viewModel.dettagliLampione()
    expect(lampioniStoreMock.getdettagliLampioni).toHaveBeenCalled();
  });

  it('should return listaLampioni', () => {
    const viewModel = ListaLampioniViewModel();
    viewModel.listaLampioni()
    expect(lampioniStoreMock.getlistaLampioni).toHaveBeenCalled();
  });

  it('should return isLoading', () => {
    const viewModel = ListaLampioniViewModel();
    viewModel.isLoading()
    expect(lampioniStoreMock.getlistaLampioni).toHaveBeenCalled();
  });

  it('should call accendiLampione with expected arguments', () => {
    const viewModel = ListaLampioniViewModel();
    viewModel.accendiLampione('lampID');
    expect(lampioniStoreMock.accendiLampioneMutation.mutateAsync).toHaveBeenCalledWith({ lampID: 'lampID' });
  });

  it('should call spegniLampione with expected arguments', () => {
    const viewModel = ListaLampioniViewModel();
    viewModel.spegniLampione('lampID');
    expect(lampioniStoreMock.spegniLampioneMutation.mutateAsync).toHaveBeenCalledWith({ lampID: 'lampID' });
  });


});