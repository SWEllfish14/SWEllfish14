import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ListaSensori } from '../pages/ListaSensori';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and ListaSensoriView components
jest.mock('./__mocks__/ListaSensoriViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/ListaSensoriView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked ListaSensoriView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('ListaSensori', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  });

  // Test case 1: Verify that ListaSensoriView is rendered with ViewModel
  it('renders ListaSensoriView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <ListaSensori />
        </QueryClientProvider>
      );
    // Ensure that ListaSensoriView is rendered with ViewModel
    expect(screen.getByText('Mocked ListaSensoriView')).toBeInTheDocument();
  });

 
});