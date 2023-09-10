import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListaLampioniView from '../../view/ListaLampioniView'; // Adjust the import path as needed
import { IListaLampioniViewModel } from '../../ViewModel/ListaLampioniViewModel'; // Adjust the import path as needed
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock the view model
const mockViewModel: IListaLampioniViewModel = {
    dettagliLampione:jest.fn(),
  isLoading: jest.fn().mockReturnValue(false),
  listaLampioni: jest.fn().mockReturnValue([]), // Provide mock data as needed
  areaDetails: jest.fn().mockReturnValue({
    data: {
      modalità_funzionamento: "M", // Provide the appropriate value here
    },
  }),
  spegniLampione: jest.fn(),
  accendiLampione: jest.fn(),
};

describe('ListaLampioniView Component', () => {
  beforeEach(() => {
    
  });

  it('should render the component correctly', () => {
    // Check if the component renders correctly
    render(
        <BrowserRouter>
          <ListaLampioniView viewModel={mockViewModel} />
        </BrowserRouter>
      );
    expect(screen.getByText('Lista Lampioni')).toBeInTheDocument();
  });

  it('should render loading message when isLoading is true', () => {
    // Mock isLoading to return true
    mockViewModel.isLoading = jest.fn().mockReturnValue(true);

    // Re-render the component
    render(
      <BrowserRouter>
        <ListaLampioniView viewModel={mockViewModel} />
      </BrowserRouter>
    );

    // Check if the loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render a list of lampioni when isLoading is false', () => {
    // Mock listaLampioni to return an array of lampioni
    mockViewModel.listaLampioni = jest.fn().mockReturnValue([
      {
        ID: 1,
        IP: '192.168.1.1',
        stato: true,
        tipo_interazione: 'Tipo 1',
      },
      {
        ID: 2,
        IP: '192.168.1.2',
        stato: false,
        tipo_interazione: 'Tipo 2',
      },
    ]);
    mockViewModel.isLoading = jest.fn().mockReturnValue(false);
    // Re-render the component
    render(
      <BrowserRouter>
        <ListaLampioniView viewModel={mockViewModel} />
      </BrowserRouter>
    );

    // Check if lampioni details are displayed
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('IP: 192.168.1.1')).toBeInTheDocument();
    expect(screen.getByText('Stato: Acceso')).toBeInTheDocument(); // Assuming true means "Acceso"
    expect(screen.getByText('Tipo interazione: Tipo 1')).toBeInTheDocument();

    expect(screen.getByText('ID: 2')).toBeInTheDocument();
    expect(screen.getByText('IP: 192.168.1.2')).toBeInTheDocument();
    expect(screen.getByText('Stato: Spento')).toBeInTheDocument(); // Assuming false means "Spento"
    expect(screen.getByText('Tipo interazione: Tipo 2')).toBeInTheDocument();
  });

  it('should handle spegniLampione function when "Spegni Lampione" button is clicked', () => {
    // Mock listaLampioni to return an array of lampioni
    const lampioni = [
      {
        ID: 1,
        IP: '192.168.1.1',
        stato: true,
        tipo_interazione: 'Tipo 1',
      },
      {
        ID: 2,
        IP: '192.168.1.2',
        stato: false,
        tipo_interazione: 'Tipo 2',
      },
    ];
    mockViewModel.listaLampioni = jest.fn().mockReturnValue(lampioni);

    // Re-render the component
    render(
      <BrowserRouter>
        <ListaLampioniView viewModel={mockViewModel} />
      </BrowserRouter>
    );

    // Find the "Spegni Lampione" button and click it for the first lampione
    const spegniButton = screen.getAllByText('Spegni Lampione')[0];
    fireEvent.click(spegniButton);

    // Check if the spegniLampione function was called with the correct lampione ID
    expect(mockViewModel.spegniLampione).toHaveBeenCalledWith(lampioni[0].ID);
  });

  it('should handle accendiLampione function when "Accendi Lampione" button is clicked', () => {
    // Mock listaLampioni to return an array of lampioni
    const lampioni = [
      {
        ID: 1,
        IP: '192.168.1.1',
        stato: true,
        tipo_interazione: 'Tipo 1',
      },
      {
        ID: 2,
        IP: '192.168.1.2',
        stato: false,
        tipo_interazione: 'Tipo 2',
      },
    ];
    mockViewModel.listaLampioni = jest.fn().mockReturnValue(lampioni);

    // Re-render the component
    render(
      <BrowserRouter>
        <ListaLampioniView viewModel={mockViewModel} />
      </BrowserRouter>
    );

    // Find the "Accendi Lampione" button and click it for the second lampione
    const accendiButton = screen.getAllByText('Accendi Lampione')[0];
    expect(accendiButton).toBeInTheDocument();
    fireEvent.click(accendiButton);

    // Check if the accendiLampione function was called with the correct lampione ID
    expect(mockViewModel.accendiLampione).toHaveBeenCalledWith(lampioni[1].ID);
  });
  it('renders correctly listaLampioni undefined and Areadetails data undefined', () => {
    // Mock listaLampioni to return an array of lampioni
   
    mockViewModel.listaLampioni = jest.fn().mockReturnValue(undefined);
    mockViewModel.areaDetails = jest.fn().mockReturnValue({data:undefined});
    // Re-render the component
    render(
      <BrowserRouter>
        <ListaLampioniView viewModel={mockViewModel} />
      </BrowserRouter>
    );

  });
});
