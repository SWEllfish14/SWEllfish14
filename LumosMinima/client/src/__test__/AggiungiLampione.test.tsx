import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AggiungiLampione } from '../pages/AggiungiLampione';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and AggiungiAreaView components
jest.mock('./__mocks__/AggiungiLampioneViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/AggiungiLampioneView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked AggiungiLampioneView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('AggiungiLampione', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  }); 

  // Test case 1: Verify that AggiungiLampioneView is rendered with ViewModel
  it('renders AggiungiLampioneView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <AggiungiLampione />
        </QueryClientProvider>
      );
    // Ensure that AggiungiLampioneView is rendered with ViewModel
    expect(screen.getByText('Mocked AggiungiLampioneView')).toBeInTheDocument();
  });

 
});