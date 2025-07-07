import BookingForm from '../BookingForm/BookingForm';
import './BookingPage.css';
import AvailableTimes from '../AvailableTimes/AvailableTimes';

function BookingPage({ submitForm, availableTimes, dispatch }) {
    const bookedTimes = ['18:00', '20:00', '20:30'];

    function scrollToMain() {
        document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <header className='booking-header' aria-label="Table reservation page">
                <div>
                    <h1 className='title'>Reserve A Table</h1>
                    <h2 className='sub-title'>Little Lemon</h2>
                    <p className='description'>Reserve your table at Little Lemon restaurant in just a few clicks. Choose your preferred date, time, and party size for an unforgettable dining experience. Our easy-to-use booking system shows real-time availability to help you secure the perfect reservation.</p>
                    <button onClick={scrollToMain} aria-label="On Click Scroll to reservation form">Let's Start</button>
                </div>
                <img className='table-img' src={require('../../assets/images/table.jpg')} alt='Elegant dining table setup at Little Lemon restaurant' />
            </header>
            <main className='booking-content' aria-label="Reservation booking form">
                <AvailableTimes availableTimes={availableTimes} bookedTimes={bookedTimes} />
                <BookingForm
                    onSubmit={submitForm}
                    availableTimes={availableTimes}
                    dispatch={dispatch}
                    bookedTimes={bookedTimes}
                />
            </main>
        </>
    )
}

export default BookingPage;