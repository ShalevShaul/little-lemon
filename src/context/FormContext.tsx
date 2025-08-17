import React, { createContext, useContext, useState } from 'react';
import type { Booking } from '../types/booking';

type FormData = Omit<Booking, 'id'>;

interface BookingFormContextType {
    formData: FormData;
    currentStep: number;
    updateField: (field: keyof FormData, value: string | number) => void;
    setCurrentStep: (step: number) => void;
}

const BookingFormContext = createContext<BookingFormContextType | undefined>(undefined);

interface BookingFormProviderProps {
    children: React.ReactNode
}

export const BookingFormProvider: React.FC<BookingFormProviderProps> = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phone: 0,
        date: '',
        time: '',
        guests: 0,
        event: ''
    });

    const updateField = (field: keyof FormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const value: BookingFormContextType = {
        formData,
        currentStep,
        updateField,
        setCurrentStep
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