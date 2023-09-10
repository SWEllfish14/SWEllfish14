import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AggiungiLampioneView from '../../view/AggiungiLampioneView'; // Update the import path
import { IAggiungiLampioneViewModel } from '../../ViewModel/AggiungiLampioneViewModel'; // Update the import path
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

// Create a mock ViewModel with the necessary methods and properties
const mockViewModel: IAggiungiLampioneViewModel = {
  aggiungiLampione: jest.fn(),
  clearError: jest.fn(),
  submitIsError: jest.fn().mockReturnValue(false),
  submitError: jest.fn().mockReturnValue(''),
  areaDetails: jest.fn().mockReturnValue({
    data: {
      ID: 1, // Assuming some ID value
    },
  }),
};

test('renders AggiungiLampioneView component correctly', () => {
  render(
    <BrowserRouter>
      <AggiungiLampioneView viewModel={mockViewModel} />
    </BrowserRouter>
  );

  // Check if the component renders correctly
  expect(screen.getByText('Aggiunta Lampione')).toBeInTheDocument();

  // Check if form elements are present
  expect(screen.getByLabelText('IP')).toBeInTheDocument();
  expect(screen.getByLabelText('Tipo interazione con il lampione')).toBeInTheDocument();
  expect(screen.getByLabelText('Luminosità standard')).toBeInTheDocument();
  expect(screen.getByLabelText('Luminosità Manuale')).toBeInTheDocument();
  expect(screen.getByLabelText('Stato')).toBeInTheDocument();
  expect(screen.getByLabelText('Id area illuminata afferenza')).toBeInTheDocument();

  // Check if buttons are present
  const submitButton = screen.getByText('Conferma e Inserisci');
  const areaInput = screen.getByRole('textbox', { name: /Id area illuminata afferenza/i });

  // Check if the input element is present
  expect(areaInput).toBeInTheDocument();

  // Check if the input element has the correct value
  expect(areaInput).toHaveValue('1');
  expect(submitButton).toBeInTheDocument();

  // Test form submission
  fireEvent.click(submitButton);
  expect(mockViewModel.aggiungiLampione).toHaveBeenCalled();

  // You can add more assertions based on your component's behavior
});

test('renders error message when submitIsError is true', () => {
  // Set submitIsError to true in the mock ViewModel
  mockViewModel.submitIsError = jest.fn().mockReturnValue(true);
  mockViewModel.submitError = jest.fn().mockReturnValue('Errore durante il submit.');

  render(
    <BrowserRouter>
      <AggiungiLampioneView viewModel={mockViewModel} />
    </BrowserRouter>
  );

  // Check if the error message is rendered when submitIsError is true
 
  expect(screen.getByText('Errore durante il submit.')).toBeInTheDocument();
});
