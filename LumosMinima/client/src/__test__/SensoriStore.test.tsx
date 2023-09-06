import { SensoriStore } from '../stores/SensoriStore'; // Adjust the import path to your actual file
import axios from 'axios';
import { queryClient } from '../utils/utils';

// Mock axios and QueryClient
jest.mock('axios');

jest.mock('react-ioc', () => ({
    ...jest.requireActual('react-ioc'),
    inject: jest.fn(),
  }));

require('react-ioc').inject.mockReturnValue(queryClient);
describe('SensoriStore', () => {
  let sensoriStore: SensoriStore;

  beforeEach(() => {
    // Reset mocks and create a new instance of AreeStore for each test
    jest.clearAllMocks();
    sensoriStore = new SensoriStore();
  });

  it('should initialize correctly', () => {
    // Assert that the instance properties are correctly initialized
    expect(sensoriStore.sensoriQueryResult).toBeDefined();
    expect(sensoriStore.sensoriDettagliQueryResult).toBeDefined();
    expect(sensoriStore.sensoriListaQueryResult).toBeDefined();
    expect(sensoriStore.numeroSensoriAreaQueryResult).toBeDefined();
    expect(sensoriStore.aggiungiSensoreMutation).toBeDefined();
    expect(sensoriStore.modificaSensoreMutation).toBeDefined();
    expect(sensoriStore.eliminaSensoreMutation).toBeDefined();
    expect(sensoriStore.numeroSensori).toBeDefined();
  });

  it('should call axios.get for sensoriQueryResult', async () => {
    const mockData = {}; // Your mock response data
    
    axios.get= jest.fn().mockResolvedValue({ data: mockData })
    await sensoriStore.sensoriQueryResult.query();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/numeroSensori');
  });

  it('should call axios.get for getlistaSensori', async () => {
    const mockData = {}; // Your mock response data
    
    axios.get= jest.fn().mockResolvedValue({ data: mockData })
    await sensoriStore.getlistaSensori("2")

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/sensori/2');
  });
  it('should call axios.get for getdettagliSensori', async () => {
    const mockData = {}; // Your mock response data
    
    axios.get= jest.fn().mockResolvedValue({ data: mockData })
    await sensoriStore.getdettagliSensori("3")

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/sensore/3');
  });

  it('should call axios.get for getnumeroSensoriArea', async () => {
    const mockData = {}; // Your mock response data
    
    axios.get= jest.fn().mockResolvedValue({ data: mockData })
    await sensoriStore.getnumeroSensoriArea("1")

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3002/numeroSensoriArea/1");
  });

  it('should call axios.get for aggiungiSensoreMutation', async () => {
    const formData = new FormData();
    formData.append('ip', "200.98.144.217")
    formData.append('polling',"7")
    formData.append('zona_geografica', "Piazza San Marco")
    formData.append('tipo_interazione','PUSH')
    formData.append('raggio_azione','6')
    formData.append('id_area','1')
    await sensoriStore.aggiungiSensoreMutation.mutateAsync({data:formData})

    expect(axios.post).toHaveBeenCalled();
  });
  it('should call axios.get for modificaSensoreMutation', async () => {
    const formData = new FormData();
    formData.append('ip', "200.98.144.217")
    formData.append('polling',"7")
    formData.append('zona_geografica', "Piazza San Marco")
    formData.append('tipo_interazione','PUSH')
    formData.append('raggio_azione','6')
    formData.append('id_area','1')
    await sensoriStore.modificaSensoreMutation.mutateAsync({id:"1",data:formData})

    expect(axios.post).toHaveBeenCalled();
  });

  it('should call axios.get for eliminaSensoreMutation', async () => {
    
    await sensoriStore.eliminaSensoreMutation.mutateAsync({id:"1"})

    expect(axios.post).toHaveBeenCalledWith(`http://127.0.0.1:3002/eliminaSensore/1`);
  });

  it('should call all disposes for dispose', async () => {
    const spysensoriQueryResultDispose=jest.spyOn(sensoriStore.sensoriQueryResult,"dispose");
    const spysensoriListaQueryResultDispose =jest.spyOn(sensoriStore.sensoriListaQueryResult,"dispose");
    const spyaggiungiSensoreMutationDispose=jest.spyOn(sensoriStore.aggiungiSensoreMutation,"dispose");
    const spymodificaSensoreMutationDispose=jest.spyOn(sensoriStore.modificaSensoreMutation,"dispose");
    const spyeliminaSensoreMutationDispose=jest.spyOn(sensoriStore.eliminaSensoreMutation,"dispose");
    sensoriStore.dispose()
    expect(spysensoriQueryResultDispose).toBeCalled()
    expect(spysensoriListaQueryResultDispose).toBeCalled()
    expect(spyaggiungiSensoreMutationDispose).toBeCalled()
    expect(spymodificaSensoreMutationDispose).toBeCalled()
    expect(spyeliminaSensoreMutationDispose).toBeCalled()
  });
})