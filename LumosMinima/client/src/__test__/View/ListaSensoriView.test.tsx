import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IListaSensoriViewModel } from '../../ViewModel/ListaSensoriViewModel'; // Import your ViewModel
import '@testing-library/jest-dom';
import ListaSensoriView from '../../view/ListaSensoriView'; // Adjust the import path as needed

// Mock the ViewModel
const mockViewModel: IListaSensoriViewModel = {
  isLoading: jest.fn().mockReturnValue(false),
  listaSensori: jest.fn().mockReturnValue([
    {
      ID: 1,
      IP: '192.168.1.1',
      tipo_interazione: 'Tipo 1',
      polling_time: 100,
      raggio_azione: 10,
    },
    {
      ID: 2,
      IP: '192.168.1.2',
      tipo_interazione: 'Tipo 2',
      polling_time: 200,
      raggio_azione: 20,
    },
  ]),
};

test('renders ListaSensoriView component correctly', () => {
  render(
    <BrowserRouter>
      <ListaSensoriView viewModel={mockViewModel} />
    </BrowserRouter>
  );

  // Check if the component renders correctly
  expect(screen.getByText('Lista Sensori')).toBeInTheDocument();

  // Check if the loading message is not displayed
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

  // Check if the Sensor details are rendered correctly
  expect(screen.getByText('ID: 1')).toBeInTheDocument();
  expect(screen.getByText('IP: 192.168.1.1')).toBeInTheDocument();
  expect(screen.getByText('Tipo interazione: Tipo 1, Polling time: 100 ms, Raggio Azione : 10 metri')).toBeInTheDocument();
  
  expect(screen.getByText('ID: 2')).toBeInTheDocument();
  expect(screen.getByText('IP: 192.168.1.2')).toBeInTheDocument();
  expect(screen.getByText('Tipo interazione: Tipo 2, Polling time: 200 ms, Raggio Azione : 20 metri')).toBeInTheDocument();

  // Check if the "Modifica dettagli Sensore" button is present for both sensors
  const modificaButtons = screen.getAllByText('Modifica dettagli Sensore');
  expect(modificaButtons).toHaveLength(2);
});
test('renders isLoading', () => {
    mockViewModel.isLoading = jest.fn().mockReturnValue(true)
    render(
      <BrowserRouter>
        <ListaSensoriView viewModel={mockViewModel} />
      </BrowserRouter>
    );

    // Check if the loading message is  displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();

  });