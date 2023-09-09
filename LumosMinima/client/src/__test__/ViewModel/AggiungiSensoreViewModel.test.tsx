import React from 'react';
import { renderHook } from '@testing-library/react';
import { AggiungiSensoreViewModel } from '../../ViewModel/AggiungiSensoreViewModel'; // Adjust the import path
const mockStore = {
    submitError:'',
    getAreaDetails: jest.fn().mockReturnValue({
        isLoading : true
    }),
    aggiungiSensoreMutation: {
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
    submitError:'',
    getAreaDetails: jest.fn().mockReturnValue({
        isLoading : true
    }),
    aggiungiSensoreMutation: {
    mutateAsync: jest.fn().mockReturnValue({
        isSuccess:true
      }),
  },
  clearSubmitError: jest.fn(),
  setSubmitError:jest.fn().mockImplementation(
    (errore:string) =>{
        mockStore.submitError=errore
    }
  )
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
    const { result } = renderHook(() => AggiungiSensoreViewModel());

    // Assert
    expect(result.current.areaDetails).toBeDefined();
    expect(result.current.submitIsError).toBeDefined();
    expect(result.current.submit).toBeDefined();
    expect(result.current.clearError).toBeDefined();
    expect(result.current.submitError).toBeDefined();
  });

  it('should call store methods when ViewModel functions are invoked', async () => {
    // Arrange
    const { result } = renderHook(() => AggiungiSensoreViewModel());

    // Act
    await result.current.areaDetails();
    await result.current.submitIsError();
    await result.current.clearError();
    await result.current.submit({preventDefault: jest.fn()});
    await result.current.submitError();

    // Assert
    expect(mockStore.getAreaDetails).toHaveBeenCalledWith(mockId);
    expect(mockStore.aggiungiSensoreMutation.mutateAsync).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("should setSubmitError and setSubmitHasError", async () => {
    mockStore.aggiungiSensoreMutation.mutateAsync.mockReturnValue({
      isError:true,
      error:{message:"errore generico"}
    })
    const { result } = renderHook(() => AggiungiSensoreViewModel());
    await result.current.submit({preventDefault: jest.fn()});
    expect(mockStore.aggiungiSensoreMutation.mutateAsync).toHaveBeenCalled()
    expect(mockStore.setSubmitError).toHaveBeenCalled()
    expect(mockStore.submitError).toBe("errore generico")
  })
});
