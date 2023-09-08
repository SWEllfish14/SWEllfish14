import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AggiungiGuasto } from '../pages/AggiungiGuasto';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and AggiungiAreaView components
jest.mock('./__mocks__/AggiungiGuastoViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/AggiungiGuastoView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked AggiungiGuastoView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('AggiungiGuasto', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  }); 

  // Test case 1: Verify that AggiungiGuastoView is rendered with ViewModel
  it('renders AggiungiGuastoView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <AggiungiGuasto />
        </QueryClientProvider>
      );
    // Ensure that AggiungiGuastoView is rendered with ViewModel
    expect(screen.getByText('Mocked AggiungiGuastoView')).toBeInTheDocument();
  });

 
});