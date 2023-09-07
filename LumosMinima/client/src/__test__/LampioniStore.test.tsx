import { LampioniStore } from '../stores/LampioniStore';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { queryClient } from '../utils/utils';
const axiosMock = new MockAdapter(axios);
jest.mock('react-ioc', () => ({
    ...jest.requireActual('react-ioc'),
    inject: jest.fn(),
  }));
  
  require('react-ioc').inject.mockReturnValue(queryClient);
describe('LampioniStore', () => {
  let lampioniStore: LampioniStore;

  beforeEach(() => {
    lampioniStore = new LampioniStore();
    jest.clearAllMocks()
    axiosMock.reset();
  });

  afterEach(() => {
    lampioniStore.dispose();
  });

  it('should initialize correctly', () => {
    expect(lampioniStore.lampioniQueryResult).toBeDefined();
    expect(lampioniStore.lampioniListaQueryResult).toBeDefined();
    expect(lampioniStore.lampioniDettagliQueryResult).toBeDefined();
    expect(lampioniStore.numeroLampioniAreaQueryResult).toBeDefined();
    expect(lampioniStore.numeroLampioni).toBeDefined();
    expect(lampioniStore.getnumeroLampioniArea).toBeDefined();
    expect(lampioniStore.getlistaLampioni).toBeDefined();
    expect(lampioniStore.getdettagliLampioni).toBeDefined();
    expect(lampioniStore.aggiungiLampioneMutation).toBeDefined();
    expect(lampioniStore.deleteLampioneMutation).toBeDefined();
    expect(lampioniStore.modificaLampioneMutation).toBeDefined();
    expect(lampioniStore.accendiLampioniAreaMutation).toBeDefined();
    expect(lampioniStore.spegniLampioniAreaMutation).toBeDefined();
    expect(lampioniStore.accendiLampioneMutation).toBeDefined();
    expect(lampioniStore.spegniLampioneMutation).toBeDefined();
  });

  it('should call axios.get for lampioniQueryResult', async () => {
    // Mock axios request and provide a response
    axiosMock.onGet('http://localhost:3002/numeroLampioni').reply(200, { numeroLampioni: 42 });

    await lampioniStore.lampioniQueryResult.query();

    // Check that axios.get was called with the correct URL
    expect(axiosMock.history.get[0].url).toBe('http://localhost:3002/numeroLampioni');

  });

  it('should call axios.get for getlistaLampioni', async () => {
    // Mock axios request and provide a response
    axiosMock.onGet('http://localhost:3002/lamps/2').reply(200, {});

    // Call the method and get the result
    await lampioniStore.getlistaLampioni("2");

    // Check that axios.get was called with the correct URL
    expect(axiosMock.history.get[0].url).toBe('http://localhost:3002/lamps/2');

  });

  it('should call axios.get for getdettagliLampioni', async () => {
    // Mock axios request and provide a response
    axiosMock.onGet('http://localhost:3002/lampione/3').reply(200, {});

    // Call the method and get the result
    await lampioniStore.getdettagliLampioni("3");

    // Check that axios.get was called with the correct URL
    expect(axiosMock.history.get[0].url).toBe('http://localhost:3002/lampione/3');

  });

  it('should call axios.get for getnumeroLampioniArea', async () => {
    // Mock axios request and provide a response
    axiosMock.onGet('http://localhost:3002/numeroLampioniArea/1').reply(200, {});

    // Call the method and get the result
    await lampioniStore.getnumeroLampioniArea("1");

    // Check that axios.get was called with the correct URL
    expect(axiosMock.history.get[0].url).toBe('http://localhost:3002/numeroLampioniArea/1');

  });

  it('should call axios.post for aggiungiLampioneMutation', async () => {
    // Mock axios request and provide a response
    axiosMock.onPost('http://127.0.0.1:3002/aggiungiLampione/1/1.2.3.4.5/PUSH/1/2/1').reply(200, {});

    const formData = new FormData();
    formData.append('area', "1")
    formData.append('ip',"1.2.3.4.5")
    formData.append('tipo_interazione', "PUSH")
    formData.append('luminositaDefault', "1")
    formData.append('luminositaManuale', "2")
    formData.append('stato', "1")
    await lampioniStore.aggiungiLampioneMutation.mutateAsync({data2:formData})

   
    expect(axiosMock.history.post[0].url).toBe('http://127.0.0.1:3002/aggiungiLampione/1/1.2.3.4.5/PUSH/1/2/1');

  });

  it('should call axios.post for deleteLampioneMutation', async () => {
    // Mock axios request and provide a response
    axiosMock.onPost('http://127.0.0.1:3002/deleteLampioneMutation/1').reply(200);


    await lampioniStore.deleteLampioneMutation.mutateAsync({id:"1"})

    expect(axiosMock.history.post[0].url).toBe('http://127.0.0.1:3002/eliminaLampione/1');

  });
  it('should call axios.post for modificaLampioneMutation', async () => {
    // Mock axios request and provide a response
    axiosMock.onPost('http://127.0.0.1:3002/modificaLampione/1/1.2.3.4.5/PUSH/1/2/1').reply(200);
    const formData = new FormData();
    formData.append('id', "1")
    formData.append('ip',"1.2.3.4.5")
    formData.append('tipo_interazione', "PUSH")
    formData.append('luminositaDefault', "1")
    formData.append('luminositaManuale', "2")
    formData.append('stato', "1")

    await lampioniStore.modificaLampioneMutation.mutateAsync({data:formData})

    expect(axiosMock.history.post[0].url).toBe('http://127.0.0.1:3002/modificaLampione/1/1.2.3.4.5/PUSH/1/2/1');

  });
  it('should call axios.post for accendiLampioniAreaMutation', async () => {
    // Mock axios request and provide a response
    axiosMock.onPost('http://127.0.0.1:3002/accendiLampioniArea/1').reply(200);

    await lampioniStore.accendiLampioniAreaMutation.mutateAsync({id:"1"})

    expect(axiosMock.history.post[0].url).toBe('http://127.0.0.1:3002/accendiLampioniArea/1');

  });
  it('should call axios.post for spegniLampioniAreaMutation', async () => {
    // Mock axios request and provide a response
    axiosMock.onPost('http://127.0.0.1:3002/spegniLampioniArea/1').reply(200);

    await lampioniStore.spegniLampioniAreaMutation.mutateAsync({id:"1"})

    expect(axiosMock.history.post[0].url).toBe('http://127.0.0.1:3002/spegniLampioniArea/1');

  });

  it('should call axios.post for accendiLampioneMutation', async () => {
    // Mock axios request and provide a response
    axiosMock.onPost('http://127.0.0.1:3002/accendiLampione/4').reply(200);

    await lampioniStore.accendiLampioneMutation.mutateAsync({lampID:"4"})

    expect(axiosMock.history.post[0].url).toBe('http://127.0.0.1:3002/accendiLampione/4');

  });

  it('should call axios.post for spegniLampioneMutation', async () => {
    // Mock axios request and provide a response
    axiosMock.onPost('http://127.0.0.1:3002/spegniLampione/6').reply(200);

    await lampioniStore.spegniLampioneMutation.mutateAsync({lampID:"6"})

    expect(axiosMock.history.post[0].url).toBe('http://127.0.0.1:3002/spegniLampione/6');

  });
  
});
