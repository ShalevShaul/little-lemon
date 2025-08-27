import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import BookingCard from '../../components/BookingCard/BookingCard';
import Button from '../../components/Button/Button';
import DeleteBookingModal from '../../components/DeleteBookingModal/DeleteBookingModal';
import { useBooking } from '../../context/BookingContext';
import type { Booking } from '../../types/booking';
import './ExistingBookings.css';

function ExistingBookings() {
    const navigate = useNavigate();
    const { getPastBookings, getUpcomingBookings, deleteBooking } = useBooking();
    const pastBookings = getPastBookings();
    const upcomingBookings = getUpcomingBookings();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    const goToReserve = () => {
        navigate('/reserve-a-table');
        window.scroll({ top: 0 });
        setTimeout(() =>
            document.querySelector('div.progress-indicator')?.scrollIntoView({ behavior: 'smooth' })
            , 100);
    };

    const handleCancelClick = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleConfirmCancel = (bookingId: string) => {
        deleteBooking(bookingId);
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    return (
        <section className='existing-bookings'>
            {upcomingBookings.length > 0 ?
                <>
                    <h1>Upcoming Bookings</h1>
                    <div className='bookings-grid'>
                        {upcomingBookings?.map(b =>
                            <BookingCard
                                key={b.id}
                                {...b}
                                onCancel={() => handleCancelClick(b)}
                            />
                        )}
                    </div>
                </>
                :
                <div className='no-bookings'>
                    <h1>No Upcoming Bookings</h1>
                    <p>📅 No reservations yet ? Let's fix that !</p>
                    <Button paddingX={25} paddingY={25} text='Reserve A Table' onClick={goToReserve} />
                </div>
            }

            <div className='diff-line'></div>

            {pastBookings.length > 0 ?
                <>
                    <h1>Past Bookings</h1>
                    <div className='bookings-grid'>
                        {pastBookings?.map(b =>
                            <BookingCard
                                key={b.id}
                                {...b}
                                position={'past'}
                                onCancel={() => handleCancelClick(b)}
                            />
                        )}
                    </div>
                </>
                :
                <h1>No Past Bookings</h1>
            }

            <DeleteBookingModal
                isOpen={isModalOpen}
                booking={selectedBooking}
                onClose={handleCloseModal}
                onConfirm={handleConfirmCancel}
            />
        </section>
    );
}

export default ExistingBookings;