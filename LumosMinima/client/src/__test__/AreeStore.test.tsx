import { AreeStore } from '../stores/AreeStore'; // Adjust the import path to your actual file
import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { queryClient } from '../utils/utils';

// Mock axios and QueryClient
jest.mock('axios');

jest.mock('react-ioc', () => ({
    ...jest.requireActual('react-ioc'),
    inject: jest.fn(),
  }));

require('react-ioc').inject.mockReturnValue(queryClient);
describe('AreeStore', () => {
  let areeStore: AreeStore;

  beforeEach(() => {
    // Reset mocks and create a new instance of AreeStore for each test
    jest.clearAllMocks();
    areeStore = new AreeStore();
  });

  it('should initialize correctly', () => {
    // Assert that the instance properties are correctly initialized
    expect(areeStore.areeQueryResult).toBeDefined();
    expect(areeStore.areeNumeroQueryResult).toBeDefined();
    expect(areeStore.areeLimitQueryResult).toBeDefined();
    expect(areeStore.editAreaQueryResult).toBeDefined();
    expect(areeStore.idAreeListaQueryResultMax).toBeDefined();
    expect(areeStore.aumentaLuminositàMutation).toBeDefined();
    expect(areeStore.diminuisciLuminositàMutation).toBeDefined();
    expect(areeStore.aggiungiAreaMutation).toBeDefined();
    expect(areeStore.modificaAreaMutation).toBeDefined();
    expect(areeStore.eliminaAreaMutation).toBeDefined();
    expect(areeStore.accendiAreaMutation).toBeDefined();
    expect(areeStore.aree).toBeDefined();
    expect(areeStore.numeroAree).toBeDefined();
    expect(areeStore.areeLimit).toBeDefined();
  });

  it('should call axios.get for areeQueryResult', async () => {
    const mockData = {}; // Your mock response data
    
    axios.get= jest.fn().mockResolvedValue({ data: mockData })
    await areeStore.areeQueryResult.query();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/aree');
  });

  it('should call axios.get for areaDetailsQueryResult', async () => {
    const mockData = {}; // Your mock response data
    
    axios.get= jest.fn().mockResolvedValue({ data: mockData })
    await areeStore.areeNumeroQueryResult.query();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/numeroAree');
  });

  it('should call axios.post for eliminaAreaMutation', async () => {
    await areeStore.eliminaAreaMutation.mutateAsync({id:"1"})

    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:3002/eliminaArea/1');
  });

  it('should call axios.post for cambiaModalitaMutation', async () => {
    await areeStore.cambiaModalitaMutation.mutateAsync({id:"1"})

    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:3002/cambiaModalitaArea/1');
  });
  // Add more test cases for other methods and scenarios as needed
});