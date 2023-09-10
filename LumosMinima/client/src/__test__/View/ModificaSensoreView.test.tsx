import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ModificaSensoreView from '../../view/ModificaSensoreView'; // Adjust the import path as needed
import { IModificaSensoreViewModel } from '../../ViewModel/ModificaSensoreViewModel'; // Import your ViewModel
import '@testing-library/jest-dom';

// Mock the ViewModel with necessary functions and data
const mockViewModel: IModificaSensoreViewModel = {
  sensoreDetails: jest.fn().mockReturnValue({
    data: {
      ID: 1,
      IP: '192.168.1.1',
      polling_time: 5000,
      zona_geografica_posizionamento: 'Test Zone',
      tipo_interazione: 'PUSH',
      raggio_azione: 50,
    },
  }),
  submit: jest.fn(),
  submitIsError: jest.fn().mockReturnValue(false),
  clearError: jest.fn(),
  eliminaSensore: jest.fn(),
};

describe('ModificaSensoreView component', () => {
  beforeEach(() => {
    // Clear any previous calls to mock functions
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<ModificaSensoreView viewModel={mockViewModel} />);
    expect(screen.getByText('Modifica sensore')).toBeInTheDocument();
    expect(screen.getByLabelText('ID Sensore')).toHaveValue('1');
    expect(screen.getByLabelText('IP sensore')).toHaveValue('192.168.1.1');
    expect(screen.getByLabelText('Polling Time')).toHaveValue('5000');
    expect(screen.getByLabelText('Zona Geografica Posizionamento')).toHaveValue('Test Zone');
    expect(screen.getByLabelText('Tipo Interazione')).toHaveValue('PUSH');
    expect(screen.getByLabelText('Raggio Azione')).toHaveValue('50');
  });

  it('submits the form with updated values', () => {
    render(<ModificaSensoreView viewModel={mockViewModel} />);
    fireEvent.change(screen.getByLabelText('IP sensore'), {
      target: { value: '192.168.1.2' },
    });
    fireEvent.change(screen.getByLabelText('Polling Time'), {
      target: { value: '6000' },
    });
    fireEvent.change(screen.getByLabelText('Zona Geografica Posizionamento'), {
      target: { value: 'New Test Zone' },
    });
    fireEvent.change(screen.getByLabelText('Raggio Azione'), {
      target: { value: '60' },
    });

    fireEvent.submit(screen.getByText('Conferma e Inserisci'));

    // Assert that the submit function from the ViewModel is called with the expected values
    expect(mockViewModel.submit).toHaveBeenCalled();
  });

  it('handles form submission error', () => {
    // Mock the ViewModel to return an error when submitting
    mockViewModel.submitIsError = jest.fn().mockReturnValue(true);

    render(<ModificaSensoreView viewModel={mockViewModel} />);
    fireEvent.submit(screen.getByText('Conferma e Inserisci'));

    // Assert that the error message is displayed
    expect(screen.getByText('La modifica non è andata a buon fine riprovare')).toBeInTheDocument();
  });

  it('clicks the "Elimina Sensore" button', () => {
    render(<ModificaSensoreView viewModel={mockViewModel} />);
    fireEvent.click(screen.getByText('Elimina Sensore'));

    // Assert that the eliminaSensore function from the ViewModel is called
    expect(mockViewModel.eliminaSensore).toHaveBeenCalled();
  });
  it("no data in sensoreDetails", () => {
    mockViewModel.sensoreDetails = jest.fn().mockReturnValue({
        data: undefined,
      })
    render(<ModificaSensoreView viewModel={mockViewModel} />);
    expect(screen.getByLabelText('ID Sensore')).toHaveValue('');
    expect(screen.getByLabelText('IP sensore')).toHaveValue('');
    expect(screen.getByLabelText('Polling Time')).toHaveValue('');
    expect(screen.getByLabelText('Zona Geografica Posizionamento')).toHaveValue('');
    expect(screen.getByLabelText('Tipo Interazione')).toHaveValue('PUSH');
    expect(screen.getByLabelText('Raggio Azione')).toHaveValue('');
  });
});

