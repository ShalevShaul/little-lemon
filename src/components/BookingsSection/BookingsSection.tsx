import { useCallback } from 'react';
import BookingCard from '../BookingCard/BookingCard';
import './BookingsSection.css';
import { Booking } from '../../types/booking';

interface BookingsSectionProps {
    title: 'Upcoming Bookings' | 'Past Bookings';
    bookings: Booking[];
    position?: 'past' | 'upcoming';
    setSelectedBooking(booking: Booking): void;
    setIsModalOpen(open: boolean): void;
}

function BookingsSection(props: BookingsSectionProps) {
    const handleCancelClick = useCallback((booking: Booking) => {
        props.setSelectedBooking(booking);
        props.setIsModalOpen(true);
    }, []);

    return (
        <>
            <h1>{props.title}</h1>
            <div className='bookings-grid'>
                {props.bookings?.map(b =>
                    <BookingCard
                        key={b.id}
                        {...b}
                        position={props.position}
                        onCancel={handleCancelClick}
                    />
                )}
            </div>
        </>
    )
}

export default BookingsSection;