import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestioneAree } from '../pages/GestioneAree';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and AreeView components
jest.mock('./__mocks__/AreeViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/AreeView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked AreeView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('GestioneAree', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  });

  // Test case 1: Verify that AreeView is rendered with ViewModel
  it('renders AreeView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <GestioneAree />
        </QueryClientProvider>
      );
    // Ensure that AreeView is rendered with ViewModel
    expect(screen.getByText('Mocked AreeView')).toBeInTheDocument();
  });

 
});