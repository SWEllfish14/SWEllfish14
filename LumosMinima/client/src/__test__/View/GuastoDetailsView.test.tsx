import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GuastoDetailsView from '../../view/GuastoDetailsView'; // Adjust the import path as needed
import { IGuastoDetailsViewModel } from '../../ViewModel/GuastoDetailsViewModel'; // Adjust the import path as needed
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';

// Mock the view model
const mockViewModel: IGuastoDetailsViewModel = {
  isLoading: jest.fn().mockReturnValue(false),
  isError: jest.fn().mockReturnValue(false),
  error: jest.fn().mockReturnValue(null),
  guastoDetails: jest.fn().mockReturnValue({
    data: {
      ID: 1,
      data_rilevamento: '2023-09-04',
      id_area_illuminata: 123,
      stato: '0',
      note: 'Test Note',
    },
  }),
  chiudiGuasto: jest.fn(),
};

test('renders GuastoDetailsView component correctly', () => {
  render(<BrowserRouter><GuastoDetailsView viewModel={mockViewModel} /> </BrowserRouter>);

  // Check if the component renders correctly
  expect(screen.getByText('Impostazioni Guasto')).toBeInTheDocument();
  expect(screen.getByText('ID: 1')).toBeInTheDocument();
  expect(screen.getByText('Data rilevamento: 2023-09-04')).toBeInTheDocument();
  expect(screen.getByText('Id area: 123')).toBeInTheDocument();
  expect(screen.getByText('Stato: Non risolto')).toBeInTheDocument();
  expect(screen.getByText('Note: Test Note')).toBeInTheDocument();
  
  // Verify that the "Chiudi Guasto" button is present
  expect(screen.getByText('Chiudi Guasto')).toBeInTheDocument();

  // Verify that the "Modifica dettagli guasto" button is present
  expect(screen.getByText('Modifica dettagli guasto')).toBeInTheDocument();
});

test('displays loading state', () => {
    mockViewModel.isLoading = jest.fn().mockReturnValue(true);

  render(<BrowserRouter><GuastoDetailsView viewModel={mockViewModel} /> </BrowserRouter>);

  // Check if the loading message is displayed
  expect(screen.getByText('Loading...')).toBeInTheDocument();

});

test('displays error state', () => {
    mockViewModel.isError = jest.fn().mockReturnValue(true);
  render(<BrowserRouter><GuastoDetailsView viewModel={mockViewModel} /> </BrowserRouter>);

  // Check if the error message is displayed
  const errorMessage = screen.getByText(/Error:/i);
    expect(errorMessage).toBeInTheDocument();
});

test('clicking the "Chiudi Guasto" button calls chiudiGuasto function', () => {
    render(<BrowserRouter><GuastoDetailsView viewModel={mockViewModel} /> </BrowserRouter>);

  // Click the "Chiudi Guasto" button
  fireEvent.click(screen.getByText('Chiudi Guasto'));

  // Verify that the chiudiGuasto function was called
  expect(mockViewModel.chiudiGuasto).toHaveBeenCalled();
});

test('renders nothing when stato 1', () => {
    mockViewModel.guastoDetails().data!.stato="1";
    render(<BrowserRouter><GuastoDetailsView viewModel={mockViewModel} /> </BrowserRouter>);
  
    // Check if the component renders correctly
    expect(screen.queryByText('Impostazioni Guasto')).not.toBeInTheDocument();
    
  });
  test('renders component when stato is not 1', () => {
    mockViewModel.guastoDetails().data!.stato = "0"; // Set stato to a value other than 1
    render(<BrowserRouter><GuastoDetailsView viewModel={mockViewModel} /></BrowserRouter>);
  
    // Check if the component renders correctly
    expect(screen.getByText('Impostazioni Guasto')).toBeInTheDocument();
    // Add more assertions based on your component's behavior when stato is not 1
  });

  test('guastoDetails data undefined', () => {
    mockViewModel.guastoDetails= jest.fn().mockReturnValue({data:undefined}) ; // Set stato to a value other than 1
    render(<BrowserRouter><GuastoDetailsView viewModel={mockViewModel} /></BrowserRouter>);
  
    // Check if the component renders correctly
    expect(screen.getByText('ID:')).toBeInTheDocument();
    expect(screen.getByText('Data rilevamento:')).toBeInTheDocument();
    expect(screen.getByText('Id area:')).toBeInTheDocument();
    expect(screen.getByText('Note:')).toBeInTheDocument();
   
  });