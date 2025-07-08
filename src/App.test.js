import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', {
        value: jest.fn(),
        writable: true
    });
});

test('renders App component', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
});
