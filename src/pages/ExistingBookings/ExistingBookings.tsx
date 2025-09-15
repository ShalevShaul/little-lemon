import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import BookingCard from '../../components/BookingCard/BookingCard';
import CustomButton from '../../components/CustomButton/CustomButton';
import DeleteBookingModal from '../../components/DeleteBookingModal/DeleteBookingModal';
import { useBooking } from '../../contexts/BookingContext';
import type { Booking } from '../../types/booking';
import Loader from '../../components/Loader/Loader';
import './ExistingBookings.css';
import BookingsSection from '../../components/BookingsSection/BookingsSection';

function ExistingBookings() {
    const navigate = useNavigate();
    const { pastBookings, upcomingBookings, deleteBooking, isLoaded } = useBooking();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const goToReserve = () => {
        navigate('/reserve-a-table');
        window.scroll({ top: 0 });
        setTimeout(() =>
            document.querySelector('div.progress-indicator')?.scrollIntoView({ behavior: 'smooth' })
            , 100);
    };

    const handleConfirmCancel = useCallback((bookingId: string) => {
        deleteBooking(bookingId);
        setIsModalOpen(false);
        setSelectedBooking(null);
    }, [deleteBooking]);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    }, []);

    if (!isLoaded) return <Loader />
    return (
        <section className='existing-bookings'>
            {upcomingBookings.length > 0 ?
                <>
                    <BookingsSection
                        title='Upcoming Bookings'
                        bookings={upcomingBookings}
                        position='upcoming'
                        setSelectedBooking={setSelectedBooking}
                        setIsModalOpen={setIsModalOpen}
                    />
                </>
                :
                <div className='no-bookings'>
                    <h1>No Upcoming Bookings</h1>
                    <p>📅 No reservations yet ? Let's fix that !</p>
                    <CustomButton text='Reserve A Table' onClick={goToReserve} />
                </div>
            }

            <div className='diff-line'></div>

            {pastBookings.length > 0 ?
                <>
                    <BookingsSection
                        title='Past Bookings'
                        bookings={pastBookings}
                        position='past'
                        setSelectedBooking={setSelectedBooking}
                        setIsModalOpen={setIsModalOpen}
                    />
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