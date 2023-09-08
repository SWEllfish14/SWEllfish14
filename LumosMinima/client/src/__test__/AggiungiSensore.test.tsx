import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AggiungiSensore } from '../pages/AggiungiSensore';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and AggiungiAreaView components
jest.mock('./__mocks__/AggiungiSensoreViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/AggiungiSensoreView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked AggiungiSensoreView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('AggiungiSensore', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  }); 

  // Test case 1: Verify that AggiungiSensoreView is rendered with ViewModel
  it('renders AggiungiSensoreView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <AggiungiSensore />
        </QueryClientProvider>
      );
    // Ensure that AggiungiLampioneView is rendered with ViewModel
    expect(screen.getByText('Mocked AggiungiSensoreView')).toBeInTheDocument();
  });

 
});