import './BookingsList.css';
import { bookingArray } from '../../data/bookingData';

function BookingsList() {
    return (
        <>
            <header className='bookingsList-header'>
                <div>
                    <h1 className='title'>Reservation Management</h1>
                    <div className='header-stats'>
                        <span className="total-bookings">Total Reservations: {bookingArray.length}</span>
                        <span className="today-date">Today: {new Date().toLocaleDateString('he-IL')}</span>
                    </div>
                </div>
                <img className='header-img' src={require('../../assets/images/restaurant-reservations.webp')} alt='restaurant reservations' />
            </header>
            <main className='bookingsList-main'>
                <div className='bookings-grid'>
                    {bookingArray.map((book) =>
                        <div className={`book ${book.occasion.toLowerCase()}`}>
                            <h2 className='full-name'>{book.firstName} {book.lastName}</h2>
                            <h3 className='occasion'>{book.occasion === 'Anniversary' ? <>💕</> : <>🎂</>} {book.occasion}</h3>
                            <span className='date'>📅 {new Date(book.date).toLocaleDateString('he-IL')} - {book.time}</span>
                            <span className='guests'>👥 {book.guests} guests</span>
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

export default BookingsList;