import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CustomButton from '../../components/CustomButton/CustomButton';
import DeleteBookingModal from '../../components/DeleteBookingModal/DeleteBookingModal';
import { useBooking } from '../../contexts/BookingContext';
import type { Booking } from '../../types/booking';
import './ExistingBookings.scss';
import BookingsSection from '../../components/BookingsSection/BookingsSection';
import toast from 'react-hot-toast';
import { useLoader } from '../../contexts/LoaderContext';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import { useModal } from '../../contexts/ModalContext';

function ExistingBookings() {
    const navigate = useNavigate();
    const { pastBookings, upcomingBookings, deleteBooking, isLoaded } = useBooking();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const { setLoaderOn, setLoaderOff } = useLoader();
    const { openModal, closeModal } = useModal();

    const goToReserve = () => {
        navigate('/reserve-a-table');
        window.scroll({ top: 0 });
        setTimeout(() =>
            document.querySelector('div.progress-indicator')?.scrollIntoView({ behavior: 'smooth' })
            , 100);
    };

    const handleConfirmCancel = useCallback(async (bookingId: string) => {
        setLoaderOn('Canceling your booking...');
        try {
            await new Promise(resolve => setTimeout(resolve, 3500));

            deleteBooking(bookingId);
            setIsModalOpen(false);
            setSelectedBooking(null);
        } catch (error) {
            toast.error('Failed to delete booking.');
            console.log('Failed to delete booking', error);
        } finally {
            setLoaderOff();
        }
    }, [deleteBooking]);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            openModal(
                <DeleteBookingModal
                    booking={selectedBooking}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmCancel}
                />
            );
        } else {
            closeModal();
        }

        return () => closeModal();
    }, [isModalOpen]);

    return (
        <section className='existing-bookings'>
            {!isLoaded ? <SkeletonLoader count={2} /> :
                <>
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
                            <CustomButton color='secondary' text='Reserve A Table' onClick={goToReserve} />
                        </div>}


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
                </>
            }
        </section>
    );
}

export default ExistingBookings;