import React, { createContext, useContext, useState } from 'react';
import type { Booking, Event } from '../types/booking';

type FormData = Omit<Booking, 'id'>;

interface BookingFormContextType {
    formData: FormData;
    currentStep: number;
    updateField: (field: keyof FormData, value: string | number | Event) => void;
    setCurrentStep: (step: number) => void;
    resetForm: () => void;
}

interface BookingFormProviderProps {
    children: React.ReactNode;
}

const BookingFormContext = createContext<BookingFormContextType | undefined>(undefined);

export const BookingFormProvider = ({ children }: BookingFormProviderProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const INITIAL_FORM_DATA: FormData = {
        fullName: '', phone: '', date: '', time: '', guests: 0, event: { icon: '', text: '' }
    };

    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

    const updateField = (field: keyof FormData, value: string | number | Event) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM_DATA);
        setCurrentStep(0);
    };

    const value: BookingFormContextType = {
        formData,
        currentStep,
        updateField,
        setCurrentStep,
        resetForm
    };

    return (
        <BookingFormContext.Provider value={value}>
            {children}
        </BookingFormContext.Provider>
    );
};

export const useBookingForm = (): BookingFormContextType => {
    const context = useContext(BookingFormContext);
    if (context === undefined) {
        throw new Error('useBookingForm must be used within a BookingFormProvider');
    }
    return context;
};