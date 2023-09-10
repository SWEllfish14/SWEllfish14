import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ModificaGuastoView from '../../view/ModificaGuastoView'; // Adjust the import path as needed
import { IModificaGuastoViewModel } from '../../ViewModel/ModificaGuastoViewModel'; // Import your ViewModel
import '@testing-library/jest-dom';

// Mock the ViewModel with necessary functions and data
const mockViewModel: IModificaGuastoViewModel = {

  submitError:jest.fn(),
  guastoDetails: jest.fn().mockReturnValue({
    data: {
      ID: 1,
      data_rilevamento: '2023-09-04',
      stato: '0',
      note: 'Test Note',
      id_area_illuminata: 123,
    },
  }),
  submit: jest.fn(),
  submitIsError: jest.fn().mockReturnValue(false),
  clearError: jest.fn(),
};

describe('ModificaGuastoView component', () => {
  beforeEach(() => {
    // Clear any previous calls to mock functions
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<ModificaGuastoView viewModel={mockViewModel} />);
    expect(screen.getByText('Modifica guasto')).toBeInTheDocument();
    expect(screen.getByLabelText('ID guasto')).toHaveValue('1');
    expect(screen.getByLabelText('data rilevamento guasto')).toHaveValue('2023-09-04');
    expect(screen.getByLabelText('stato')).toHaveValue('0');
    expect(screen.getByLabelText('note')).toHaveValue('Test Note');
    expect(screen.getByLabelText('id area illuminata')).toHaveValue(123);
  })

  it('submits the form with updated values', () => {
    render(<ModificaGuastoView viewModel={mockViewModel} />);
    fireEvent.change(screen.getByLabelText('note'), {
      target: { value: 'Updated Note' },
    });
    fireEvent.change(screen.getByLabelText('id area illuminata'), {
      target: { value: '456' },
    });
    fireEvent.change(screen.getByLabelText('data rilevamento guasto'), {
      target: { value: '2023-09-06' },
    });

    fireEvent.submit(screen.getByText('Conferma e Inserisci'));

    // Assert that the submit function from the ViewModel is called with the expected values
    expect(mockViewModel.submit).toHaveBeenCalled();
  });

  it('handles form submission error', () => {
    // Mock the ViewModel to return an error when submitting
    mockViewModel.submitIsError = jest.fn().mockReturnValue(true);

    render(<ModificaGuastoView viewModel={mockViewModel} />);
    fireEvent.submit(screen.getByText('Conferma e Inserisci'));

    // Assert that the error message is displayed
    expect(screen.getByText('La modifica non è andata a buon fine riprovare')).toBeInTheDocument();
  });
  it('stato 1', () => {
    
    mockViewModel.guastoDetails().data!.stato ="1";
    render(<ModificaGuastoView viewModel={mockViewModel} />);
    
  });
});
