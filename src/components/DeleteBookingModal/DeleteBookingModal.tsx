import Modal from 'react-modal';
import type { Booking } from '../../types/booking';
import './DeleteBookingModal.css';

interface DeleteBookingModalProps {
    isOpen: boolean;
    booking: Booking | null;
    onClose: () => void;
    onConfirm: (bookingId: string) => void;
}

Modal.setAppElement('#root');

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1000
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '16px',
        padding: '0',
        maxWidth: '450px',
        width: '90%',
        maxHeight: '70vh',
        overflow: 'hidden'
    }
};

function DeleteBookingModal({ isOpen, booking, onClose, onConfirm }: DeleteBookingModalProps) {
    const handleConfirm = () => {
        if (booking) {
            onConfirm(booking.id);
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={modalStyles}
            contentLabel="Cancel Booking Confirmation"
        >
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
                                {booking.date} at {booking.time}
                                <br />
                                {booking.guests} guests - {booking.event}
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
        </Modal>
    );
}

export default DeleteBookingModal;