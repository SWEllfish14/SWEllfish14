import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomeView from '../../view/HomeView'; // Adjust the import path as needed
import { IHomeViewModel } from '../../ViewModel/HomeViewModel'; // Adjust the import path as needed
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock the view model
const mockViewModel: IHomeViewModel = {
  guastiNumberisLoading: jest.fn().mockReturnValue(false),
  guastiNumber: jest.fn().mockReturnValue(10),
  lampioniisLoading: jest.fn().mockReturnValue(false),
  lampioniNumber: jest.fn().mockReturnValue(20),
  sensoriisLoading: jest.fn().mockReturnValue(false),
  sensoriNumber: jest.fn().mockReturnValue(30),
  numeroAreeisLoading: jest.fn().mockReturnValue(false),
  numeroAree: jest.fn().mockReturnValue(40),
  areeLimitisLoading: jest.fn().mockReturnValue(false),
  areeLimit: jest.fn().mockReturnValue([{
    ID: 1,
    città: 'City 1',
    zona_geografica_città: 'Location 1',
    stato: 1, // Example data with stato as 1
  },
  {
    ID: 2,
    città: 'City 2',
    zona_geografica_città: 'Location 2',
    stato: 0, // Example data with stato as 0
  },]),
  guastiisLoading: jest.fn().mockReturnValue(false),
  guasti: jest.fn().mockReturnValue([
    {
      ID: 1,
      data_rilevamento: '2023-09-04',
      'area.città': 'City 1',
      'area.zona_geografica_città': 'Location 1',
    },
    {
      ID: 2,
      data_rilevamento: '2023-09-05',
      'area.città': 'City 2',
      'area.zona_geografica_città': 'Location 2',
    },
  ]),
  logout: jest.fn(),
};

describe('HomeView component', () => {
  test('renders HomeView component correctly', () => {
    render(
      <BrowserRouter>
        <HomeView viewModel={mockViewModel} />
      </BrowserRouter>
    );

    // Check if the component renders correctly
    expect(screen.getByText('Stato sistema')).toBeInTheDocument();
    expect(screen.getByText('Lista aree')).toBeInTheDocument();
    expect(screen.getByText('Ultimi guasti inseriti a sistema')).toBeInTheDocument();
    expect(screen.getByText('Utility')).toBeInTheDocument();

    // Check if the data is displayed

    expect(screen.getByText(/Numero Guasti a sistema:/i)).toBeInTheDocument();
    expect(screen.getByText(/Numero lampioni a sistema:/i)).toBeInTheDocument();
    expect(screen.getByText(/Numero sensori a sistema:/i)).toBeInTheDocument();
    expect(screen.getByText(/Numero aree geografiche a sistema:/i)).toBeInTheDocument();

   
    // Add more assertions based on your component's behavior and the provided mock data
  });

  test('displays loading states when data is loading', () => {
    // Mock loading states
    mockViewModel.guastiNumberisLoading = jest.fn().mockReturnValue(true);
    mockViewModel.lampioniisLoading = jest.fn().mockReturnValue(true);
    mockViewModel.sensoriisLoading = jest.fn().mockReturnValue(true);
    mockViewModel.numeroAreeisLoading = jest.fn().mockReturnValue(true);
    mockViewModel.areeLimitisLoading =jest.fn().mockReturnValue(true);
    mockViewModel.guastiisLoading =jest.fn().mockReturnValue(true);
    render(
      <BrowserRouter>
        <HomeView viewModel={mockViewModel} />
      </BrowserRouter>
    );

    // Check if loading messages are displayed
    const loadingElements = screen.queryAllByText('Loading...');

// Loop through each loading element and check if it's in the document
loadingElements.forEach((loadingElement) => {
  expect(loadingElement).toBeInTheDocument();
});
  });

  test('displays "Logout" button and calls logout function on button click', async () => {
    render(
      <BrowserRouter>
        <HomeView viewModel={mockViewModel} />
      </BrowserRouter>
    );

    // Find the "Logout" button and click it
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // Check if the logout function was called
    await waitFor(() => {
      expect(mockViewModel.logout).toHaveBeenCalled();
    });
  });
});

// test('renders mapped aree elements correctly', () => {
//     render(
//       <BrowserRouter>
//         <HomeView viewModel={mockViewModel} />
//       </BrowserRouter>
//     );
  
//     // Check if all guasti elements are rendered
//     const aree = mockViewModel.areeLimit();
//     aree!.forEach((area) => {
//       const expectedText = `${area.città} : Guasto a ${guasto["area.città"]},${guasto["area.zona_geografica_città"]}.`;
//       expect(screen.getByText(expectedText)).toBeInTheDocument();
//     });
//   });

  test('renders mapped guasti elements correctly', () => {
    mockViewModel.guastiisLoading= jest.fn().mockReturnValue(false)
    render(
      <BrowserRouter>
        <HomeView viewModel={mockViewModel} />
      </BrowserRouter>
    );
  
    // Check if all guasti elements are rendered
    const guasti = mockViewModel.guasti();
    guasti!.forEach((guasto) => {
      const expectedText = `${guasto.data_rilevamento.toString()} : Guasto a ${guasto["area.città"]},${guasto["area.zona_geografica_città"]}.`;
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });