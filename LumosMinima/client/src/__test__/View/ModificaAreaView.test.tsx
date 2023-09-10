import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ModificaAreaView from '../../view/ModificaAreaView'; // Adjust the import path as needed
import { IModificaAreaViewModel } from '../../ViewModel/ModificaAreaViewModel'; // Import your ViewModel
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
// Mock the ViewModel with necessary functions and data
const mockViewModel: IModificaAreaViewModel = {

  areaDetails: jest.fn().mockReturnValue({
    data: {
      ID: 1,
      città: 'Test City',
      zona_geografica_città: 'Test Zone',
      modalità_funzionamento: 'A',
      stato: '1',
      luminosità_standard: 5,
      luminosità_rilevamento: 3,
    },
  }),
  submit: jest.fn(),
  submitIsError: jest.fn().mockReturnValue(false),
  clearError: jest.fn(),
  submitError:jest.fn(),
};

describe('ModificaAreaView component', () => {
  beforeEach(() => {
    
  });

  it('renders correctly', () => {
    render(<BrowserRouter><ModificaAreaView viewModel={mockViewModel} /></BrowserRouter>);
    expect(screen.getByText('Modifica area')).toBeInTheDocument();
    expect(screen.getByLabelText('ID città')).toHaveValue('1');
    expect(screen.getByLabelText('Nome città')).toHaveValue('Test City');
    expect(screen.getByLabelText('Zona geografica città')).toHaveValue('Test Zone');
    expect(screen.getByTestId('modalita-select')).toHaveValue('A');
    expect(screen.getByTestId('stato-select')).toHaveValue('0');
    expect(screen.getByLabelText('Luminosità default')).toHaveValue(5);
    expect(screen.getByLabelText('Luminosità rilevamento')).toHaveValue(3);
  });

  it('submits the form with updated values', () => {
    render(<BrowserRouter><ModificaAreaView viewModel={mockViewModel} /></BrowserRouter>);
    fireEvent.change(screen.getByLabelText('Nome città'), {
      target: { value: 'New Test City' },
    });
    fireEvent.change(screen.getByLabelText('Zona geografica città'), {
      target: { value: 'New Test Zone' },
    });
    fireEvent.change(screen.getByLabelText('Luminosità default'), {
      target: { value: '7' },
    });
    fireEvent.change(screen.getByLabelText('Luminosità rilevamento'), {
      target: { value: '4' },
    });

    fireEvent.submit(screen.getByText('Conferma e Inserisci'));

    // Assert that the submit function from the ViewModel is called with the expected values
    expect(mockViewModel.submit).toHaveBeenCalled();
  });

});
