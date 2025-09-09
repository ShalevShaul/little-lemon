import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import RateUs from './RateUs';

// Mock props
const mockProps = {
    openCloseModal: vi.fn(),
    onAddReview: vi.fn(),
    isSubmitting: false
};

describe('RateUs', () => {
    test('renders rating component', () => {
        render(<RateUs {...mockProps} />);

        expect(screen.getByText('Rate Us')).toBeInTheDocument();
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Rating/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();
    });

    test('shows loader when submitting', () => {
        const submittingProps = { ...mockProps, isSubmitting: true };
        render(<RateUs {...submittingProps} />);

        expect(screen.queryByText('Rate Us')).not.toBeInTheDocument();
    });

    test('allows user to fill name field', async () => {
        const user = userEvent.setup();
        render(<RateUs {...mockProps} />);

        const nameInput = screen.getByLabelText(/Full Name/i);
        await user.type(nameInput, 'John Doe');

        expect(nameInput).toHaveValue('John Doe');
    });

    test('allows user to change rating', async () => {
        const user = userEvent.setup();
        render(<RateUs {...mockProps} />);

        const ratingSlider = screen.getByLabelText(/Rating/i);
        fireEvent.change(ratingSlider, { target: { value: 3 } });

        expect(screen.getByText(/Rating : 3\/5/i)).toBeInTheDocument();
    });

    test('allows user to write comment', async () => {
        const user = userEvent.setup();
        render(<RateUs {...mockProps} />);

        const commentField = screen.getByLabelText(/Comment/i);
        await user.type(commentField, 'Great restaurant experience!');

        expect(commentField).toHaveValue('Great restaurant experience!');
    });

    test('shows validation errors for empty fields', async () => {
        const user = userEvent.setup();
        render(<RateUs {...mockProps} />);

        const submitButton = screen.getByRole('button', { name: /Submit Rating/i });
        await user.click(submitButton);

        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Comment is required/i)).toBeInTheDocument();
    });

    test('shows validation for short name', async () => {
        const user = userEvent.setup();
        render(<RateUs {...mockProps} />);

        const nameInput = screen.getByLabelText(/Full Name/i);
        await user.type(nameInput, 'A');

        const submitButton = screen.getByRole('button', { name: /Submit Rating/i });
        await user.click(submitButton);

        expect(screen.getByText(/Name is too short/i)).toBeInTheDocument();
    });

    test('shows validation for short comment', async () => {
        const user = userEvent.setup();
        render(<RateUs {...mockProps} />);

        const commentField = screen.getByLabelText(/Comment/i);
        await user.type(commentField, 'Short');

        const submitButton = screen.getByRole('button', { name: /Submit Rating/i });
        await user.click(submitButton);

        expect(screen.getByText(/Comment must be at least 10 keys/i)).toBeInTheDocument();
    });

    test('shows validation for long comment', async () => {
        const user = userEvent.setup();
        render(<RateUs  {...mockProps} />)

        const commentField = screen.getByLabelText(/Comment/i);
        const longComment = 'aa'.repeat(200);
        fireEvent.change(commentField, {target: {value: longComment}});

        const submitButton = screen.getByRole('button', {name: /Submit Rating/i});
        await user.click(submitButton);
        expect(screen.getByText(/Maximum 150 keys/i)).toBeInTheDocument();
    });

    test('submits valid review', async () => {
        const user = userEvent.setup();
        render(<RateUs {...mockProps} />);

        await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');

        const ratingSlider = screen.getByLabelText(/Rating/i);
        await user.type(ratingSlider, '4');

        await user.type(screen.getByLabelText(/Comment/i), 'Amazing food and great service!');

        const submitButton = screen.getByRole('button', { name: /Submit Rating/i });
        await user.click(submitButton);

        expect(mockProps.onAddReview).toHaveBeenCalledTimes(1);
    });

    test('calls close modal function', async () => {
        const user = userEvent.setup();
        render(<RateUs {...mockProps} />);

        const closeButton = screen.getByRole('button', { name: /cancel icon/i });
        await user.click(closeButton);

        expect(mockProps.openCloseModal).toHaveBeenCalledTimes(1);
    });
});