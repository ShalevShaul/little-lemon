import { useState } from 'react';
import BookingForm from '../BookingForm/BookingForm';
import Bookings from '../Bookings/Bookings';
import './BookingPage.css';

function BookingPage({ availableTimes, dispatch }) {
    const initialFormData = {
        firstName: '',
        lastName: '',
        date: '',
        time: '',
        guests: 1,
        occasion: ''
    };

    const [formData, setFormData] = useState(initialFormData)

    function scrollToMain() {
        document.querySelector('main.booking-content').scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            {/* <section className='booking-page'> */}
            <header className='booking-header'>
                <div>
                    <h2 className='title'>Little Lemon</h2>
                    <h3 className='sub-title'>Reserve A Table</h3>
                    <div className='description'>Reserve your table at Little Lemon restaurant in just a few clicks. Choose your preferred date, time, and party size for an unforgettable dining experience. Our easy-to-use booking system shows real-time availability to help you secure the perfect reservation.</div>
                    <button onClick={scrollToMain}>Let's Start</button>
                </div>
                <img className='table-img' src={require('../../assets/images/table.jpg')} alt='Little Lemon signature bruschetta' />
            </header>
            <main className='booking-content'>
                <Bookings formData={formData} availableTimes={availableTimes} />
                <BookingForm
                    initialFormData={initialFormData}
                    formData={formData}
                    setFormData={setFormData}
                    availableTimes={availableTimes}
                    dispatch={dispatch}
                />
            </main>
            {/* </section> */}
        </>
    )
}

export default BookingPage;