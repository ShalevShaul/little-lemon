// import './Main.css';
// import Testimonials from '../../blocks/Testimonials/Testimonials';
// import About from '../../blocks/About/About';
// import Header from '../Header/Header';
// import Highlights from '../../blocks/Highlights/Highlights';
// import { useEffect, useReducer } from 'react';
// import BookingPage from '../../components/BookingPage/BookingPage';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import { fetchAPI } from '../../data/api';

// function Main() {
//     function initializeTimes() {
//         const today = new Date(); //
//         return fetchAPI(today); //
//     }

//     function updateTimes(state, action) {
//         switch (action.type) {
//             case 'UPDATE_TIMES':
//                 const selectedDate = action.date;
//                 if (selectedDate) {
//                     return fetchAPI(new Date(selectedDate)); //
//                 }
//                 return fetchAPI(new Date()); //
//             default:
//                 return state;
//         }
//     }

//     const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

//     return (
//         <>
//             <Routes>
//                 <Route path='/' element={<Navigate to={'/home'} />} />
//                 <Route path='/home' element={
//                     <>
//                         <Header />
//                         <main>
//                             <Highlights />
//                             <Testimonials />
//                             <About />
//                         </main>
//                     </>
//                 } />
//                 <Route path='/booking' element={
//                     <BookingPage
//                         availableTimes={availableTimes}
//                         dispatch={dispatch}
//                     />
//                 } />
//             </Routes>
//         </>
//     );
// }

// export default Main;

import './Main.css';
import Testimonials from '../../blocks/Testimonials/Testimonials';
import About from '../../blocks/About/About';
import Header from '../Header/Header';
import Highlights from '../../blocks/Highlights/Highlights';
import { useEffect, useReducer } from 'react';
import BookingPage from '../../components/BookingPage/BookingPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { fetchAPI } from '../../data/api';
import BookingsList from '../../components/BookingsList/BookingsList';

function Main() {
    function initializeTimes() {
        return [];
    }

    function updateTimes(state, action) {
        switch (action.type) {
            case 'UPDATE_TIMES':
                const selectedDate = action.date;
                if (selectedDate) {
                    return fetchAPI(new Date(selectedDate)); //
                }
                return fetchAPI(new Date()); //
            default:
                return state;
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
                        availableTimes={availableTimes}
                        dispatch={dispatch}
                    />
                } />
                <Route path='/bookings' element={<BookingsList />} />
            </Routes>
        </>
    );
}

export default Main;