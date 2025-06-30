import { fireEvent, render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

test('Renders the BookingForm heading', () => {
    const mockProps = {
        formData: {
            firstName: '',
            lastName: '',
            date: '',
            time: '',
            guests: 1,
            occasion: ''
        },
        setFormData: jest.fn(),
        availableTimes: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
        dispatch: jest.fn()
    };

    render(<BookingForm {...mockProps} />);
    const headingElement = screen.getByText('Reserve a table');
    expect(headingElement).toBeInTheDocument();
});

test('can submit booking form with valid data', () => {
    const mockSetFormData = jest.fn();
    const mockDispatch = jest.fn();

    const mockProps = {
        formData: {
            firstName: 'John',
            lastName: 'Doe',
            date: '2024-01-15',
            time: '18:00',
            guests: 2,
            occasion: 'Birthday'
        },
        setFormData: mockSetFormData,
        availableTimes: ['17:00', '18:00', '19:00'],
        dispatch: mockDispatch
    };

    render(<BookingForm {...mockProps} />);

    const submitButton = screen.getByDisplayValue('Make your reservation');
    fireEvent.click(submitButton);

    expect(mockSetFormData).toHaveBeenCalledWith({
        firstName: '',
        lastName: '',
        date: '',
        time: '',
        guests: 1,
        occasion: ''
    });
});