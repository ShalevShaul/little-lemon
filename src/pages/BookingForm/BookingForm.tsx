import { useCallback, useEffect, useState } from 'react';
import { useBookingForm } from '../../contexts/FormContext';
import './BookingForm.css';
import PersonalInfo from './steps/step1/PersonalInfo';
import DateTime from './steps/step2/DateTime';
import EventDetails from './steps/step3/EventDetails';
import BookingSummary from './steps/step4/BookingSummary';
import { useBooking } from '../../contexts/BookingContext';
import { useNavigate } from 'react-router';
import DeleteBookingModal from '../../components/DeleteBookingModal/DeleteBookingModal';
import type { Booking } from '../../types/booking';
import CustomButton from '../../components/CustomButton/CustomButton';
import toast from 'react-hot-toast';
import { useLoader } from '../../contexts/LoaderContext';

const steps = [
    {
        component: <PersonalInfo />,
        title: 'Personal Information'
    },
    {
        component: <DateTime />,
        title: 'Date & Time'
    },
    {
        component: <EventDetails />,
        title: 'Event Details'
    },
    {
        component: <BookingSummary />,
        title: 'Review Booking'
    }
];

function BookingForm() {
    const { currentStep, resetForm } = useBookingForm();
    const { upcomingBookings, deleteBooking } = useBooking();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const { setLoaderOn, setLoaderOff } = useLoader();

    useEffect(() => {
        return () => resetForm();
    }, []);

    const goToBookings = useCallback(() => {
        navigate('/bookings');
        window.scroll({ top: 0 });
        setTimeout(() => {
            document.querySelector('div.bookings-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200)
    }, [navigate]);

    const handleCancelClick = useCallback((booking: Booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    }, []);

    const handleConfirmCancel = useCallback(async (bookingId: string) => {
        setLoaderOn('Canceling your booking...');
        try {
            await new Promise(resolve => setTimeout(resolve, 3500));

            deleteBooking(bookingId);
            setIsModalOpen(false);
            setSelectedBooking(null);
        } catch (error) {
            toast.error('Fialed to delete booking.');
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
        if (currentStep > 0) {
            document.querySelector('div.progress-indicator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentStep]);

    const renderProgressIndicator = () => {
        return (
            <div className='progress-indicator' data-step={currentStep}>
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`progress-step ${index === currentStep ? 'active' :
                            index < currentStep ? 'completed' : 'pending'
                            }`}
                    >
                        <div className='step-number'>
                            {index < currentStep ? '✓' : index + 1}
                        </div>
                        <div className='step-title'>{step.title}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='booking-form'>
            {upcomingBookings.length < 2 ?
                <div className='form-container'>
                    {renderProgressIndicator()}
                    <form role='form' onSubmit={(e) => e.preventDefault()}>
                        <div className='form-content'>
                            <div key={currentStep} className='step-wrapper'>
                                {steps[currentStep]?.component}
                            </div>
                        </div>
                    </form>
                </div>
                :
                <div className='max-bookings'>
                    <div className='max-bookings-content'>
                        <div className='max-bookings-icon'>
                            🚫
                        </div>
                        <h2>Maximum Bookings Reached</h2>
                        <p>You've reached the limit of 2 active reservations. Please cancel an existing booking to make a new one.</p>

                        <div className='current-bookings-preview'>
                            <h3>Your Current Bookings:</h3>
                            <div className='mini-booking-cards'>
                                {upcomingBookings.map(booking => (
                                    <div key={booking.id} className='mini-booking-card'>
                                        <span className='booking-date'>{booking.date}</span>
                                        <span className='booking-time'>{booking.time}</span>
                                        <button
                                            className='cancel-mini-btn'
                                            onClick={() => handleCancelClick(booking)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='max-bookings-actions'>
                            <CustomButton text='View All Bookings' onClick={goToBookings} />
                        </div>
                    </div>
                </div>
            }

            <DeleteBookingModal
                isOpen={isModalOpen}
                booking={selectedBooking}
                onClose={handleCloseModal}
                onConfirm={handleConfirmCancel}
            />
        </div>
    );
}

export default BookingForm;