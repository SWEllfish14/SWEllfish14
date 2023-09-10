import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AggiungiGuastoView from '../../view/AggiungiGuastoView'; // Update the import path
import { IAggiungiGuastoViewModel } from '../../ViewModel/AggiungiGuastoViewModel'; // Update the import path
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

// Create a mock ViewModel with the necessary methods and properties
const mockViewModel: IAggiungiGuastoViewModel = {
  submit: jest.fn(),
  clearError: jest.fn(),
  submitIsError: jest.fn().mockReturnValue(false),
  submitError: jest.fn().mockReturnValue(''),
  areaDetails: jest.fn().mockReturnValue({
    data: {
      ID: 1, // Assuming some ID value
    },
  }),
};

test('renders AggiungiGuastoView component correctly', () => {
  render(
    <BrowserRouter>
      <AggiungiGuastoView viewModel={mockViewModel} />
    </BrowserRouter>
  );

  // Check if the component renders correctly
  expect(screen.getByText('Aggiunta guasto')).toBeInTheDocument();

  // Check if form elements are present
  expect(screen.getByLabelText('Data Rilevamento Guasto')).toBeInTheDocument();
  expect(screen.getByLabelText('Stato')).toBeInTheDocument();
  expect(screen.getByLabelText('Note aggiuntive')).toBeInTheDocument();
  expect(screen.getByLabelText('Id area illuminata afferenza')).toBeInTheDocument();
  expect(screen.getByTestId("id_area")).toBeInTheDocument();
  expect(screen.getByTestId("id_area")).toHaveValue("1")
  // Check if buttons are present
  const submitButton = screen.getByText('Conferma e Inserisci');
  const cancelButton = screen.getByText('Cancella campi');

  expect(submitButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();

  // Test form submission
  fireEvent.click(submitButton);
  expect(mockViewModel.submit).toHaveBeenCalled();

  // You can add more assertions based on your component's behavior
});

test('renders error message when submitIsError is true', () => {
  // Set submitIsError to true in the mock ViewModel
  mockViewModel.submitIsError = jest.fn().mockReturnValue(true);
  mockViewModel.submitError = jest.fn().mockReturnValue('Errore durante il submit.');

  render(
    <BrowserRouter>
      <AggiungiGuastoView viewModel={mockViewModel} />
    </BrowserRouter>
  );

  // Check if the error message is rendered when submitIsError is true
  expect(screen.getByText('Errore durante il submit.')).toBeInTheDocument();
});
