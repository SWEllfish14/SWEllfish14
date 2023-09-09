import React from 'react';
import { renderHook } from '@testing-library/react';
import { AggiungiLampioneViewModel } from '../../ViewModel/AggiungiLampioneViewModel'; // Adjust the import path
const mockStore = {
    getAreaDetails: jest.fn().mockReturnValue({
        isLoading : true
    }),
    aggiungiLampioneMutation: {
    mutateAsync: jest.fn(),
  },
  clearSubmitError: jest.fn(),
  setSubmitError:jest.fn()
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
    getAreaDetails: jest.fn().mockReturnValue({
        isLoading : true
    }),
    aggiungiLampioneMutation: {
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
    const { result } = renderHook(() => AggiungiLampioneViewModel());

    // Assert
    expect(result.current.areaDetails).toBeDefined();
    expect(result.current.submitIsError).toBeDefined();
    expect(result.current.aggiungiLampione).toBeDefined();
    expect(result.current.clearError).toBeDefined();
    expect(result.current.submitError).toBeDefined();
  });

  it('should call store methods when ViewModel functions are invoked', async () => {
    // Arrange
    const { result } = renderHook(() => AggiungiLampioneViewModel());

    // Act
    await result.current.areaDetails();
    await result.current.submitIsError();
    await result.current.clearError();
    await result.current.aggiungiLampione({preventDefault: jest.fn()});
    await result.current.submitError();

    // Assert
    expect(mockStore.getAreaDetails).toHaveBeenCalledWith(mockId);
    expect(mockStore.aggiungiLampioneMutation.mutateAsync).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("should setSubmitError and setSubmitHasError", async () => {
    mockStore.aggiungiLampioneMutation.mutateAsync.mockReturnValue({
      isError:true,
      error:{message:"errore generico"}
    })
    const { result } = renderHook(() => AggiungiLampioneViewModel());
    await result.current.aggiungiLampione({preventDefault: jest.fn()});
    expect(mockStore.aggiungiLampioneMutation.mutateAsync).toHaveBeenCalled()
    expect(mockStore.setSubmitError).toHaveBeenCalled()
  })
});
