import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import AreeView from '../../view/AreeView'; // Update the import path
import { IAreeViewModel } from '../../ViewModel/AreeViewModel'; // Update the import path
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
// Create a mock ViewModel with the necessary methods and properties
const mockViewModel: IAreeViewModel = {
  isLoading: jest.fn().mockReturnValue(false),
  aree: jest.fn().mockReturnValue([
    {
      ID: 1,
      città: 'City1',
      zona_geografica_città: 'Zone1',
      modalità_funzionamento: 'M',
    },
    {
      ID: 2,
      città: 'City2',
      zona_geografica_città: 'Zone2',
      modalità_funzionamento: 'A',
    },
  ]),
  aumentaLuminositaCrepuscolo: jest.fn(),
  diminuisciLuminositaCrepuscolo: jest.fn(),
};

test('renders AreeView component correctly', () => {
  render(<BrowserRouter><AreeView viewModel={mockViewModel} /></BrowserRouter>);

  // Check if the component renders correctly
  
  expect(screen.getByText('Impostazioni Aree')).toBeInTheDocument();

  // Check if the buttons are present and clickable
  const addButton = screen.getByText('Aggiungi nuova area');
  const increaseButton = screen.getByText('Aumenta Luminosità di tutte la aree');
  const decreaseButton = screen.getByText('Diminuisci Luminosità di tutte la aree');

  expect(addButton).toBeInTheDocument();
  expect(increaseButton).toBeInTheDocument();
  expect(decreaseButton).toBeInTheDocument();

  fireEvent.click(addButton);
  fireEvent.click(increaseButton);
  fireEvent.click(decreaseButton);

  expect(mockViewModel.aumentaLuminositaCrepuscolo).toHaveBeenCalledTimes(1);
  expect(mockViewModel.diminuisciLuminositaCrepuscolo).toHaveBeenCalledTimes(1);

  // Check if the list of areas is displayed
  expect(screen.getByText('Lista aree')).toBeInTheDocument();
  const area1 = screen.getByText('ID: 1');
  const area2 = screen.getByText('ID: 2');

  expect(area1).toBeInTheDocument();
  expect(area2).toBeInTheDocument();

  // Check if the "Dettagli Area" buttons are clickable
  const detailsButton1 = screen.getByRole('button', { name: 'Dettagli Area 1' });


  fireEvent.click(detailsButton1);

  
});

test('renders IsLoading', () => {
  mockViewModel.isLoading = jest.fn().mockReturnValue(true)
  render(<BrowserRouter><AreeView viewModel={mockViewModel} /></BrowserRouter>);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
});
