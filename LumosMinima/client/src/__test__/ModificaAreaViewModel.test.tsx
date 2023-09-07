import { ModificaAreaViewModel } from '../ViewModel/ModificaAreaViewModel';

describe('ModificaAreaViewModel', () => {
  // Define mock functions and data for testing
  const mockParams = { id: '1' };
  const mockAreeStore = {
    getAreaDetails: jest.fn(),
    modificaAreaMutation: {
      mutateAsync: jest.fn(),
    },
  };
  const mockNavigate = jest.fn();

  // Mock the necessary dependencies
  jest.mock('react-ioc', () => ({
    useInstance: jest.fn(() => mockAreeStore),
  }));
  jest.mock('react-router-dom', () => ({
    useParams: jest.fn(() => mockParams),
    useNavigate: jest.fn(() => mockNavigate),
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the expected ViewModel', async () => {
    // Arrange

    // Act
    const viewModel = ModificaAreaViewModel();

    // Assert
    expect(viewModel.areaDetails).toBeDefined();
    expect(viewModel.isLoading).toBeDefined();
    expect(viewModel.isError).toBeDefined();
    expect(viewModel.error).toBeDefined();
    expect(viewModel.submitIsError).toBeDefined();
    expect(viewModel.submit).toBeDefined();
    expect(viewModel.clearError).toBeDefined();
    expect(viewModel.submitError).toBeDefined();
  });

  it('should call store methods when ViewModel functions are invoked', async () => {
    // Arrange
    const viewModel = ModificaAreaViewModel();

    // Act
    viewModel.areaDetails();
    viewModel.isLoading();
    viewModel.isError();
    viewModel.error();
    viewModel.submitIsError();
    viewModel.clearError();
    viewModel.submit({});
    viewModel.submitError();

    // Assert
    expect(mockAreeStore.getAreaDetails).toHaveBeenCalledWith(mockParams.id);
    expect(mockAreeStore.modificaAreaMutation.mutateAsync).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalled();
  });
});