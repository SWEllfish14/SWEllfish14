import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GuastoDetails } from '../pages/GuastoDetails';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and GuastoDetailsView components
jest.mock('./__mocks__/GuastoDetailsViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/GuastoDetailsView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked GuastoDetailsView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('GuastoDetails', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  });

  // Test case 1: Verify that GuastoDetailsView is rendered with ViewModel
  it('renders GuastoDetailsView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <GuastoDetails />
        </QueryClientProvider>
      );
    // Ensure that GuastoDetailsView is rendered with ViewModel
    expect(screen.getByText('Mocked GuastoDetailsView')).toBeInTheDocument();
  });

 
});