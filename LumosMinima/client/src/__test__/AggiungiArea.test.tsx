import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AggiungiArea } from '../pages/AggiungiArea';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and AggiungiAreaView components
jest.mock('./__mocks__/AggiungiAreaViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/AggiungiAreaView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked AggiungiAreaView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('AggiungiArea', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  });

  // Test case 1: Verify that AggiungiAreaView is rendered with ViewModel
  it('renders AggiungiAreaView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <AggiungiArea />
        </QueryClientProvider>
      );
    // Ensure that AggiungiAreaView is rendered with ViewModel
    expect(screen.getByText('Mocked AggiungiAreaView')).toBeInTheDocument();
  });

 
});