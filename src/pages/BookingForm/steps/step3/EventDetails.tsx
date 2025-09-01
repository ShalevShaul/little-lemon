import { useState } from 'react';
import { useBookingForm } from '../../../../context/FormContext';
import './EventDetails.css';
import Button from '../../../../components/Button/Button';

const EVENT_OPTIONS = [
    '🎂 Birthday', '💍 Anniversary', '💼 Business Meeting', '👨‍👩‍👧‍👦 Family Celebration',
    '💕 Date Night', '🎓 Graduation', '💐 Engagement', '🍼 Baby Shower', '🤝 Reunion', '🎉 Other'
];

function EventDetails() {
    const { formData, updateField, currentStep, setCurrentStep } = useBookingForm();
    const [errors, setErrors] = useState({ guests: '', event: '' });

    const validateField = (field: string, value: string | number) => {
        let error = '';

        if (field === 'guests') {
            const guestCount = Number(value);
            if (!value || guestCount < 1) {
                error = 'At least 1 guest is required';
            } else if (guestCount > 12) {
                error = 'Maximum 12 guests allowed';
            }
        }

        if (field === 'event') {
            if (!value) {
                error = 'Please select an event type';
            }
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };

    const validateAndNext = () => {
        const isGuestsValid = validateField('guests', formData.guests);
        const isEventValid = validateField('event', formData.event);

        if (isGuestsValid && isEventValid) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleFieldChange = (field: keyof typeof formData, value: string | number) => {
        updateField(field, value);
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const goBack = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <section className='event-details'>
            <h2>Event Details</h2>

            <div className='input-group'>
                <label htmlFor="guests">Number of Guests:</label>
                <div className='input-with-icon'>
                    <span className='input-icon'>👥</span>
                    <input
                        className={errors.guests && 'not-valid'}
                        type="number"
                        id='guests'
                        value={formData.guests || ''}
                        min="1"
                        max="12"
                        onChange={(e) => handleFieldChange('guests', Number(e.target.value))}
                        placeholder="Enter number of guests"
                    />
                </div>
                {errors.guests && <span className='error'>{errors.guests}</span>}
            </div>

            <div className='event-selection'>
                <label>Select Event Type:</label>
                <div className='event-grid'>
                    {EVENT_OPTIONS.map((eventOption, index) => {
                        const eventText = eventOption.split(' ').slice(1).join(' ');
                        const isSelected = formData.event === eventOption;

                        return (
                            <button
                                key={index}
                                type="button"
                                className={`event-option ${isSelected ? 'selected' : ''} ${errors.event && 'not-valid'}`}
                                onClick={() => handleFieldChange('event', eventOption)}
                            >
                                <span className='event-emoji'>{eventOption.split(' ')[0]}</span>
                                <span className='event-text'>{eventText}</span>
                            </button>
                        );
                    })}
                </div>
                {errors.event && <span className='error'>{errors.event}</span>}
            </div>

            <div className='button-group'>
                <button type="button" onClick={goBack} className='back-btn'>
                    ← Back
                </button>
                <Button type='submit' onClick={validateAndNext} text='Review Booking →' paddingX={60} paddingY={15} />
            </div>
        </section>
    );
}

export default EventDetails;