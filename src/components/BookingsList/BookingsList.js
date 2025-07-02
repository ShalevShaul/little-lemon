import './BookingsList.css';
import { bookingArray } from '../../data/bookingData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingsList() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];

        let allBookings = [...savedBookings];

        bookingArray.forEach(book => {
            const exists = allBookings.some(existing =>
                existing.firstName === book.firstName &&
                existing.lastName === book.lastName &&
                existing.date === book.date &&
                existing.time === book.time
            );

            if (!exists) {
                const bookingWithId = {
                    ...book,
                    id: new Date(`${book.date}T${book.time}:00`).getTime()
                };
                allBookings.push(bookingWithId);
            }
        });

        localStorage.setItem('bookings', JSON.stringify(allBookings));

        setBookings(allBookings);
    }, []);

    function removeBooking(id) {
        const newBookings = bookings.filter(book => book.id != id);
        setBookings(newBookings);

        localStorage.setItem('bookings', JSON.stringify(newBookings));
    }

    function goToReserve() {
        navigate('/reserve-a-table');
        setTimeout(() => {
            document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
        }, 50)
    }

    return (
        <>
            <header className='bookingsList-header'>
                <div>
                    <h1 className='title'>Reservation Management</h1>
                    <div className='header-stats'>
                        <span className="total-bookings">Total Reservations: {bookings.length}</span>
                        <span className="today-date">Today: {new Date().toLocaleDateString('he-IL')}</span>
                    </div>
                </div>
                <img className='header-img' src={require('../../assets/images/restaurant-reservations.webp')} alt='restaurant reservations' />
            </header>
            <main className='bookingsList-main'>
                {bookings.length > 0 ?
                    <div className='bookings-grid'>
                        {bookings.map((book) =>
                            <div key={book.id} className={`book ${book.occasion.toLowerCase()}`}>
                                <img className='removeBtn' onClick={() => removeBooking(book.id)} src={require('../../assets/icons/remove-button.png')} alt='remove button' />
                                {/* <button className='removeBtn' onClick={() => removeBooking(book.id)}>X</button> */}
                                <h2 className='full-name'>{book.firstName} {book.lastName}</h2>
                                <h3 className='occasion'>{book.occasion === 'Anniversary' ? <>💕</> : <>🎂</>} {book.occasion}</h3>
                                <span className='date'>📅 {new Date(book.date).toLocaleDateString('he-IL')} - {book.time}</span>
                                <span className='guests'>👥 {book.guests} guests</span>
                            </div>
                        )}
                    </div>
                    : <div className='no-reservations'>
                        <h2>No bookings at the moment 🍽️</h2>
                        <button onClick={goToReserve}>Reserve a table</button>
                    </div>}
            </main>
        </>
    )
}

export default BookingsList;