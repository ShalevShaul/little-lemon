import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        date: '',
        time: '',
        guests: 1,
        occasion: ''
    });

    const [currentBooking, setCurrentBooking] = useState(null);

    return (
        <BookingContext.Provider value={{
            formData,
            setFormData,
            currentBooking,
            setCurrentBooking
        }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within BookingProvider');
    }
    return context;
}