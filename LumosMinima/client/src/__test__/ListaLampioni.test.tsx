import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ListaLampioni } from '../pages/ListaLampioni';
import '@testing-library/jest-dom/extend-expect';
const mockNavigate = jest.fn();

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
// Mock ViewModel and ListaLampioniView components
jest.mock('./__mocks__/ListaLampioniViewModel', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    // Mock ViewModel functions as needed
  })),
}));
jest.mock('../view/ListaLampioniView', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked ListaLampioniView</div>),
}));

// Create a mock QueryClient
const queryClient = new QueryClient();

// Define test suites
describe('ListaLampioni', () => {
  // Define a beforeEach block to render the component
  beforeEach(() => {
    
  });

  // Test case 1: Verify that ListaLampioniView is rendered with ViewModel
  it('renders ListaLampioniView with ViewModel', () => {
    render(
        <QueryClientProvider client={queryClient}>
          <ListaLampioni />
        </QueryClientProvider>
      );
    // Ensure that ListaLampioniView is rendered with ViewModel
    expect(screen.getByText('Mocked ListaLampioniView')).toBeInTheDocument();
  });

 
});