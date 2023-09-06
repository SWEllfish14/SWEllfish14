import { GuastiStore } from '../stores/GuastiStore'; // Adjust the import path to your actual file
import axios from 'axios';
import { queryClient } from '../utils/utils';
import MockAdapter from 'axios-mock-adapter';
import { QueryClient } from '@tanstack/react-query';

// Create a new instance of Axios mock adapter
const axiosMock = new MockAdapter(axios);
// Mock axios and QueryClient
//jest.mock('axios');

jest.mock('react-ioc', () => ({
    ...jest.requireActual('react-ioc'),
    inject: jest.fn(),
  }));

require('react-ioc').inject.mockReturnValue(queryClient);
describe('GuastiStore', () => {
  let guastiStore: GuastiStore;

  beforeEach(() => {
    // Reset mocks and create a new instance of AreeStore for each test

    axiosMock.reset();
    jest.clearAllMocks();
    guastiStore = new GuastiStore();
  });

  it('should initialize correctly', () => {
    // Assert that the instance properties are correctly initialized
    expect(guastiStore.guastiNumberQueryResult).toBeDefined();
    expect(guastiStore.guastiQueryResult).toBeDefined();
    expect(guastiStore.guastiApertiQueryResult).toBeDefined();
    expect(guastiStore.guastiChiusiQueryResult).toBeDefined();
    expect(guastiStore.guastoDetailsQueryResult).toBeDefined();
    expect(guastiStore.chiudiGuastoMutation).toBeDefined();
    expect(guastiStore.modificaGuastoMutation).toBeDefined();
    expect(guastiStore.aggiungiGuastoMutation).toBeDefined();
  });

  it('should call axios.get for guastiQueryResult', async () => {
    axiosMock.onGet('http://localhost:3002/guastiAperti').reply(200, {});
    await guastiStore.guastiQueryResult.query();

    expect(axiosMock.history.get[0].url).toBe("http://localhost:3002/guastiAperti");
  });
  it('should call axios.get for guastiNumberQueryResult', async () => {
    axiosMock.onGet('http://localhost:3002/numeroGuasti').reply(200, {});
    await guastiStore.guastiNumberQueryResult.query();

    expect(axiosMock.history.get[0].url).toBe('http://localhost:3002/numeroGuasti');
  });

  it('should call axios.get for getGuastiAperti', async () => {
    axiosMock.onGet('http://localhost:3002/guastiAperti').reply(200, {});
    await guastiStore.getGuastiAperti()

    expect(axiosMock.history.get[0].url).toBe('http://localhost:3002/guastiAperti');
  });

  it('should call axios.get for getGuastiChiusi', async () => {
    axiosMock.onGet('http://localhost:3002/guastiChiusi').reply(200, {});
    await guastiStore.getGuastiChiusi()

    expect(axiosMock.history.get[0].url).toBe('http://localhost:3002/guastiChiusi');
  });

  it('should call axios.get for getGuastoDetails', async () => {
    axiosMock.onGet('http://localhost:3002/guasti/1').reply(200, {});
    await guastiStore.getGuastoDetails("1")

    expect(axiosMock.history.get[0].url).toBe(`http://localhost:3002/guasti/1`);
  });

  it('should call axios.post for chiudiGuastoMutation', async () => {
    axiosMock.onPost("http://127.0.0.1:3002/chiudiGuasto/").reply(200,{})
    
    await guastiStore.chiudiGuastoMutation.mutateAsync({id:"2"})
    
    expect(axiosMock.history.post[0].url).toBe("http://127.0.0.1:3002/chiudiGuasto/2");
  });

  it('should call axios.post for modificaGuastoMutation', async () => {

    axiosMock.onPost("http://127.0.0.1:3002/modificaGuasto/2/1/Guasto al lampione sulla destra/1").reply(200, {});

    // Call the mutation function
    const formData = new FormData();
    formData.append('new_stato', "1")
    formData.append('new_note',"Guasto al lampione sulla destra")
    formData.append('new_id_area_illuminata', "1")
    await guastiStore.modificaGuastoMutation.mutateAsync({
      id: "2",
      data: formData
    });

    // Check that axios.post was called with the correct URL and data
    expect(axiosMock.history.post[0].url).toBe("http://127.0.0.1:3002/modificaGuasto/2/1/Guasto al lampione sulla destra/1");
  });

  it('should call axios.post for aggiungiGuastoMutation', async () => {
    const formData = new FormData();
    formData.append('dataRilevamento', "2023-04-13")
    formData.append('stato',"1")
    formData.append('note', "Guasto al lampione sulla destra")
    formData.append('id_area', "1")
    axiosMock.onPost("http://127.0.0.1:3002/aggiungiGuasto/2023-04-13/1/Guasto al lampione sulla destra/1").reply(200, {});
    await guastiStore.aggiungiGuastoMutation.mutateAsync({data:formData})

    expect(axiosMock.history.post[0].url).toBe("http://127.0.0.1:3002/aggiungiGuasto/2023-04-13/1/Guasto al lampione sulla destra/1");
  });

  it('should call all disposes for dispose', async () => {
    const spyguastiNumberQueryResultDispose=jest.spyOn(guastiStore.guastiNumberQueryResult,"dispose");
    const spyguastiQueryResultDispose =jest.spyOn(guastiStore.guastiQueryResult,"dispose");
    const spyguastiApertiQueryResultDispose=jest.spyOn(guastiStore.guastiApertiQueryResult,"dispose");
    const spyguastiChiusiQueryResultDispose=jest.spyOn(guastiStore.guastiChiusiQueryResult,"dispose");
    const spychiudiGuastoMutationDispose=jest.spyOn(guastiStore.chiudiGuastoMutation,"dispose");
    const spymodificaGuastoMutationDispose=jest.spyOn(guastiStore.modificaGuastoMutation,"dispose");
    const spyguastoDetailsQueryResultDispose=jest.spyOn(guastiStore.guastoDetailsQueryResult,"dispose");
    guastiStore.dispose()
    expect(spyguastiNumberQueryResultDispose).toBeCalled()
    expect(spyguastiQueryResultDispose).toBeCalled()
    expect(spyguastiApertiQueryResultDispose).toBeCalled()
    expect(spyguastiChiusiQueryResultDispose).toBeCalled()
    expect(spychiudiGuastoMutationDispose).toBeCalled()
    expect(spymodificaGuastoMutationDispose).toBeCalled()
    expect(spyguastoDetailsQueryResultDispose).toBeCalled()
  });

  it('should call axios.get for guastiNumber', async () => {
    // Mock the Axios request and provide a response
    axiosMock.onGet('http://localhost:3002/numeroGuasti').reply(200, { numeroGuasti: 42 });

    // Call the getter
    const result = await guastiStore.guastiNumber;

    // Check that axios.get was called with the correct URL
    expect(axiosMock.history.get[0].url).toBe('http://localhost:3002/numeroGuasti');

  });

  
});








