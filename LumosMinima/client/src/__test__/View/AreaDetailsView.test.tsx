import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Use BrowserRouter in testing
import AreaDetailsView from '../../view/AreaDetailsView'; // Adjust the import path as needed
import { IAreaDetailsViewModel } from '../../ViewModel/AreaDetailsViewModel'; // Import your ViewModel
import '@testing-library/jest-dom';
// Mock the ViewModel with necessary functions and data
const mockViewModel: IAreaDetailsViewModel = {
  modalita:true,
  isLoading: jest.fn().mockReturnValue(false),
  isError: jest.fn().mockReturnValue(false),
  error: jest.fn().mockReturnValue(null),
  areaDetails: jest.fn().mockReturnValue({
    data: {
      ID: 1,
      città: 'Test City',
      zona_geografica_città: 'Test Zone',
      modalità_funzionamento: 'M',
      stato: 0,
      luminosità_standard: 5,
    },
  }),
  accendiArea:jest.fn(),
  spegniLampioniArea: jest.fn(),
  accendiLampioniArea: jest.fn(),
  cambiaModalità: jest.fn(),
  aumentaLuminosità: jest.fn(),
  diminuisciLuminosità: jest.fn(),
  eliminaArea: jest.fn(),
  submitHasError: false, 
  errorMessage: 'Test Error Message', 
};

describe('AreaDetailsView component', () => {
  it('renders correctly when loading', () => {
    mockViewModel.isLoading = jest.fn().mockReturnValue(true);
    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders correctly without error', () => {
    mockViewModel.isLoading = jest.fn().mockReturnValue(false);
    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    expect(screen.getByText('Dettagli area')).toBeInTheDocument();
    // Add more assertions for other elements based on your test case
  });
  

  
 
  it('handles "Accendi Lampioni Area" button click', () => {
    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    const accendiLampioniButton = screen.getByText('Accendi Lampioni');
    fireEvent.click(accendiLampioniButton);

    // Add assertions to check how it handles "Accendi Lampioni Area" button click
    expect(mockViewModel.accendiLampioniArea).toHaveBeenCalled();
  });
  it('handles "Aumenta Luminosità" button click', () => {
    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    const aumentaLuminositàButton = screen.getByText('Aumenta Luminosità');
    fireEvent.click(aumentaLuminositàButton);

    // Add assertions to check how it handles "Aumenta Luminosità" button click
    expect(mockViewModel.aumentaLuminosità).toHaveBeenCalled();
  });

  it('handles "Diminuisci Luminosità" button click', () => {
    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    const diminuisciLuminositàButton = screen.getByText('Diminuisci Luminosità');
    fireEvent.click(diminuisciLuminositàButton);

    // Add assertions to check how it handles "Diminuisci Luminosità" button click
    expect(mockViewModel.diminuisciLuminosità).toHaveBeenCalled();
  });
  it('handles "Spegni Lampioni Area" button click', () => {
    mockViewModel.areaDetails= jest.fn().mockReturnValue({
      data: {
        ID: 1,
        città: 'Test City',
        zona_geografica_città: 'Test Zone',
        modalità_funzionamento: 'M',
        stato: 1,
        luminosità_standard: 5,
      },
    })
    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    const spegniLampioniButton = screen.getByText('Spegni lampioni');
    fireEvent.click(spegniLampioniButton);

    // Add assertions to check how it handles "Spegni Lampioni Area" button click
    expect(mockViewModel.spegniLampioniArea).toHaveBeenCalled();
  });
  it('handles "Cambia Modalità" button click', () => {
    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    const cambiaModalitàButton = screen.getByLabelText('Manuale');
    fireEvent.click(cambiaModalitàButton);

    // Add assertions to check how it handles "Cambia Modalità" button click
    expect(mockViewModel.cambiaModalità).toHaveBeenCalled();
  });

  

  it('handles "Elimina Area" button click', () => {
    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    const eliminaAreaButton = screen.getByText('Elimina area');
    fireEvent.click(eliminaAreaButton);

    // Add assertions to check how it handles "Elimina Area" button click
    expect(mockViewModel.eliminaArea).toHaveBeenCalled();
  });

  it('handles error state correctly', () => {
    mockViewModel.isError = jest.fn().mockReturnValue(true);
    mockViewModel.error = jest.fn().mockReturnValue({ message: 'Test Error Message' });

    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    expect(screen.getByText('Error: Test Error Message')).toBeInTheDocument();
    // Add more assertions for error handling based on your test case
  });
  it('stato acceso', () => {
    mockViewModel.isError = jest.fn().mockReturnValue(false);
    mockViewModel.areaDetails = jest.fn().mockReturnValue({
      data: {
        ID: 1,
        città: 'Test City',
        zona_geografica_città: 'Test Zone',
        modalità_funzionamento: 'M',
        stato: 1,
        luminosità_standard: 5,
      },
    })
    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    expect(screen.getByText('Stato : Acceso')).toBeInTheDocument();
    // Add more assertions for error handling based on your test case
  });
  it('modalità automatica', () => {
    mockViewModel.isError = jest.fn().mockReturnValue(false);
    mockViewModel.areaDetails = jest.fn().mockReturnValue({
      data: {
        ID: 1,
        città: 'Test City',
        zona_geografica_città: 'Test Zone',
        modalità_funzionamento: 'A',
        stato: 1,
        luminosità_standard: 5,
      },
    })
    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    expect(screen.getByText('Luminosità in modalità automatica: 5')).toBeInTheDocument();
    // Add more assertions for error handling based on your test case
  });
  it('handles submit error correctly', () => {
    mockViewModel.submitHasError = true;
  

    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    // Add more assertions for error handling based on your test case
  });

  it('renders correctly data undefined', () => {
    mockViewModel.areaDetails = jest.fn().mockReturnValue({data:undefined});
  

    render(
      <Router>
        <AreaDetailsView viewModel={mockViewModel} />
      </Router>
    );

    // Add more assertions for error handling based on your test case
  });
  // Add more test cases to cover different scenarios and interactions
});
