import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from '../pages/Home';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and HomeView components
jest.mock('./__mocks__/HomeViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/HomeView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked HomeView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('Home', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  });

  // Test case 1: Verify that HomeView is rendered with ViewModel
  it('renders HomeView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      );
    // Ensure that HomeView is rendered with ViewModel
    expect(screen.getByText('Mocked HomeView')).toBeInTheDocument();
  });

 
});