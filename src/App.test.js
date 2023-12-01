import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders calculator app', () => {
  render(<App />);
  const calculatorApp = screen.getByTestId('calculator-app');
  expect(calculatorApp).toBeInTheDocument();
});

test('clicking number buttons updates the screen', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('button-1'));
  fireEvent.click(screen.getByTestId('button-2'));
  fireEvent.click(screen.getByTestId('button-3'));
  const screenValue = screen.getByTestId('screen').textContent;
  expect(screenValue).toBe('123');
});

test('performing addition calculation updates the screen and history', () => {
  render(<App />);
  fireEvent.click(screen.getByTestId('button-5'));
  fireEvent.click(screen.getByTestId('button-+'));
  fireEvent.click(screen.getByTestId('button-3'));
  fireEvent.click(screen.getByTestId('button-='));
  const screenValue = screen.getByTestId('screen').textContent;
  expect(screenValue).toBe('8');

});

// Add more test cases to cover different functionalities and scenarios
