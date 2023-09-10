import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import  LoginView  from "../../view/LoginView"; // Adjust the import path as needed
import { ILoginViewModel } from '../../ViewModel/LoginViewModel'; // Import your ViewModel
import '@testing-library/jest-dom';
// Mock the ViewModel with necessary functions
const mockViewModel: ILoginViewModel = {
  submit: jest.fn(),
};

test('renders LoginView component correctly', () => {
  render(<LoginView viewModel={mockViewModel} />);

  // Check if the component renders correctly
  expect(screen.getByText('Login')).toBeInTheDocument();

  // Simulate user interactions
  fireEvent.change(screen.getByPlaceholderText('Nome utente'), {
    target: { value: 'testUsername' },
  });
  fireEvent.change(screen.getByPlaceholderText('Nome password'), {
    target: { value: 'testPassword' },
  });
  fireEvent.click(screen.getByText('Login'));
  expect(mockViewModel.submit).toHaveBeenCalled()
  
});
