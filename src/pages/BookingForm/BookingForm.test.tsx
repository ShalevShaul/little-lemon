import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import BookingForm from './BookingForm';
import { describe, expect, test } from 'vitest';
import { BookingProvider } from '../../contexts/BookingContext';
import { BookingFormProvider } from '../../contexts/FormContext';
import { BrowserRouter } from 'react-router';
import { userEvent } from '@testing-library/user-event';

describe('BookingForm', () => {
    test('renders booking form', () => {
        render(
            <BrowserRouter>
                <BookingProvider>
                    <BookingFormProvider>
                        <BookingForm />
                    </BookingFormProvider>
                </BookingProvider>
            </BrowserRouter>
        );

        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    test('allows user to fill form fields', async () => {
        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <BookingProvider>
                    <BookingFormProvider>
                        <BookingForm />
                    </BookingFormProvider>
                </BookingProvider>
            </BrowserRouter>
        );

        const nameInput = screen.getByLabelText(/Full Name/i);
        await user.type(nameInput, 'John Doe');

        expect(nameInput).toHaveValue('John Doe');
    });

    test('shows error for empty required fields', async () => {
        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <BookingProvider>
                    <BookingFormProvider>
                        <BookingForm />
                    </BookingFormProvider>
                </BookingProvider>
            </BrowserRouter>
        );

        const submitButton = screen.getByText('Next Step');
        await user.click(submitButton);

        expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
    });

    test('prevents booking short phone number', async () => {
        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <BookingProvider>
                    <BookingFormProvider>
                        <BookingForm />
                    </BookingFormProvider>
                </BookingProvider>
            </BrowserRouter>
        );

        const phoneInput = screen.getByLabelText(/phone/i);
        await user.type(phoneInput, '123456789');

        const submitButton = screen.getByText('Next Step');
        await user.click(submitButton);
        expect(screen.getByText(/Phone number must be at least 10 digits/i)).toBeInTheDocument();
    });

    test('submits form successfully with valid data', async () => {
        const user = userEvent.setup();

        render(
            <BrowserRouter>
                <BookingProvider>
                    <BookingFormProvider>
                        <BookingForm />
                    </BookingFormProvider>
                </BookingProvider>
            </BrowserRouter>
        );

        await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
        await user.type(screen.getByLabelText(/phone/i), '0123456789');
        await user.click(screen.getByRole('button', { name: /Next Step/i }));

        await user.type(screen.getByLabelText(/Select Date/i), '2100-01-01');
        await user.click(screen.getByText(/22:00/i));
        await user.click(screen.getByRole('button', { name: /Next Step/i }));

        await user.type(screen.getByLabelText(/Number of Guests/i), '8');
        await user.click(screen.getByText(/Birthday/i));
        await user.click(screen.getByRole('button', { name: /Review Booking/i }));

        await user.click(screen.getByRole('button', { name: /Confirm Booking/i }));

        // Loading time
        await waitFor(() => {
            expect(window.location.pathname).toBe('/confirmed');
        }, { timeout: 5000 });
    });
});