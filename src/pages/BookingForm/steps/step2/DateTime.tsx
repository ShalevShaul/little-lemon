import { useState } from 'react';
import { useBookingForm } from '../../../../contexts/FormContext';
import { useBooking } from '../../../../contexts/BookingContext';
import './DateTime.css';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { validateField } from '../../../../utils/validationUtils';

function DateTime() {
    const { formData, updateField, currentStep, setCurrentStep } = useBookingForm();
    const { getAvailableHours } = useBooking();
    const [errors, setErrors] = useState({ date: '', time: '' });

    const availableHours = getAvailableHours(formData.date);
    const today = new Date().toISOString().split('T')[0];

    const isValid = (field: 'date' | 'time', value: string) => {
        let error = validateField(field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };

    const validateAndNext = () => {
        const isDateValid = isValid('date', formData.date);
        const isTimeValid = isValid('time', formData.time);

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
                    onBlur={(e) => isValid('date', e.target.value)}
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
                <CustomButton type='submit' onClick={validateAndNext} text='Next Step →' />
            </div>
        </section>
    );
}

export default DateTime;