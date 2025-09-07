import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import PageHeader from '../PageHeader/PageHeader';
import './Main.css';
import Loader from '../../components/Loader/Loader';
const Home = lazy(() => import('../../pages/Home/Home'));
const BookingForm = lazy(() => import('../../pages/BookingForm/BookingForm'));
const ExistingBookings = lazy(() => import('../../pages/ExistingBookings/ExistingBookings'));
const BookingConfirmation = lazy(() => import('../../pages/BookingConfirmation/BookingConfirmation'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));

function Main() {
    return (
        <main>
            <PageHeader />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/reserve-a-table' element={<BookingForm />} />
                    <Route path='/bookings' element={<ExistingBookings />} />
                    <Route path='/confirmed' element={<BookingConfirmation />} />
                    <Route path='/' element={<Navigate to='/home' />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
        </main>
    )
}

export default Main;