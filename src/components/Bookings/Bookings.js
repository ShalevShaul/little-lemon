import './Bookings.css';

function Bookings({ availableTimes, formData, bookedTimes }) {
    return (
        <section className="bookings-section">
            <h2>Reservation Status</h2>

            {formData.date && (
                <div className="selected-date">
                    <h3>Selected Date: {new Date(formData.date).toLocaleDateString('he-IL')}</h3>
                </div>
            )}

            <div className="times-grid">
                {availableTimes.map(time => {
                    const isBooked = bookedTimes.includes(time);
                    const isSelected = formData.time === time;

                    return (
                        <div
                            key={time}
                            className={`time-slot ${isBooked ? 'booked' : 'available'} ${isSelected ? 'selected' : ''}`}
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

            <div className="booking-info">
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

export default Bookings;