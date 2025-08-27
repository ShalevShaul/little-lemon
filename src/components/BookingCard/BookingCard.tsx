import type { Booking } from '../../types/booking';
import './BookingCard.css';

interface BookingCardProps extends Booking {
    onCancel?: () => void;
    position?: 'past' | 'upcoming';
}

function BookingCard(props: BookingCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const ICONS = {
        date: '📅',
        time: '🕐',
        guests: '👥',
        fullName: '👤',
        phone: '📞',
        event: '🍽️'
    };

    const details = [
        { icon: ICONS.date, label: 'Date', value: formatDate(props.date) },
        { icon: ICONS.time, label: 'Time', value: props.time },
        { icon: ICONS.guests, label: 'Guests', value: props.guests },
        { icon: ICONS.fullName, label: 'Name', value: props.fullName },
        { icon: ICONS.phone, label: 'Phone Number', value: props.phone },
        { icon: ICONS.event, label: 'Event', value: props.event },
    ];

    return (
        <div className='booking-card'>
            <div className="booking-card-header">
                <div className="booking-id">
                    <h3>ORDER #{props.id.slice(-6).toUpperCase()}</h3>
                </div>
            </div>

            <div className="booking-card-content">
                <div className="booking-details">
                    {details.map(d =>
                        <div className='detail-row' key={d.label}>
                            <span className='detail-label'>{d.icon} {d.label} :</span>
                            <span className='detail-value'>{d.value}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="booking-card-actions" style={{ display: props.position === 'past' ? 'none' : 'flex'}}>
                <button className="cancel-btn" onClick={props.onCancel}>
                    ❌ Cancel Order
                </button>
            </div>

        </div>
    );
}

export default BookingCard;