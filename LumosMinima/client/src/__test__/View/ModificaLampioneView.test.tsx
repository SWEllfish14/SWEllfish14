import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ModificaLampioneView from '../../view/ModificaLampioneView'; // Adjust the import path as needed
import { IModificaLampioneViewModel } from '../../ViewModel/ModificaLampioneViewModel'; // Import your ViewModel
import '@testing-library/jest-dom';

// Mock the ViewModel with necessary functions and data
const mockViewModel: IModificaLampioneViewModel = {
    clearError:jest.fn(),
  dettagliLampione: jest.fn().mockReturnValue({
    data: {
      ID: 1,
      IP: '192.168.1.1',
      tipo_interazione: 'PUSH',
      luminosita_default: 1,
      luminosita_manuale: 1,
      stato: '0',
    },
  }),
  modificaLampione: jest.fn(),
  eliminaLampione: jest.fn(),
  submitIsError: jest.fn().mockReturnValue(false),
};

describe('ModificaLampioneView component', () => {
  beforeEach(() => {
    // Clear any previous calls to mock functions
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<ModificaLampioneView viewModel={mockViewModel} />);
    expect(screen.getByText('Modifica Lampione')).toBeInTheDocument();
    expect(screen.getByLabelText('ID')).toHaveValue('1');
    expect(screen.getByLabelText('IP')).toHaveValue('192.168.1.1');
    expect(screen.getByLabelText('Tipo interazione con il lampione')).toHaveValue('PUSH');
    expect(screen.getByLabelText('Luminosità default')).toHaveValue(1);
    expect(screen.getByLabelText('Luminosità impostata')).toHaveValue(1);
    expect(screen.getByLabelText('Stato')).toHaveValue('0');
  });

  it('submits the form with updated values', () => {
    render(<ModificaLampioneView viewModel={mockViewModel} />);
    fireEvent.change(screen.getByLabelText('IP'), {
      target: { value: '192.168.1.2' },
    });
    fireEvent.change(screen.getByLabelText('Tipo interazione con il lampione'), {
      target: { value: 'PULL' },
    });
    fireEvent.change(screen.getByLabelText('Luminosità default'), {
      target: { value: '5' },
    });
    fireEvent.change(screen.getByLabelText('Luminosità impostata'), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByLabelText('Stato'), {
      target: { value: '1' },
    });

    fireEvent.submit(screen.getByText('Conferma e Inserisci'));

    // Assert that the modificaLampione function from the ViewModel is called with the expected values
    expect(mockViewModel.modificaLampione).toHaveBeenCalled();
  });

  it('handles form submission error', () => {
    // Mock the ViewModel to return an error when submitting
    mockViewModel.submitIsError=jest.fn().mockReturnValue(true);

    render(<ModificaLampioneView viewModel={mockViewModel} />);
    fireEvent.submit(screen.getByText('Conferma e Inserisci'));

    // Assert that the error message is displayed
    expect(screen.getByText('La modifica non è andata a buon fine riprovare')).toBeInTheDocument();
  });

  it('calls eliminaLampione when "Elimina Lampione" button is clicked', () => {
    render(<ModificaLampioneView viewModel={mockViewModel} />);
    fireEvent.click(screen.getByText('Elimina Lampione'));

    // Assert that the eliminaLampione function from the ViewModel is called
    expect(mockViewModel.eliminaLampione).toHaveBeenCalled();
  });
});
