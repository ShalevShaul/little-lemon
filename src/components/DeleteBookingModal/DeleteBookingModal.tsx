import type { Booking } from '../../types/booking';
import './DeleteBookingModal.css';
import React from 'react';
import { formatDate } from '../../utils/dateUtils';

interface DeleteBookingModalProps {
    booking: Booking | null;
    onConfirm: (bookingId: string) => void;
    onClose?: () => void;
}

function DeleteBookingModal({ booking, onConfirm, onClose }: DeleteBookingModalProps) {
    const handleConfirm = () => {
        if (booking) {
            onConfirm(booking.id);
        }
    };

    return (
        <div className="delete-booking-modal">
            <div className="modal-header">
                <h2>Cancel Booking</h2>
                <button
                    className="modal-close-btn"
                    onClick={onClose}
                >
                    ×
                </button>
            </div>

            <div className="modal-body">
                <div className="warning-icon">⚠️</div>
                <p className="warning-text">
                    Are you sure you want to cancel this booking?
                </p>

                {booking && (
                    <div className="booking-summary">
                        <div className="booking-info">
                            <strong>#{booking.id.slice(-6).toUpperCase()}</strong>
                            <br />
                            {formatDate(booking.date)} at {booking.time}
                            <br />
                            {booking.guests} guests - {booking.event.text}
                        </div>
                    </div>
                )}
            </div>

            <div className="modal-footer">
                <button
                    className="btn-cancel-action"
                    onClick={onClose}
                >
                    Keep Booking
                </button>
                <button
                    className="btn-confirm-delete"
                    onClick={handleConfirm}
                >
                    Yes, Cancel Booking
                </button>
            </div>
        </div>
    );
}

export default React.memo(DeleteBookingModal);