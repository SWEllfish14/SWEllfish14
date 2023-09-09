import { GuastoDetailsViewModel } from '../../ViewModel/GuastoDetailsViewModel';
import { GuastiStore } from '../../stores/GuastiStore';
import { useInstance } from 'react-ioc';
import { useNavigate, useParams } from 'react-router-dom';

// Mock the dependencies (GuastiStore)
jest.mock('../../stores/GuastiStore', () => ({
  GuastiStore: jest.fn(),
}));

jest.mock('react-ioc', () => ({
  useInstance: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((initialState) => [initialState, jest.fn()]), // Mock useState
}));

describe('GuastoDetailsViewModel', () => {
  let guastiStoreMock: { getGuastoDetails: any; chiudiGuastoMutation: any; };
  let navigateMock: jest.Mock<any, any, any>;

  beforeEach(() => {
    // Reset the mocks and create a new instance for each test
    jest.clearAllMocks();

    guastiStoreMock = {
      getGuastoDetails: jest.fn(),
      chiudiGuastoMutation: {
        mutateAsync: jest.fn(),
      },
    };

    // Mock the dependencies
    require('react-ioc').useInstance.mockReturnValue(guastiStoreMock);
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });
    
    navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);
  });

  it('should call getGuastoDetails with the correct ID', () => {
    // Mock the getGuastoDetails response with data
    guastiStoreMock.getGuastoDetails.mockReturnValue({ data: { /* Your GuastoDetails data here */ } });
    
    const viewModel = GuastoDetailsViewModel();
    
    viewModel.guastoDetails();
    expect(guastiStoreMock.getGuastoDetails).toHaveBeenCalledWith('1');
  });

  it('should call chiudiGuastoMutation and navigate when chiudiGuasto is called', async () => {
    // Mock the chiudiGuastoMutation response
    guastiStoreMock.chiudiGuastoMutation.mutateAsync.mockResolvedValue({ isSuccess: true });
    
    const viewModel = GuastoDetailsViewModel();
    
    await viewModel.chiudiGuasto();
    
    // Ensure chiudiGuastoMutation and navigate were called
    expect(guastiStoreMock.chiudiGuastoMutation.mutateAsync).toHaveBeenCalledWith({ id: '1' });
    expect(navigateMock).toHaveBeenCalledWith('/guasti');
  });

  // Add more test cases for other functions
});