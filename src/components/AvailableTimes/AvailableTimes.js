import { useBooking } from '../BookingContext';
import './AvailableTimes.css';

function AvailableTimes({ availableTimes, bookedTimes }) {
    const { formData } = useBooking();

    return (
        <section className="bookings-section" aria-label="Available reservation times">
            <h2>{formData.date ? <></> : <span>Today's</span>} Reservation Status</h2>

            {formData.date && (
                <div className="selected-date" aria-label="Selected date information">
                    <h3>Selected Date: {new Date(formData.date).toLocaleDateString('he-IL')}</h3>
                </div>
            )}

            <div className="times-grid" aria-label="Time slots availability" role='grid'>
                {availableTimes.map(time => {
                    const isBooked = bookedTimes.includes(time);
                    const isSelected = formData.time === time;

                    return (
                        <div
                            key={time}
                            className={`time-slot ${isBooked ? 'booked' : 'available'} ${isSelected ? 'selected' : ''}`}
                            role='gridcell'
                        >
                            <span className="time">{time}</span>
                            <span className={`status ${isBooked ? 'status-booked' : 'status-available'}`}>
                                {isBooked ? 'Booked' : 'Available'}
                            </span>
                            {isSelected && <span className="selected-indicator">✓ Selected</span>}
                        </div>
                    );
                })}
            </div>

            <div className="booking-info" aria-label="Booking instructions">
                <p>💡 Select your preferred time slot in the form below</p>
                {formData.time && (
                    <p className="current-selection">
                        Current selection: <strong>{formData.time}</strong>
                    </p>
                )}
            </div>
        </section>
    );
}

export default AvailableTimes;