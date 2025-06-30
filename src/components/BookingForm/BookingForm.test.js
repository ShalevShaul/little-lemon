import { render, screen } from '@testing-library/react';
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