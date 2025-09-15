import { useState } from 'react';
import { useBookingForm } from '../../../../contexts/FormContext';
import './EventDetails.css';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { validateField } from '../../../../utils/validationUtils';
import GroupIcon from '@mui/icons-material/Group';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import SchoolIcon from '@mui/icons-material/School';
import DiamondIcon from '@mui/icons-material/Diamond';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Event } from '../../../../types/booking';

const EVENT_OPTIONS = [
    { icon: <CakeIcon className='birthday-icon' />, text: 'Birthday' },
    { icon: <FavoriteIcon className='anniversary-icon' />, text: 'Anniversary' },
    { icon: <BusinessCenterIcon className='business-icon' />, text: 'Business Meeting' },
    { icon: <Diversity1Icon className='family-icon' />, text: 'Family Celebration' },
    { icon: <NightlifeIcon className='date-icon' />, text: 'Date Night' },
    { icon: <SchoolIcon className='graduation-icon' />, text: 'Graduation' },
    { icon: <DiamondIcon className='engagement-icon' />, text: 'Engagement' },
    { icon: <ChildFriendlyIcon className='baby-icon' />, text: 'Baby Shower' },
    { icon: <HandshakeIcon className='reunion-icon' />, text: 'Reunion' },
    { icon: <CelebrationIcon className='other-icon' />, text: 'Other' },
];

function EventDetails() {
    const { formData, updateField, currentStep, setCurrentStep } = useBookingForm();
    const [errors, setErrors] = useState({ guests: '', event: '' });

    const isValid = (field: string, value: string | number) => {
        let error = validateField(field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };

    const validateAndNext = () => {
        const isGuestsValid = isValid('guests', formData.guests);
        const isEventValid = isValid('event', formData.event.text);

        if (isGuestsValid && isEventValid) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleFieldChange = (field: keyof typeof formData, value: string | number | Event) => {
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
                    <span className='input-icon'>
                        <GroupIcon className='group-icon' />
                    </span>
                    <input
                        className={errors.guests && 'not-valid'}
                        type="number"
                        id='guests'
                        value={formData.guests || ''}
                        min="1"
                        max="12"
                        onChange={(e) => handleFieldChange('guests', Number(e.target.value))}
                        onBlur={(e) => isValid('guests', e.target.value)}
                        placeholder="Enter number of guests"
                    />
                </div>
                {errors.guests && <span className='error'>{errors.guests}</span>}
            </div>

            <div className='event-selection'>
                <label>Select Event Type:</label>
                <div className='event-grid'>
                    {EVENT_OPTIONS.map((eventOption, index) => {
                        const isSelected = formData.event.text === eventOption.text;

                        return (
                            <button
                                key={index}
                                type="button"
                                className={`event-option ${isSelected ? 'selected' : ''} ${errors.event && 'not-valid'}`}
                                onClick={() => handleFieldChange('event', eventOption)}
                            >
                                <span className='event-emoji'>{eventOption.icon}</span>
                                <span className='event-text'>{eventOption.text}</span>
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
                <CustomButton type='submit' onClick={validateAndNext} text='Review Booking →' />
            </div>
        </section>
    );
}

export default EventDetails;