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
    const mockOnSubmit = jest.fn((e) => e.preventDefault());

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
    fireEvent.change(screen.getByLabelText('Choose date:'), { target: { value: '2030-01-01' } });
    fireEvent.change(screen.getByLabelText('Choose time:'), { target: { value: '17:00' } });
    fireEvent.change(screen.getByLabelText('Number of guests:'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Occasion:'), { target: { value: 'Birthday' } });

    expect(screen.getByDisplayValue('Shalev')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Shaul')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2030-01-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('17:00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Birthday')).toBeInTheDocument();

    const submitButton = screen.getByDisplayValue('Make your reservation');
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalled();
});


const mockOnSubmit = jest.fn();
const mockProps = {
    onSubmit: mockOnSubmit,
    availableTimes: ['17:00', '18:00', '19:00'],
    dispatch: jest.fn(),
    bookedTimes: ['18:00', '20:00', '20:30'],
};

describe('Error fields', () => {
    test('show error for empty first name input', () => {
        render(<BookingProvider><BookingForm {...mockProps} /></BookingProvider>);

        const firstNameInput = screen.getByLabelText('First Name:');
        fireEvent.blur(firstNameInput);
        expect(screen.getByText('* First Name is required')).toBeInTheDocument();
    });

    test('show error for short last name', () => {
        render(<BookingProvider><BookingForm {...mockProps} /></BookingProvider>);

        const lastNameInput = screen.getByLabelText('Last Name:');
        fireEvent.change(lastNameInput, { target: { value: 'S' } });
        fireEvent.blur(lastNameInput);
        expect(screen.getByText('* Last Name is too short')).toBeInTheDocument();
    });

    test('show error for past date', () => {
        render(<BookingProvider><BookingForm {...mockProps} /></BookingProvider>);

        const dateInput = screen.getByLabelText('Choose date:');
        fireEvent.change(dateInput, { target: { value: '2025-01-01' } });
        fireEvent.blur(dateInput);
        expect(screen.getByText('* Past dates are not allowed')).toBeInTheDocument();
    });

    test('show error when no time is selected', () => {
        render(<BookingProvider><BookingForm {...mockProps} /></BookingProvider>);

        const timeInput = screen.getByLabelText('Choose time:');
        fireEvent.change(timeInput, { target: { value: '' } });
        fireEvent.blur(timeInput);
        expect(screen.getByText('* Time is required')).toBeInTheDocument();
    });

    test('show error when entering more than 10 guests', () => {
        render(<BookingProvider><BookingForm {...mockProps} /></BookingProvider>);

        const guestsInput = screen.getByLabelText('Number of guests:');
        fireEvent.change(guestsInput, { target: { value: '100' } });
        fireEvent.blur(guestsInput);

        expect(screen.getByText('* Maximum guests is 10')).toBeInTheDocument();
    });

    test('show error when no occasion is selected', () => {
        render(<BookingProvider><BookingForm {...mockProps} /></BookingProvider>);

        const occasionInput = screen.getByLabelText('Occasion:');
        fireEvent.change(occasionInput, { target: { value: '' } });
        fireEvent.blur(occasionInput);
        expect(screen.getByText('* Occasion is required')).toBeInTheDocument();
    });
});