import { ListaSensoriViewModel } from '../ViewModel/ListaSensoriViewModel';
import { SensoriStore } from '../stores/SensoriStore';
import { useInstance } from 'react-ioc';
import { useParams } from 'react-router-dom';


jest.mock('../stores/SensoriStore', () => ({
    SensoriStore: jest.fn(),
  }));
jest.mock('react-ioc', () => ({
  useInstance: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
  }));
describe('ListaSensoriViewModel', () => {
  let sensoriStoreMock: { getlistaSensori: any; };
  let paramsMock;

  beforeEach(() => {
    jest.clearAllMocks();

    paramsMock = { id: '1' };
    require('react-router-dom').useParams.mockReturnValue(paramsMock);
    sensoriStoreMock = {
      getlistaSensori: jest.fn().mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      }),
    };
    require("react-ioc").useInstance.mockReturnValue(sensoriStoreMock);
  });

  it('should return listaSensori', () => {
    const viewModel = ListaSensoriViewModel();
    viewModel.listaSensori()
    expect(sensoriStoreMock.getlistaSensori).toHaveBeenCalled();
  });

  it('should return isLoading', () => {
    const viewModel = ListaSensoriViewModel();
    viewModel.isLoading()
    expect(sensoriStoreMock.getlistaSensori).toHaveBeenCalled();
  });
});