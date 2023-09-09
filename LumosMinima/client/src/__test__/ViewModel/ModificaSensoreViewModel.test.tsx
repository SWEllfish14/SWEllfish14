import React from 'react';
import { renderHook } from '@testing-library/react';
import { ModificaSensoreViewModel } from '../../ViewModel/ModificaSensoreViewModel'; // Adjust the import path
const mockStore = {
    getdettagliSensori: jest.fn(),
  modificaSensoreMutation: {
    mutateAsync: jest.fn(),
  },
  eliminaSensoreMutation: {
    mutateAsync: jest.fn(),
  },
  clearSubmitError: jest.fn()
};
const mockNavigate = jest.fn();
// Mock the necessary dependencies
jest.mock('react-ioc', () => ({
  useInstance: jest.fn(() => mockStore),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate:() => mockNavigate,
}));

describe('ModificaSensoreViewModel', () => {
  // Define mock data and functions for testing
  const mockId = '123';
  const mockStore = {
    getdettagliSensori: jest.fn().mockReturnValue({
      isLoading : true
  }),
    modificaSensoreMutation: {
      mutateAsync: jest.fn().mockReturnValue({
        isSuccess:true
      }),
    },
    eliminaSensoreMutation: {
      mutateAsync: jest.fn().mockReturnValue({
        isSuccess:true
      }),
    },
    clearSubmitError: jest.fn(),
    setSubmitError:jest.fn()
  };


  // Mock the useParams and useInstance hooks
  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useParams.mockReturnValue({ id: mockId });
    require('react-ioc').useInstance.mockReturnValue(mockStore);
  });
 
  it('should return the expected ViewModel', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => ModificaSensoreViewModel());

    // Assert
    expect(result.current.sensoreDetails).toBeDefined();
    expect(result.current.isLoading).toBeDefined();
    expect(result.current.isError).toBeDefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.submitIsError).toBeDefined();
    expect(result.current.submit).toBeDefined();
    expect(result.current.clearError).toBeDefined();
    expect(result.current.submitError).toBeDefined();
  });

  it('should call store methods when ViewModel functions are invoked', async () => {
    // Arrange
    const { result } = renderHook(() => ModificaSensoreViewModel());

    // Act
    await result.current.sensoreDetails();
    await result.current.isLoading();
    await result.current.isError();
    await result.current.error();
    await result.current.submitIsError();
    await result.current.clearError();
    await result.current.submit({preventDefault: jest.fn()});
    await result.current.submitError();
    await result.current.eliminaSensore()

    // Assert
    expect(mockStore.getdettagliSensori).toHaveBeenCalledWith(mockId);
    expect(mockStore.modificaSensoreMutation.mutateAsync).toHaveBeenCalled()
    expect(mockStore.eliminaSensoreMutation.mutateAsync).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("should setSubmitError and setSubmitHasError", async () => {
    mockStore.modificaSensoreMutation.mutateAsync.mockReturnValue({
      isError:true,
      error:{message:"ca"}
    })
    const { result } = renderHook(() => ModificaSensoreViewModel());
    await result.current.submit({preventDefault: jest.fn()});
    expect(mockStore.modificaSensoreMutation.mutateAsync).toHaveBeenCalled()
    expect(mockStore.setSubmitError).toHaveBeenCalled()
  })
});
