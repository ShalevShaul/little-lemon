import { useState } from 'react';
import { useBookingForm } from '../../../../context/FormContext';
import './PersonalInfo.css';
import Button from '../../../../components/Button/Button';

function PersonalInfo() {
    const { formData, updateField, currentStep, setCurrentStep } = useBookingForm();
    const [errors, setErrors] = useState({ fullName: '', phone: '' });

    const validateField = (field: string, value: string | number) => {
        let error = '';

        if (field === 'fullName') {
            if (!value) {
                error = '* Full name is required';
            } else if (value.toString().length < 2) {
                error = '* Name must be at least 2 characters';
            }
        }

        if (field === 'phone') {
            if (!value) {
                error = '* Phone number is required';
            } else if (value.toString().length < 10) {
                error = '* Phone number must be at least 10 digits';
            }
        }

        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };

    const validateAndNext = () => {
        const isFullNameValid = validateField('fullName', formData.fullName);
        const isPhoneValid = validateField('phone', formData.phone);

        if (isFullNameValid && isPhoneValid) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleFieldChange = (field: keyof typeof formData, value: string | number) => {
        updateField(field, value);
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <section className='personal-info'>
            <h2>Personal Information</h2>

            <div className='input-group'>
                <label htmlFor="fullname">Full Name:</label>
                <div className='input-with-icon'>
                    <span className='input-icon'>👤</span>
                    <input
                        className={errors.fullName && 'not-valid'}
                        id='fullname'
                        value={formData.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        onBlur={(e) => validateField('fullname', e.target.value)}
                        placeholder='Full Name'
                        required
                        minLength={2}
                    />
                </div>
                {errors.fullName && <span className='error'>{errors.fullName}</span>}
            </div>

            <div className='input-group'>
                <label htmlFor='phone'>Phone Number:</label>
                <div className='input-with-icon'>
                    <span className='input-icon'>📞</span>
                    <input
                        className={errors.phone && 'not-valid'}
                        type="tel"
                        // make it numbers only
                        id='phone'
                        value={formData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        onBlur={(e) => validateField('phone', e.target.value)}
                        placeholder='Phone Number'
                        required
                        minLength={10}
                    />
                </div>
                {errors.phone && <span className='error'>{errors.phone}</span>}
            </div>

            <Button paddingX={15} paddingY={15} text='Next Step' onClick={validateAndNext} />
        </section>
    )
}

export default PersonalInfo;