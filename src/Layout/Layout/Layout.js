import './Layout.css';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import BookingPage from '../../components/BookingPage/BookingPage';
import { Navigate, Route, Routes } from 'react-router-dom';

function Layout() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path='/' element={<Navigate to={'/home'} />} />
                <Route path='/home' element={<><Header /><Main /></>} />
                <Route path='/booking' element={<BookingPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Layout