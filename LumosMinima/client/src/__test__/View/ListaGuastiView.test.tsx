import React from 'react';
import { render, screen } from '@testing-library/react';
import ListaGuastiView from '../../view/ListaGuastiView'; // Adjust the import path as needed
import { IListaGuastiViewModel } from '../../ViewModel/ListaGuastiViewModel'; // Adjust the import path as needed
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock the view model
const mockViewModel: IListaGuastiViewModel = {
  isLoading: jest.fn().mockReturnValue(false),
  guastiAperti: jest.fn().mockReturnValue([
    {
      ID: 1,
      data_rilevamento: '2023-09-04',
      'area.città': 'City 1',
      'area.zona_geografica_città': 'Location 1',
    },
    // Add more guasti objects for guastiAperti as needed
  ]),
  guastiChiusi: jest.fn().mockReturnValue([
    {
      ID: 2,
      data_rilevamento: '2023-09-05',
      'area.città': 'City 2',
      'area.zona_geografica_città': 'Location 2',
    },
    // Add more guasti objects for guastiChiusi as needed
  ]),
};
describe('ListaGuastiView', () => {
    it('renders ListaGuastiView component correctly', () => {
        render(
          <BrowserRouter><ListaGuastiView viewModel={mockViewModel} /></BrowserRouter>
        
        );
      
        // Check if the component renders correctly
        expect(screen.getByText('Lista Guasti a Sistema')).toBeInTheDocument();
        expect(screen.getByText('Guasti aperti')).toBeInTheDocument();
        expect(screen.getByText('Guasti chiusi')).toBeInTheDocument();
        const guastiAperti = mockViewModel.guastiAperti();
        guastiAperti!.forEach((guasto) => {
          const expectedText = `ID: ${guasto.ID}: Guasto a ${guasto["area.città"]}, zona ${guasto["area.zona_geografica_città"]}`;
          expect(screen.getByText(expectedText)).toBeInTheDocument();
        });
        const guastiChiusi = mockViewModel.guastiChiusi();
        guastiChiusi!.forEach((guasto) => {
          const expectedText = `ID: ${guasto.ID}: Guasto a ${guasto["area.città"]}, zona ${guasto["area.zona_geografica_città"]}`;
          expect(screen.getByText(expectedText)).toBeInTheDocument();
        });
        // Add more assertions based on your component's behavior and the provided mock data
      });
      it('renders isLoading', () => {
          mockViewModel.isLoading = jest.fn().mockReturnValue(true)
          render(
            <BrowserRouter><ListaGuastiView viewModel={mockViewModel} /></BrowserRouter>
          
          );
        expect(screen.getByText("Loading...")).toBeInTheDocument();
        });

        it('renders correctly guastiAperti undefined and guastiChiusi undefined', () => {
          // Mock listaLampioni to return an array of lampioni
          mockViewModel.isLoading = jest.fn().mockReturnValue(false)
          mockViewModel.guastiAperti = jest.fn().mockReturnValue(undefined);
          mockViewModel.guastiChiusi = jest.fn().mockReturnValue(undefined);
          // Re-render the component
          render(
            <BrowserRouter>
              <ListaGuastiView viewModel={mockViewModel} />
            </BrowserRouter>
          );
      
        });
})
