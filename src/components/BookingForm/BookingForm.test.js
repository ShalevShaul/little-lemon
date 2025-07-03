import { fireEvent, render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';
import { BookingProvider } from '../BookingContext';

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
        bookedTimes: ['18:00', '20:00', '20:30'],
        setFormData: jest.fn(),
        availableTimes: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
        dispatch: jest.fn()
    };

    render(<BookingProvider><BookingForm {...mockProps} /></BookingProvider>);
    const headingElement = screen.getByText('Reserve a table');
    expect(headingElement).toBeInTheDocument();
});

test('submit booking form with valid data', () => {
    const mockOnSubmit = jest.fn();

    const mockProps = {
        onSubmit: mockOnSubmit,
        availableTimes: ['17:00', '18:00', '19:00'],
        dispatch: jest.fn(),
        bookedTimes: ['18:00', '20:00', '20:30'],
    };

    render(<BookingProvider><BookingForm {...mockProps} /></BookingProvider>);

    // insert first name and last name to the form
    fireEvent.change(screen.getByLabelText('First Name:'), { target: { value: 'Shalev' } });
    fireEvent.change(screen.getByLabelText('Last Name:'), { target: { value: 'Shaul' } });

    expect(screen.getByDisplayValue('Shalev')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Shaul')).toBeInTheDocument();

    const submitButton = screen.getByDisplayValue('Make your reservation');
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalled();
});