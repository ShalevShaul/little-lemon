import { Navigate, Route, Routes } from 'react-router';
import PageHeader from '../PageHeader/PageHeader';
import './AppMain.css';
import Home from '../../pages/Home/Home';
import BookingForm from '../../pages/BookingForm/BookingForm';
import ExistingBookings from '../../pages/ExistingBookings/ExistingBookings';
import NotFound from '../../pages/NotFound/NotFound';
import BookingConfirmation from '../../pages/BookingConfirmation/BookingConfirmation';

function Main() {
    return (
        <main>
            <PageHeader />
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/reserve-a-table' element={<BookingForm />} />
                <Route path='/bookings' element={<ExistingBookings />} />
                <Route path='/confirmed' element={<BookingConfirmation />} />
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default Main;