import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AggiungiSensoreView from '../../view/AggiungiSensoreView'; // Adjust the import path as needed
import { IAggiungiSensoreViewModel } from '../../ViewModel/AggiungiSensoreViewModel'; // Adjust the import path as needed
import '@testing-library/jest-dom'
// Mock the view model
const mockViewModel: IAggiungiSensoreViewModel = {
  submit: jest.fn(),
  submitIsError: jest.fn().mockReturnValue(false),
  submitError: jest.fn(),
  clearError: jest.fn(),
  areaDetails: jest.fn().mockReturnValue({
    data: {
      ID: 1,
      // Add other properties as needed for your test
    },
  }),
};

test('renders AggiungiSensoreView component correctly', () => {
  render(<AggiungiSensoreView viewModel={mockViewModel} />);

  // Check if the component renders correctly
  expect(screen.getByText('Aggiunta sensore')).toBeInTheDocument();

  // Check if form inputs are present
  expect(screen.getByLabelText('Indirizzo IP sensore')).toBeInTheDocument();
  expect(screen.getByLabelText('Polling time sensore')).toBeInTheDocument();
  expect(screen.getByLabelText('Zona Geografica')).toBeInTheDocument();
  expect(screen.getByLabelText('Stato')).toBeInTheDocument();
  expect(screen.getByLabelText('Raggio azione del sensore')).toBeInTheDocument();
  expect(screen.getByLabelText('Id area illuminata afferenza')).toBeInTheDocument();

  // Check if buttons are present
  expect(screen.getByText('Conferma e Inserisci')).toBeInTheDocument();
  // Uncomment the following line if you want to test the "Cancella campi" button
  // expect(screen.getByText('Cancella campi')).toBeInTheDocument();

  // Simulate form submission
  fireEvent.submit(screen.getByRole('form'));

  // Verify that the submit function was called
  expect(mockViewModel.submit).toHaveBeenCalled();

  // You can add more assertions based on the component's behavior
});

test('handles form submission with error', () => {
  // Modify the viewModel to return true for submitIsError
  mockViewModel.submitIsError = jest.fn().mockReturnValue(true);
  mockViewModel.submitError = jest.fn().mockReturnValue('Errore durante il submit.');
  render(<AggiungiSensoreView viewModel={mockViewModel} />);
  
  // Simulate form submission
  fireEvent.submit(screen.getByRole('form'));
  
  
  // Verify that the error message is displayed
  expect(screen.getByText('Errore durante il submit.')).toBeInTheDocument();
});

test('handles form input changes', () => {
  render(<AggiungiSensoreView viewModel={mockViewModel} />);
  
  // Simulate user input
  const ipInput = screen.getByLabelText('Indirizzo IP sensore');
  fireEvent.change(ipInput, { target: { value: 'new-ip-value' } });
  
  // Verify that the component's state is updated correctly
  expect(ipInput).toHaveValue('new-ip-value');
});

test('calls clearError on form focus', () => {
  render(<AggiungiSensoreView viewModel={mockViewModel} />);
  
  // Simulate form focus
  fireEvent.focus(screen.getByRole('form'));
  
  // Verify that the clearError function was called
  expect(mockViewModel.clearError).toHaveBeenCalled();
});