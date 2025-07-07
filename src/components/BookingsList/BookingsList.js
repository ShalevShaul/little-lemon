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
        const newBookings = bookings.filter(book => book.id !== id);
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
            <header className='bookingsList-header' aria-label="Reservations management">
                <div>
                    <h1 className='title'>Reservation Management</h1>
                    <div className='header-stats'>
                        <p className="total-bookings">Total Reservations: <strong>{bookings.length}</strong></p>
                        <p className="today-date">Today: <strong>{new Date().toLocaleDateString('he-IL')}</strong></p>
                    </div>
                </div>
                <img className='header-img' src={require('../../assets/images/restaurant-reservations.webp')} alt='Restaurant dining area with reserved tables' />
            </header>
            <main className='bookingsList-main' aria-label="Current reservations">
                {bookings.length > 0 ?
                    <div className='bookings-grid' role='grid' aria-label='Reservation cards'>
                        {bookings.map((book) =>
                            <article key={book.id} className={`book ${book.occasion.toLowerCase()}`} aria-label={`Reservation for ${book.firstName} ${book.lastName}`}>
                                <button aria-label={`On Click Cancel reservation for ${book.firstName} ${book.lastName}`}
                                    onClick={() => removeBooking(book.id)} title='Cancel reservation' >
                                    <img className='removeBtn'
                                        src={require('../../assets/icons/remove-button.png')} alt='remove button' />
                                </button>
                                <h2 className='full-name'>{book.firstName} {book.lastName}</h2>
                                <h3 className='occasion'>{book.occasion === 'Anniversary' ? <>💕</> : <>🎂</>} {book.occasion}</h3>
                                <p className='date'>📅 {new Date(book.date).toLocaleDateString('he-IL')} - {book.time}</p>
                                <p className='guests'>👥 {book.guests} guests</p>
                            </article>
                        )}
                    </div>
                    : <div className='no-reservations' aria-label="No reservations found">
                        <h2>No bookings at the moment 🍽️</h2>
                        <button onClick={goToReserve} aria-label="On Click navigate to table reservation page">Reserve a table</button>
                    </div>}
            </main>
        </>
    )
}

export default BookingsList;