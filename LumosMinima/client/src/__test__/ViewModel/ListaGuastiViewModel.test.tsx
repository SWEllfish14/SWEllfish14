import { ListaGuastiViewModel } from '../../ViewModel/ListaGuastiViewModel';
import { GuastiStore } from '../../stores/GuastiStore';
import { useInstance } from 'react-ioc';

jest.mock('../../stores/GuastiStore', () => ({
    GuastiStore: jest.fn(),
  }));
jest.mock('react-ioc', () => ({
  useInstance: jest.fn(),
}));

describe('ListaGuastiViewModel', () => {
  let guastiStoreMock: { getGuastiAperti: any; getGuastiChiusi: any; guasti?: { isLoading: boolean; }; };

  beforeEach(() => {
    jest.clearAllMocks();

    guastiStoreMock = {
      getGuastiAperti: jest.fn().mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      }),
      getGuastiChiusi: jest.fn().mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      }),
      guasti: {
        isLoading: false,
      },
    };
    require("react-ioc").useInstance.mockReturnValue(guastiStoreMock);
  });

  it('should return guastiAperti', () => {
    const viewModel = ListaGuastiViewModel();
    viewModel.guastiAperti()
    expect(guastiStoreMock.getGuastiAperti).toHaveBeenCalled();
  });

  it('should return guastiChiusi', () => {
    const viewModel = ListaGuastiViewModel();
    expect(viewModel.guastiChiusi()).toEqual([]);
    expect(guastiStoreMock.getGuastiChiusi).toHaveBeenCalled()
  });

  it('should return isLoading', () => {
    const viewModel = ListaGuastiViewModel();
    expect(viewModel.isLoading()).toBe(false);
  });
});