import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AreaDetails } from '../pages/AreaDetails';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and AggiungiAreaView components
jest.mock('./__mocks__/AreaDetailsViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/AreaDetailsView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked AreaDetailsView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('AreaDetails', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  }); 

  // Test case 1: Verify that AreaDetailsView is rendered with ViewModel
  it('renders AreaDetailsView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <AreaDetails />
        </QueryClientProvider>
      );
    // Ensure that AreaDetailsView is rendered with ViewModel
    expect(screen.getByText('Mocked AreaDetailsView')).toBeInTheDocument();
  });

 
});