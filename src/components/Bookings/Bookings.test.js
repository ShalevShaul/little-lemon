import { render, screen } from "@testing-library/react";
import Bookings from "./Bookings";

test('Renders Bookings component with heading', () => {
    const mockProps = {
        formData: {
            firstName: '',
            lastName: '',
            date: '',
            time: '',
            guests: 1,
            occasion: ''
        },
        availableTimes: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    }

    render(<Bookings {...mockProps} />);

    const headingElement = screen.getByText('Reservation Status');
    expect(headingElement).toBeInTheDocument();
});