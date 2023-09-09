import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AreaDetailsView from '../../view/AreaDetailsView'; // Update the import path
import { IAreaDetailsViewModel } from '../../ViewModel/AreaDetailsViewModel'; // Update the import path
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
// Create a mock ViewModel with the necessary methods and properties

const mockViewModel: IAreaDetailsViewModel = {
  isLoading: jest.fn().mockReturnValue(false),
  isError: jest.fn().mockReturnValue(false),
  error: jest.fn().mockReturnValue({ message: 'errore' }),
  areaDetails: jest.fn().mockReturnValue({
    data: {
      ID: 1,
      città: 'City1',
      zona_geografica_città: 'Zone1',
      modalità_funzionamento: 'M',
      stato: 0, // Assuming some value for stato
      luminosità_manuale: 50, // Assuming some value for luminosità_manuale
      luminosità_standard: 80, // Assuming some value for luminosità_standard
    },
  }),
  aumentaLuminosità: jest.fn(),
  diminuisciLuminosità: jest.fn(),
  accendiLampioniArea: jest.fn(),
  spegniLampioniArea: jest.fn(),
  cambiaModalità: jest.fn(),
  submitHasError: false,
  errorMessage: "",
  eliminaArea: jest.fn(),
  accendiArea:jest.fn(),
  modalita:true,
};
describe('AreaDetailsView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders AreaDetailsView component correctly', () => {
    render(
      <BrowserRouter>
        <AreaDetailsView viewModel={mockViewModel} />
      </BrowserRouter>
    );
  
    // Check if the component renders correctly
    expect(screen.getByText('Dettagli area')).toBeInTheDocument();
  
    // Check if the area details are displayed
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Città: City1')).toBeInTheDocument();
    expect(screen.getByText('Zona: Zone1')).toBeInTheDocument();
    expect(screen.getByText('Stato: Spento')).toBeInTheDocument();
    expect(screen.getByText('Luminosità in modalità manuale: 50')).toBeInTheDocument();
  
    // Check if the buttons are present and clickable
    const switchManuale = screen.getByLabelText('Manuale');
    const switchAutomatico = screen.getByLabelText('Automatico');
    const increaseLuminosita = screen.getByText('Aumenta Luminosità');
    const decreaseLuminosita = screen.getByText('Diminuisci Luminosità');
    const aggiungiGuastoButton = screen.getByText('Aggiungi guasto');
    const eliminaAreaButton = screen.getByText('Elimina area');
    const modificaDettagliAreaButton = screen.getByText('Modifica dettagli area');
    const aggiungiSensoreButton = screen.getByText('Aggiungi sensore');
    const listaSensoriButton = screen.getByText('Lista Sensori');
    const aggiungiLampioneButton = screen.getByText('Aggiungi lampione');
    const listaLampioniButton = screen.getByText('Lista Lampioni');
  
    expect(switchManuale).toBeInTheDocument();
    expect(switchAutomatico).toBeInTheDocument();
    expect(increaseLuminosita).toBeInTheDocument();
    expect(decreaseLuminosita).toBeInTheDocument();
    expect(aggiungiGuastoButton).toBeInTheDocument();
    expect(eliminaAreaButton).toBeInTheDocument();
    expect(modificaDettagliAreaButton).toBeInTheDocument();
    expect(aggiungiSensoreButton).toBeInTheDocument();
    expect(listaSensoriButton).toBeInTheDocument();
    expect(aggiungiLampioneButton).toBeInTheDocument();
    expect(listaLampioniButton).toBeInTheDocument();
  
    fireEvent.click(switchManuale);
    fireEvent.click(switchAutomatico);
    fireEvent.click(increaseLuminosita);
    fireEvent.click(decreaseLuminosita);
    fireEvent.click(aggiungiGuastoButton);
    fireEvent.click(eliminaAreaButton);
    fireEvent.click(modificaDettagliAreaButton);
    fireEvent.click(aggiungiSensoreButton);
    fireEvent.click(listaSensoriButton);
    fireEvent.click(aggiungiLampioneButton);
    fireEvent.click(listaLampioniButton);
  
    // You can add more assertions based on your component's behavior
  });
  
  it('renders IsLoading', () => {
    // Set isLoading to true in the mock ViewModel
    mockViewModel.isLoading = jest.fn().mockReturnValue(true);
  
    render(
      <BrowserRouter>
        <AreaDetailsView viewModel={mockViewModel} />
      </BrowserRouter>
    );
  
    // Check if the loading indicator is present
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  it('renders Error', () => {
      
    // Set isError and errorMessage in the mock ViewModel
    mockViewModel.isError = jest.fn().mockReturnValue(true);
    render(
      <BrowserRouter>
        <AreaDetailsView viewModel={mockViewModel} />
      </BrowserRouter>
    );
    const errorMessage = screen.getByText(/Error:/i);
    expect(errorMessage).toBeInTheDocument();
  })
  
  it('renders correctly if stato acceso', () => {
      
      mockViewModel.areaDetails = jest.fn().mockReturnValue({
          data: {
            ID: 1,
            città: 'City1',
            zona_geografica_città: 'Zone1',
            modalità_funzionamento: 'M',
            stato: 1, // Assuming some value for stato
            luminosità_manuale: 50, // Assuming some value for luminosità_manuale
            luminosità_standard: 80, // Assuming some value for luminosità_standard
          },
        })
      render(
        <BrowserRouter>
          <AreaDetailsView viewModel={mockViewModel} />
        </BrowserRouter>
      );
      expect(screen.getByText("Stato : Acceso")).toBeInTheDocument()
    })
  
    // it('renders correctly if Modalita A', () => {
      
      
    //   mockViewModel.areaDetails = jest.fn().mockReturnValue({
    //       data: {
    //         ID: 1,
    //         città: 'City1',
    //         zona_geografica_città: 'Zone1',
    //         modalità_funzionamento: 'A',
    //         stato: 0, // Assuming some value for stato
    //         luminosità_manuale: 50, // Assuming some value for luminosità_manuale
    //         luminosità_standard: 80, // Assuming some value for luminosità_standard
    //       },
    //     })
    //   render(
    //     <BrowserRouter>
    //       <AreaDetailsView viewModel={mockViewModel} />
    //     </BrowserRouter>
    //   );
    //   expect(screen.getByText(/Luminosità in modalità automatica:/i)).toBeInTheDocument()
    // })
  
    it('renders correctly if submit has error', () => {
      
      
      mockViewModel.submitHasError= true
      mockViewModel.errorMessage ="errore submit"
      render(
        <BrowserRouter>
          <AreaDetailsView viewModel={mockViewModel} />
        </BrowserRouter>
      );
      expect(screen.getByText(mockViewModel.errorMessage)).toBeInTheDocument()
    })
})
