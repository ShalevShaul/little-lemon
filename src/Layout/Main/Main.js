import './Main.css';
import Testimonials from '../../blocks/Testimonials/Testimonials'; // תיקון שם
import About from '../../blocks/About/About';
import Header from '../Header/Header';
import Highlights from '../../blocks/Highlights/Highlights';
import { useReducer } from 'react';
import BookingPage from '../../components/BookingPage/BookingPage';
import { Navigate, Route, Routes } from 'react-router-dom';

export function initializeTimes() {
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

export function updateTimes(state, action) {
    switch (action.type) {
        case 'UPDATE_TIMES':
            const selectedDate = action.date;
            if (selectedDate) {
                const dayOfWeek = new Date(selectedDate).getDay();

                if (dayOfWeek === 0 || dayOfWeek === 1) {
                    return ['18:00', '19:00', '20:00', '21:00'];
                }
                else if (dayOfWeek === 6) {
                    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
                }
            }
            return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
        default:
            return state;
    }
}

function Main() {
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

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
                <Route path='/booking' element={
                    <BookingPage
                        availableTimes={availableTimes}
                        dispatch={dispatch}
                    />
                } />
            </Routes>
        </>
    );
}

export default Main;