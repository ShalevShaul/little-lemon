import { useEffect, useState } from "react";
import type { Booking } from "../types/booking";

export const useBookingStorage = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedBookings = localStorage.getItem('littleLemonBookings');
        if (savedBookings) {
            try {
                const parsedBookings = JSON.parse(savedBookings);
                setBookings(parsedBookings);
                console.log('📖 Loaded bookings:', parsedBookings.length);
            } catch (error) {
                console.error('Error loading bookings from localStorage:', error);
                setBookings([]);
            }
        }
        setTimeout(() => {
            setIsLoaded(true);
        }, 2000)
    }, []);

    useEffect(() => {
        if (isLoaded) {
            console.log('💾 Saving bookings:', bookings.length);
            localStorage.setItem('littleLemonBookings', JSON.stringify(bookings));
        }
    }, [bookings, isLoaded]);

    return { bookings, setBookings, isLoaded };
};