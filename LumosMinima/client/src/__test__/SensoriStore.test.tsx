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
})