import './Main.css';
import Testimonials from '../../blocks/Testimonials/Testimonials';
import About from '../../blocks/About/About';
import Header from '../Header/Header';
import Highlights from '../../blocks/Highlights/Highlights';
import { useEffect, useReducer } from 'react';
import BookingPage from '../../components/BookingPage/BookingPage';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { fetchAPI, submitAPI } from '../../data/api';
import BookingsList from '../../components/BookingsList/BookingsList';
import ConfirmedBooking from '../../components/ConfirmedBooking/ConfirmedBooking';
import { useBooking } from '../../components/BookingContext';
import { bookingArray } from '../../data/bookingData';

export function initializeTimes() {
    return fetchAPI(new Date());
}

export function updateTimes(state, action) {
    switch (action.type) {
        case 'UPDATE_TIMES':
            const selectedDate = action.date;
            if (selectedDate) {
                return fetchAPI(new Date(selectedDate));
            }
            return fetchAPI(new Date());
        default:
            return state;
    }
}

function Main() {
    const navigate = useNavigate();
    const { formData, setFormData, setCurrentBooking } = useBooking();

    function submitForm(e) {
        e.preventDefault();

        const isSubmitted = submitAPI(formData);
        if (isSubmitted) {
            const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
            const newBooking = { ...formData, id: new Date(`${formData.date}T${formData.time}:00`).getTime() };
            existingBookings.push(newBooking);
            localStorage.setItem('bookings', JSON.stringify(existingBookings));

            bookingArray.push(formData);
            setCurrentBooking(formData);
            console.log('Booking submitted successfully!', formData);
            navigate('/confirmed');
            setFormData({
                firstName: '',
                lastName: '',
                date: '',
                time: '',
                guests: 1,
                occasion: ''
            });
            window.scrollTo({ top: 0 });
            return true;
        } else {
            console.log('Booking submission failed');
            return false;
        }
    }

    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

    useEffect(() => {
        const today = new Date();
        dispatch({ type: 'UPDATE_TIMES', date: today.toISOString().split('T')[0] });
    }, []);

    return (
        <>
            <Routes>
                <Route path='/' element={<Navigate to={'/home'} />} />
                <Route path='/home' element={
                    <>
                        <Header />
                        <main>
                            <Highlights />
                            <Testimonials />
                            <About />
                        </main>
                    </>
                } />
                <Route path='/reserve-a-table' element={
                    <BookingPage
                        submitForm={submitForm}
                        availableTimes={availableTimes}
                        dispatch={dispatch}
                    />
                } />
                <Route path='/bookings' element={<BookingsList />} />
                <Route path='/confirmed' element={<ConfirmedBooking />} />
            </Routes>
        </>
    );
}

export default Main;