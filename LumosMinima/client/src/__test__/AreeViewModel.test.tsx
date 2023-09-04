import { AreeViewModel } from '../ViewModel/AreeViewModel';
import { AreeStore } from '../stores/AreeStore';
import { MobxMutation } from '../utils/mobx_mutation'; // Import the correct MobxMutation type
import { queryClient } from '../utils/utils';

// Mock the AreeStore and its dependencies
jest.mock('react-ioc', () => ({
  useInstance: jest.fn(),
}));

jest.mock('../stores/AreeStore', () => ({
  AreeStore: jest.fn(),
}));

jest.mock('../utils/mobx_mutation', () => {
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
describe('AreeViewModel', () => {
  let areeStoreMock;
  let accendiAllAreeMutationMock: MobxMutation<unknown, unknown, unknown, unknown>;
  let spegniAllAreeMutationMock: MobxMutation<unknown, unknown, unknown, unknown>;

  beforeEach(() => {
    // Reset the mocks and create new instances for each test
    jest.clearAllMocks();
    
    // Create instances of MobxMutation with the expected type
    accendiAllAreeMutationMock = new MobxMutation<unknown, unknown, unknown, unknown>({});
    spegniAllAreeMutationMock = new MobxMutation<unknown, unknown, unknown, unknown>({});

    areeStoreMock = {
      aree: [{
        ID: 1,
        città: 'Firenze',
        zona_geografica_città: 'Duomo',
        modalità_funzionamento: 'A',
        luminosità_standard: 10,
        luminosità_rilevamento: 10,
        luminosità_manuale: 5,
        stato: 1,
      }, {
        ID: 2,
        città: 'Venezia',
        zona_geografica_città: 'Piazza San Marco',
        modalità_funzionamento: 'M',
        luminosità_standard: 6,
        luminosità_rilevamento: 4,
        luminosità_manuale: 3,
        stato: 0,
      }],
      areeIsLoading: false,
      accendiAllAreeMutation: accendiAllAreeMutationMock,
      spegniAllAreeMutation: spegniAllAreeMutationMock,
    };

    // Mock the dependencies
    require('react-ioc').useInstance.mockReturnValue(areeStoreMock);
    require('../stores/AreeStore').AreeStore.mockReturnValue(areeStoreMock);
  });

  it('should return aree', () => {
    const viewModel = AreeViewModel();
    expect(viewModel.aree()).toEqual([{
      ID: 1,
      città: 'Firenze',
      zona_geografica_città: 'Duomo',
      modalità_funzionamento: 'A',
      luminosità_standard: 10,
      luminosità_rilevamento: 10,
      luminosità_manuale: 5,
      stato: 1,
    }, {
      ID: 2,
      città: 'Venezia',
      zona_geografica_città: 'Piazza San Marco',
      modalità_funzionamento: 'M',
      luminosità_standard: 6,
      luminosità_rilevamento: 4,
      luminosità_manuale: 3,
      stato: 0,
    }]);
  });

  it('should return isLoading', () => {
    const viewModel = AreeViewModel();
    expect(viewModel.isLoading()).toBe(false);
  });

  it('should call accendiAllAreeMutation.mutateAsync with expected arguments', () => {
    const viewModel = AreeViewModel();
    viewModel.aumentaLuminositaCrepuscolo();
    expect(accendiAllAreeMutationMock.mutateAsync).toHaveBeenCalledWith({});
  });

  it('should call spegniAllAreeMutation.mutateAsync with expected arguments', () => {
    const viewModel = AreeViewModel();
    viewModel.diminuisciLuminositaCrepuscolo();
    expect(spegniAllAreeMutationMock.mutateAsync).toHaveBeenCalledWith({});
  });
});