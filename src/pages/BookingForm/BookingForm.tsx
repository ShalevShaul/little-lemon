import { useEffect, useState } from 'react';
import { useBookingForm } from '../../context/FormContext';
import './BookingForm.css';
import PersonalInfo from './steps/step1/PersonalInfo';
import DateTime from './steps/step2/DateTime';
import EventDetails from './steps/step3/EventDetails';
import Summary from './steps/step4/Summary';
import { useBooking } from '../../context/BookingContext';
import { useNavigate } from 'react-router';
import DeleteBookingModal from '../../components/DeleteBookingModal/DeleteBookingModal';
import type { Booking } from '../../types/booking';
import Button from '../../components/Button/Button';

function BookingForm() {
    const { currentStep, resetForm } = useBookingForm();
    const { getUpcomingBookings, deleteBooking } = useBooking();
    const upComingBookings = getUpcomingBookings();
    const navigate = useNavigate();

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

    useEffect(() => {
        return () => resetForm();
    }, []);

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
            component: <Summary />,
            title: 'Review Booking'
        }
    ];

    const goToBookings = () => {
        navigate('/bookings');
        window.scroll({ top: 0 });
        setTimeout(() => {
            document.querySelector('div.bookings-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200)
    }

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
            {upComingBookings.length < 2 ?
                <div className='form-container'>
                    {renderProgressIndicator()}
                    <form onSubmit={(e) => e.preventDefault()}>
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
                                {upComingBookings.map(booking => (
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
                            <Button text='View All Bookings' onClick={goToBookings} paddingX={25} paddingY={15} />
                            {/* <button
                                className='view-bookings-btn'
                                onClick={goToBookings}
                            >
                                View All Bookings
                            </button> */}
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