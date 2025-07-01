import { useState } from 'react';
import BookingForm from '../BookingForm/BookingForm';
import Bookings from '../Bookings/Bookings';
import './BookingPage.css';

function BookingPage({ availableTimes, dispatch }) {
    const bookedTimes = ['18:00', '20:00', '20:30'];

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
                    <h1 className='title'>Little Lemon</h1>
                    <h2 className='sub-title'>Reserve A Table</h2>
                    <div className='description'>Reserve your table at Little Lemon restaurant in just a few clicks. Choose your preferred date, time, and party size for an unforgettable dining experience. Our easy-to-use booking system shows real-time availability to help you secure the perfect reservation.</div>
                    <button onClick={scrollToMain}>Let's Start</button>
                </div>
                <img className='table-img' src={require('../../assets/images/table.jpg')} alt='Little Lemon signature bruschetta' />
            </header>
            <main className='booking-content'>
                <Bookings formData={formData} availableTimes={availableTimes} bookedTimes={bookedTimes} />
                <BookingForm
                    initialFormData={initialFormData}
                    formData={formData}
                    setFormData={setFormData}
                    availableTimes={availableTimes}
                    dispatch={dispatch}
                    bookedTimes={bookedTimes}
                />
            </main>
            {/* </section> */}
        </>
    )
}

export default BookingPage;