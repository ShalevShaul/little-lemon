import { useState } from 'react';
import { useBookingForm } from '../../../../context/FormContext';
import './PersonalInfo.css';
import Button from '../../../../components/Button/Button';
import { validateField } from '../../../../utils/validationUtils';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function PersonalInfo() {
    const { formData, updateField, currentStep, setCurrentStep } = useBookingForm();
    const [errors, setErrors] = useState({ fullName: '', phone: '' });

    const isValid = (field: string, value: string | number) => {
        let error = validateField(field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };

    const validateAndNext = () => {
        const isFullNameValid = isValid('fullName', formData.fullName);
        const isPhoneValid = isValid('phone', formData.phone);

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

    const handleTelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hasInvalidChars = /[^0-9]/.test(e.target.value);

        if (hasInvalidChars) {
            setErrors(prev => ({ ...prev, phone: '* You can insert numbers only' }));
        } else {
            setErrors(prev => ({ ...prev, phone: '' }));
        }

        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    };

    return (
        <section className='personal-info'>
            <h2>Personal Information</h2>

            <div className='input-group'>
                <label htmlFor="fullname">Full Name:</label>
                <div className='input-with-icon'>
                    <span className='input-icon'>
                        <PersonIcon className='person-icon' />
                    </span>
                    <input
                        className={errors.fullName && 'not-valid'}
                        id='fullname'
                        value={formData.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        onBlur={(e) => isValid('fullName', e.target.value)}
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
                    <span className='input-icon'>
                        <LocalPhoneIcon className='phone-icon' />
                    </span>
                    <input
                        className={errors.phone && 'not-valid'}
                        type="tel"
                        onInput={handleTelInputChange}
                        id='phone'
                        value={formData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        onBlur={(e) => isValid('phone', e.target.value)}
                        placeholder='Phone Number'

                        required
                        minLength={10}
                    />
                </div>
                {errors.phone && <span className='error'>{errors.phone}</span>}
            </div>

            <Button type='submit' text='Next Step' onClick={validateAndNext} />
        </section>
    )
}

export default PersonalInfo;