import React from 'react';
import { renderHook } from '@testing-library/react';
import { ModificaGuastoViewModel } from '../ViewModel/ModificaGuastoViewModel'; // Adjust the import path
const mockStore = {
  getGuastoDetails: jest.fn(),
  modificaGuastoMutation: {
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

describe('ModificaGuastoViewModel', () => {
  // Define mock data and functions for testing
  const mockId = '123';
  const mockStore = {
    getGuastoDetails: jest.fn().mockReturnValue({
        isLoading : true
    }),
    modificaGuastoMutation: {
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
    const { result } = renderHook(() => ModificaGuastoViewModel());

    // Assert
    expect(result.current.guastoDetails).toBeDefined();
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
    const { result } = renderHook(() => ModificaGuastoViewModel());

    // Act
    await result.current.guastoDetails();
    await result.current.isLoading();
    await result.current.isError();
    await result.current.error();
    await result.current.submitIsError();
    await result.current.clearError();
    await result.current.submit({preventDefault: jest.fn()});
    await result.current.submitError();

    // Assert
    expect(mockStore.getGuastoDetails).toHaveBeenCalledWith(mockId);
    expect(mockStore.modificaGuastoMutation.mutateAsync).toHaveBeenCalledWith({
      id: mockId,
      data: expect.any(FormData),
    });
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("should setSubmitError and setSubmitHasError", async () => {
    mockStore.modificaGuastoMutation.mutateAsync.mockReturnValue({
      isError:true,
      error:{message:"ca"}
    })
    const { result } = renderHook(() => ModificaGuastoViewModel());
    await result.current.submit({preventDefault: jest.fn()});
    expect(mockStore.modificaGuastoMutation.mutateAsync).toHaveBeenCalledWith({
      id: mockId,
      data: expect.any(FormData),
    });
    expect(mockStore.setSubmitError).toHaveBeenCalled()
  })
});
