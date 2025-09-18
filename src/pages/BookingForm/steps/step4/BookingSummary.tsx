import { useEffect, useState } from 'react';
import { useBookingForm } from '../../../../contexts/FormContext';
import { useBooking } from '../../../../contexts/BookingContext';
import './BookingSummary.css';
import { useNavigate } from 'react-router';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useLoader } from '../../../../contexts/LoaderContext';


function BookingSummary() {
    const { formData, currentStep, setCurrentStep } = useBookingForm();
    const { addBooking } = useBooking();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { setLoaderOn, setLoaderOff } = useLoader();

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleConfirmBooking = async () => {
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 3500));

            const bookingDataForNavigation = {
                ...formData,
                event: {
                    text: formData.event.text
                }
            };

            addBooking(formData);
            navigate('/confirmed', { state: bookingDataForNavigation });
        } catch (error) {
            console.error('Error confirming booking:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const goBack = () => {
        setCurrentStep(currentStep - 1);
    };

    useEffect(() => {
        if (isSubmitting) {
            setLoaderOn('Creating your booking...');
        } else {
            setLoaderOff();
        }

        return () => setLoaderOff();
    }, [isSubmitting]);

    return (
        <section className='Summary'>
            <h2>Review Your Booking</h2>

            <div className='summary-card'>
                <div className='summary-header'>
                    <h3>Booking Summary</h3>
                </div>

                <div className='summary-details'>
                    <div className='detail-row'>
                        <span className='detail-label'><PersonIcon className='person-icon' /> Name:</span>
                        <span className='detail-value'>{formData.fullName}</span>
                    </div>

                    <div className='detail-row'>
                        <span className='detail-label'><LocalPhoneIcon className='phone-icon' /> Phone:</span>
                        <span className='detail-value'>{formData.phone}</span>
                    </div>

                    <div className='detail-row'>
                        <span className='detail-label'><AlternateEmailIcon className='email-icon' /> Email:</span>
                        <span className='detail-value'>{formData.email}</span>
                    </div>

                    <div className='detail-row'>
                        <span className='detail-label'><CalendarMonthIcon className='date-icon' /> Date:</span>
                        <span className='detail-value'>{formatDate(formData.date)}</span>
                    </div>

                    <div className='detail-row'>
                        <span className='detail-label'><AccessTimeIcon className='time-icon' /> Time:</span>
                        <span className='detail-value'>{formData.time}</span>
                    </div>

                    <div className='detail-row'>
                        <span className='detail-label'><GroupIcon className='group-icon' /> Guests:</span>
                        <span className='detail-value'>
                            {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                        </span>
                    </div>

                    <div className='detail-row'>
                        <span className='detail-label'>
                            {formData.event.icon} Event:
                        </span>
                        <span className='detail-value'>{formData.event.text}</span>
                    </div>
                </div>

                <div className='summary-note'>
                    <p>
                        <strong>Please note:</strong> Your table will be reserved for 2 hours.
                        If you need to make any changes, please contact us directly.
                    </p>
                </div>
            </div>

            <div className='button-group'>
                <button onClick={goBack} className='back-btn'>
                    ← Edit Details
                </button>
                <CustomButton color='secondary' onClick={handleConfirmBooking}
                    text={isSubmitting ? 'Confirming...' : 'Confirm Booking ✓'} />
            </div>
        </section>
    );
}

export default BookingSummary;