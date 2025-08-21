import { useState } from 'react';
import { useBookingForm } from '../../../../context/FormContext';
import { useBooking } from '../../../../context/BookingContext';
import './DateTime.css';
import Button from '../../../../components/Button/Button';

function DateTime() {
    const { formData, updateField, currentStep, setCurrentStep } = useBookingForm();
    const { getAvailableHours } = useBooking();
    const [errors, setErrors] = useState({ date: '', time: '' });

    const availableHours = getAvailableHours(formData.date);
    const today = new Date().toISOString().split('T')[0];

    const validateField = (field: string, value: string) => {
        let error = '';

        if (field === 'date') {
            if (!value) {
                error = 'Date is required';
            } else if (value < today) {
                error = 'Past dates are not allowed';
            }
        }

        if (field === 'time') {
            if (!value) {
                error = 'Time is required';
            }
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };

    const validateAndNext = () => {
        const isDateValid = validateField('date', formData.date);
        const isTimeValid = validateField('time', formData.time);

        if (isDateValid && isTimeValid) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleDateChange = (value: string) => {
        updateField('date', value);

        if (formData.time) {
            updateField('time', '');
        }
        if (errors.date) {
            setErrors(prev => ({ ...prev, date: '', time: '' }));
        }
    };

    const handleTimeSelect = (time: string) => {
        updateField('time', time);
        if (errors.time) {
            setErrors(prev => ({ ...prev, time: '' }));
        }
    };

    const goBack = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <section className='date-time-section'>
            <h2>Select Date & Time</h2>

            <div className='input-group'>
                <label htmlFor="date">Select Date:</label>
                <input
                    className={errors.date && 'not-valid'}
                    type="date"
                    id='date'
                    value={formData.date}
                    min={today}
                    onChange={(e) => handleDateChange(e.target.value)}
                />
                {errors.date && <span className='error'>{errors.date}</span>}
            </div>

            <div className='time-selection'>
                <label>Select Time:</label>
                {formData.date ? (
                    <div className='time-grid'>
                        {availableHours.length > 0 ? (
                            availableHours.map((time) => (
                                <button
                                    key={time}
                                    type="button"
                                    className={`time-slot ${formData.time === time ? 'selected' : ''} ${errors.time && 'not-valid'} `}
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </button>
                            ))
                        ) : (
                            <p className='no-times'>No available times for this date</p>
                        )}
                    </div>
                ) : (
                    <p className={`select-date-first ${errors.time && 'not-valid'}`}>Please select a date first</p>
                )}
                {errors.time && <span className='error'>{errors.time}</span>}
            </div>

            <div className='button-group'>
                <button type="button" onClick={goBack} className='back-btn'>
                    ← Back
                </button>
                <Button onClick={validateAndNext} paddingX={88} paddingY={15} text='Next Step →' />
            </div>
        </section>
    );
}

export default DateTime;