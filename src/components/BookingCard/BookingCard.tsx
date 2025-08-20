import type { Booking } from '../../types/booking';
import './BookingCard.css';

interface BookingCardProps extends Booking {
    onCancel?: () => void;
}

function BookingCard(props: BookingCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className='booking-card'>
            <div className="booking-card-header">
                <div className="booking-id">
                    <h3>ORDER #{props.id.slice(-6).toUpperCase()}</h3>
                </div>
            </div>

            <div className="booking-card-content">
                <div className="booking-details">
                    <div className="detail-row">
                        <span className="detail-label">📅 Date:</span>
                        <span className="detail-value">{formatDate(props.date)}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">🕐 Time:</span>
                        <span className="detail-value">{props.time}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">👥 Guests:</span>
                        <span className="detail-value">{props.guests}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">👤 Name:</span>
                        <span className="detail-value">{props.fullName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">📞 Phone Number:</span>
                        <span className="detail-value">{props.phone}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">🍽️ Event :</span>
                        <span className="detail-value">{props.event}</span>
                    </div>
                </div>
            </div>

            <div className="booking-card-actions">
                <button className="cancel-btn" onClick={props.onCancel}>
                    ❌ Cancel Order
                </button>
            </div>

        </div>
    );
}

export default BookingCard;