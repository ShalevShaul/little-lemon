import React, { createContext, useContext, useMemo } from 'react';
import type { Booking } from '../types/booking';
import { useBookingStorage } from '../hooks/useBookingStorage';
import { generateId } from '../utils/generateId';

const ALL_HOURS = [
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', '22:30', '23:00'
];

interface BookingContextType {
    bookings: Booking[];
    sortedBookings: Booking[];
    pastBookings: Booking[];
    upcomingBookings: Booking[];
    isLoaded: boolean;
    addBooking: (booking: Omit<Booking, 'id'>) => void;
    deleteBooking: (id: string) => void;
    getAvailableHours: (date: string) => string[];
    getBookingsByDate: (date: string) => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
    children: React.ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
    const { bookings, setBookings, isLoaded } = useBookingStorage();

    const sortedBookings: Booking[] = useMemo(() => {
        return [...bookings].sort((a, b) => {
            const dateComparison = Number(new Date(a.date)) - Number(new Date(b.date));
            if (dateComparison === 0) {
                return a.time.localeCompare(b.time);
            }
            return dateComparison;
        })
    }, [bookings]);

    const bookingsByDate = useMemo(() => {
        const dateMap = new Map<string, Booking[]>();

        for (const booking of bookings) {
            if (!dateMap.has(booking.date)) {
                dateMap.set(booking.date, []);
            }
            dateMap.get(booking.date)!.push(booking);
        }

        return dateMap;
    }, [bookings]);

    const { pastBookings, upcomingBookings } = useMemo(() => {
        const now = new Date();
        const past: Booking[] = [];
        const upcoming: Booking[] = [];

        for (const booking of sortedBookings) {
            const bookingDateTime = new Date(`${booking.date} ${booking.time}`);
            if (bookingDateTime < now) {
                past.push(booking);
            } else {
                upcoming.push(booking);
            }
        }

        return { pastBookings: past, upcomingBookings: upcoming };
    }, [sortedBookings]);

    const addBooking = (bookingData: Omit<Booking, 'id'>) => {
        const newBooking: Booking = {
            ...bookingData,
            id: generateId()
        };

        setBookings(prevBookings => [...prevBookings, newBooking]);
    };

    const deleteBooking = (id: string) => {
        setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
    };

    const getBookingsByDate = (date: string): Booking[] => {
        return bookingsByDate.get(date) || [];
    };

    const getAvailableHours = (date: string): string[] => {
        if (!date) return ALL_HOURS;

        const bookingsOnDate = getBookingsByDate(date);
        const bookedHours = bookingsOnDate.map(booking => booking.time);

        let availableHours = ALL_HOURS.filter(hour => !bookedHours.includes(hour));

        const today = new Date().toISOString().split('T')[0];
        if (date === today) {
            const now = new Date().toTimeString().slice(0, 5); // HH:MM format
            availableHours = availableHours.filter(hour => hour > now);
        }

        return availableHours;
    };

    const value: BookingContextType = {
        bookings,
        sortedBookings,
        pastBookings,
        upcomingBookings,
        isLoaded,
        addBooking,
        deleteBooking,
        getAvailableHours,
        getBookingsByDate,
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = (): BookingContextType => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};