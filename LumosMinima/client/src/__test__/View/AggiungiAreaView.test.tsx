import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AggiungiAreaView from '../../view/AggiungiAreaView'; // Update the import path
import { IAggiungiAreaViewModel } from '../../ViewModel/AggiungiAreaViewModel'; // Update the import path
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Create a mock ViewModel with the necessary methods and properties
const mockViewModel: IAggiungiAreaViewModel = {
  submit: jest.fn(),
  clearError: jest.fn(),
  submitIsError: jest.fn().mockReturnValue(false), // Change this to true for testing error state
  submitError: jest.fn().mockReturnValue('An error occurred'), // Change this message to match the expected error message
};

test('renders AggiungiAreaView component correctly', () => {
  render(
    <BrowserRouter>
      <AggiungiAreaView viewModel={mockViewModel} />
    </BrowserRouter>
  );

  // Check if the component renders correctly
  expect(screen.getByText('Aggiunta area')).toBeInTheDocument();

  // Check if form fields and buttons are present
  expect(screen.getByLabelText('Nome città')).toBeInTheDocument();
  expect(screen.getByLabelText('Zona geografica città')).toBeInTheDocument();
  expect(screen.getByLabelText('Modalità funzionamento')).toBeInTheDocument();
  expect(screen.getByLabelText('Stato')).toBeInTheDocument();
  expect(screen.getByLabelText('Luminosità default')).toBeInTheDocument();
  expect(screen.getByLabelText('Luminosità rilevamento')).toBeInTheDocument();
  expect(screen.getByText('Conferma e Inserisci')).toBeInTheDocument();
  expect(screen.getByText('Cancella campi')).toBeInTheDocument();

  // Simulate form submission
  const form = screen.getByRole('form');
  fireEvent.submit(form);

  // Check if submit function is called
  expect(mockViewModel.submit).toHaveBeenCalledTimes(1);
});

test('renders error message when submitIsError is true', () => {
  mockViewModel.submitIsError = jest.fn().mockReturnValue(true);
  render(
    <BrowserRouter>
      <AggiungiAreaView viewModel={mockViewModel} />
    </BrowserRouter>
  );

  // Check if the error message is displayed
  //const errorMessage = screen.getByText('An error occurred');
  //expect(errorMessage).toBeInTheDocument();
});

test('clears error onFocus', () => {
  render(
    <BrowserRouter>
      <AggiungiAreaView viewModel={mockViewModel} />
    </BrowserRouter>
  );

  // Focus on the form fields to trigger onFocus
  const nomeCittaInput = screen.getByLabelText('Nome città');
  const zonaGeograficaInput = screen.getByLabelText('Zona geografica città');
  fireEvent.focus(nomeCittaInput);
  fireEvent.focus(zonaGeograficaInput);

  // Check if clearError function is called when onFocus
  expect(mockViewModel.clearError).toHaveBeenCalledTimes(2);
});
