import { AreeStore } from '../stores/AreeStore'; // Adjust the import path to your actual file
import axios from 'axios';
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
    expect(areeStore.AreeIdMax).toBeDefined();
  });

  it('should call axios.get for areeQueryResult', async () => {
    const mockData = {}; // Your mock response data
    
    axios.get= jest.fn().mockResolvedValue({ data: mockData })
    await areeStore.areeQueryResult.query();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/aree');
  });

  it('should call axios.get for areeNumeroQueryResult', async () => {
    const mockData = {numeroAree:12}; // Your mock response data
    
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
  it('should call axios.get for areaDetailsQueryResult', async () => {
    await areeStore.getAreaDetails("1")

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/area/1');
  });
  it('should call axios.get for idAreeListaQueryResultMax', async () => {
    await areeStore.idAreeListaQueryResultMax.query()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/idAreeMax');
  });
  it('should call axios.get for areeLimitQueryResult', async () => {
    await areeStore.areeLimitQueryResult.query()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3002/areelimit');
  });
  it('should call axios.get for editAreaQueryResult', async () => {
    await areeStore.editAreaQueryResult.query({queryKey: ["id", "1"],})

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3002/area/1");
  });
  it('should call axios.post for aumentaLuminositàMutation', async () => {
    await areeStore.aumentaLuminositàMutation.mutateAsync({id:"1"})

    expect(axios.post).toHaveBeenCalledWith("http://127.0.0.1:3002/area/1/aumentaluminosita");
  });
  it('should call axios.post for diminuisciLuminositàMutation', async () => {
    await areeStore.diminuisciLuminositàMutation.mutateAsync({id:"1"})

    expect(axios.post).toHaveBeenCalledWith("http://127.0.0.1:3002/area/1/diminuisciluminosita");
  });
  it('should call axios.post for accendiAreaMutation', async () => {
    await areeStore.accendiAreaMutation.mutateAsync({id:"1"})

    expect(axios.post).toHaveBeenCalledWith("http://127.0.0.1:3002/accendiArea/1");
  });
  it('should call axios.post for aggiungiAreaMutation', async () => {
    const formData = new FormData();
    formData.append('citta', "Venezia")
    formData.append('zonaGeografica',"Piazza San Marco")
    formData.append('modalita', "M")
    formData.append('luminositaDefault','6')
    formData.append('luminositaRilevamento','6')
    formData.append('stato','1')
    await areeStore.aggiungiAreaMutation.mutateAsync({data:formData})

    expect(axios.post).toHaveBeenCalled();
  });

  it('should call axios.post for modificaAreaMutation', async () => {
    const formData = new FormData();
    formData.append('citta', "Venezia")
    formData.append('zonaGeografica',"Piazza San Marco")
    formData.append('modalita', "M")
    formData.append('luminositaDefault','6')
    formData.append('luminositaRilevamento','6')
    formData.append('stato','1')
    await areeStore.modificaAreaMutation.mutateAsync({id:"1",data:formData})
    
    expect(axios.post).toHaveBeenCalled();
  });
  it('should call axios.post for accendiAllAreeMutation', async () => {
    await areeStore.accendiAllAreeMutation.mutateAsync({})

    expect(axios.post).toHaveBeenCalledWith("http://127.0.0.1:3002/accendiAllAree");
  });
  it('should call axios.post for spegniAllAreeMutation', async () => {
    await areeStore.spegniAllAreeMutation.mutateAsync({})

    expect(axios.post).toHaveBeenCalledWith("http://127.0.0.1:3002/spegniAllAree");
  });
  
});