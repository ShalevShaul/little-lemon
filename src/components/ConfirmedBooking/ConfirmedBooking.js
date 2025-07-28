import { useNavigate } from 'react-router-dom';
import './ConfirmedBooking.css';
import { useBooking } from '../BookingContext';

function ConfirmedBooking() {
    const navigate = useNavigate();
    const { currentBooking } = useBooking();

    function goHome() {
        navigate('/home');
    }

    function goToReserve() {
        navigate('/reserve-a-table');
        setTimeout(() => {
            document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
        }, 20);
    }

    return (
        <>
            {currentBooking ?
                <main className='ConfirmedBooking' aria-label="Booking confirmation details">
                    <header className='confirmed-header'>
                        <span className='date-time'>{new Date(currentBooking.date).toLocaleDateString('he-IL')} - {currentBooking.time}</span>
                        <h1 className='title'>CONFIRMED!</h1>
                        <img src={require('../../assets/icons/checkmark.png')} alt='Booking confirmed successfully' width={100} />
                        <p className='restaurant'>Little Lemon Restaurant</p>
                    </header>
                    <section className='confirmed-main' aria-label="Reservation details">
                        <div className='details'>
                            <h2 className='full-name'>{currentBooking.firstName} {currentBooking.lastName}</h2>
                            <h3 className='occasion'>{currentBooking.occasion === 'Anniversary' ? <>💕</> : currentBooking.occasion === 'Birthday' ? <>🎂</> : <>🥂</>} {currentBooking.occasion}</h3>
                            <p className='date'>📅 {new Date(currentBooking.date).toLocaleDateString('he-IL')} - {currentBooking.time}</p>
                            <p className='guests'>👥 {currentBooking.guests} guests</p>
                        </div>
                        <div className='additional'>
                            <h2>Additional information</h2>
                            <ul>
                                <li>
                                    Your reservation has been successfully confirmed! <br />
                                </li>
                                <br />
                                <li>
                                    In case of changes or cancellation, please contact us 24 hours in advance.
                                </li>
                            </ul>
                        </div>
                        <button onClick={goHome} className='home-button' aria-label="On Click return to home page">🏠 Home Page</button>
                    </section>
                </main>
                :
                <>
                    <header className='oops-header' aria-label="No booking found">
                        <h1>Oops! No booking found</h1>
                        <p>It looks like you don't have an active booking confirmation.</p>
                    </header>
                    <main className='oops-main'>
                        <p>Please make a new reservation.</p>
                        <button onClick={goToReserve} aria-label="On Click navigate to table reservation page">Reserve a table</button>
                    </main>
                </>}
        </>
    )
}

export default ConfirmedBooking;