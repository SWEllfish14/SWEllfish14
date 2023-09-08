import React from 'react';
import { renderHook } from '@testing-library/react';
import { ModificaLampioneViewModel } from '../ViewModel/ModificaLampioneViewModel'; // Adjust the import path
const mockStore = {
  getLampioneDetails: jest.fn(),
  modificaLampioneMutation: {
    mutateAsync: jest.fn(),
  },
  deleteLampioneMutation: {
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

describe('ModificaLampioneViewModel', () => {
  // Define mock data and functions for testing
  const mockId = '123';
  const mockStore = {
    getdettagliLampioni: jest.fn().mockReturnValue({
      isLoading : true
  }),
    modificaLampioneMutation: {
      mutateAsync: jest.fn().mockReturnValue({
        isSuccess:true
      }),
    },
    deleteLampioneMutation: {
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
    const { result } = renderHook(() => ModificaLampioneViewModel());

    // Assert
    expect(result.current.dettagliLampione).toBeDefined();
    expect(result.current.isLoading).toBeDefined();
    expect(result.current.isError).toBeDefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.submitIsError).toBeDefined();
    expect(result.current.modificaLampione).toBeDefined();
    expect(result.current.clearError).toBeDefined();
    expect(result.current.submitError).toBeDefined();
  });

  it('should call store methods when ViewModel functions are invoked', async () => {
    // Arrange
    const { result } = renderHook(() => ModificaLampioneViewModel());

    // Act
    await result.current.dettagliLampione();
    await result.current.isLoading();
    await result.current.isError();
    await result.current.error();
    await result.current.submitIsError();
    await result.current.clearError();
    await result.current.modificaLampione({preventDefault: jest.fn()});
    await result.current.submitError();
    await result.current.eliminaLampione()

    // Assert
    expect(mockStore.getdettagliLampioni).toHaveBeenCalledWith(mockId);
    expect(mockStore.modificaLampioneMutation.mutateAsync).toHaveBeenCalled()
    expect(mockStore.deleteLampioneMutation.mutateAsync).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("should setSubmitError and setSubmitHasError", async () => {
    mockStore.modificaLampioneMutation.mutateAsync.mockReturnValue({
      isError:true,
      error:{message:"ca"}
    })
    const { result } = renderHook(() => ModificaLampioneViewModel());
    await result.current.modificaLampione({preventDefault: jest.fn()});
    expect(mockStore.modificaLampioneMutation.mutateAsync).toHaveBeenCalled()
    expect(mockStore.setSubmitError).toHaveBeenCalled()
  })
});
