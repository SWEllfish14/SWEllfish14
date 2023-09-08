import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from '../pages/Login';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and LoginView components
jest.mock('./__mocks__/LoginViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/LoginView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked LoginView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('Login', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  });

  // Test case 1: Verify that LoginView is rendered with ViewModel
  it('renders LoginView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      );
    // Ensure that LoginView is rendered with ViewModel
    expect(screen.getByText('Mocked LoginView')).toBeInTheDocument();
  });

 
});