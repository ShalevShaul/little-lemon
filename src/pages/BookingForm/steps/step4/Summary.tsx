import { useState } from 'react';
import { useBookingForm } from '../../../../context/FormContext';
import { useBooking } from '../../../../context/BookingContext';
import './Summary.css';
import { useNavigate } from 'react-router';
import Button from '../../../../components/Button/Button';
import Loader from '../../../../components/Loader/Loader';

function Summary() {
    const { formData, currentStep, setCurrentStep } = useBookingForm();
    const { addBooking } = useBooking();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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

    const formatEvent = (eventString: string) => {
        if (!eventString) return '';
        return eventString.split(' ').slice(1).join(' ');
    };

    const getEventEmoji = (eventString: string) => {
        if (!eventString) return '';
        return eventString.split(' ')[0];
    };

    const handleConfirmBooking = async () => {
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 3500));

            addBooking(formData);
            navigate('/confirmed', { state: formData })
        } catch (error) {
            console.error('Error confirming booking:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const goBack = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <>
            {isSubmitting ?
                <Loader />
                :
                <section className='Summary'>
                    <h2>Review Your Booking</h2>

                    <div className='summary-card'>
                        <div className='summary-header'>
                            <h3>Booking Summary</h3>
                        </div>

                        <div className='summary-details'>
                            <div className='detail-row'>
                                <span className='detail-label'>👤 Name:</span>
                                <span className='detail-value'>{formData.fullName}</span>
                            </div>

                            <div className='detail-row'>
                                <span className='detail-label'>📞 Phone:</span>
                                <span className='detail-value'>{formData.phone}</span>
                            </div>

                            <div className='detail-row'>
                                <span className='detail-label'>📅 Date:</span>
                                <span className='detail-value'>{formatDate(formData.date)}</span>
                            </div>

                            <div className='detail-row'>
                                <span className='detail-label'>🕐 Time:</span>
                                <span className='detail-value'>{formData.time}</span>
                            </div>

                            <div className='detail-row'>
                                <span className='detail-label'>👥 Guests:</span>
                                <span className='detail-value'>
                                    {formData.guests} {formData.guests === 1 ? 'Guest' : 'Guests'}
                                </span>
                            </div>

                            <div className='detail-row'>
                                <span className='detail-label'>
                                    {getEventEmoji(formData.event)} Event:
                                </span>
                                <span className='detail-value'>{formatEvent(formData.event)}</span>
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
                        <Button onClick={handleConfirmBooking} paddingX={15} paddingY={15}
                            text={isSubmitting ? 'Confirming...' : 'Confirm Booking ✓'} />
                    </div>
                </section>
            }
        </>
    );
}

export default Summary;