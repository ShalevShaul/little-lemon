import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Booking } from '../types/booking';

const ALL_HOURS = [
   '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
   '21:00', '21:30', '22:00', '22:30', '23:00'
];

const generateId = (): string => {
   if (typeof crypto !== 'undefined' && crypto.randomUUID) {
       return crypto.randomUUID();
   }

   return `booking-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
};

interface BookingContextType {
   bookings: Booking[];
   addBooking: (booking: Omit<Booking, 'id'>) => void;
   deleteBooking: (id: string) => void;
   getAvailableHours: (date: string) => string[];
   getBookingsByDate: (date: string) => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
   children: React.ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
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
       setIsLoaded(true);
   }, []);

   useEffect(() => {
       if (isLoaded) {
           console.log('💾 Saving bookings:', bookings.length);
           localStorage.setItem('littleLemonBookings', JSON.stringify(bookings));
       }
   }, [bookings, isLoaded]);

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
       return bookings.filter(booking => booking.date === date);
   };

   const getAvailableHours = (date: string): string[] => {
       if (!date) return ALL_HOURS;

       const bookingsOnDate = getBookingsByDate(date);
       const bookedHours = bookingsOnDate.map(booking => booking.time);

       return ALL_HOURS.filter(hour => !bookedHours.includes(hour));
   };

   const value: BookingContextType = {
       bookings,
       addBooking,
       deleteBooking,
       getAvailableHours,
       getBookingsByDate
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

export { ALL_HOURS };