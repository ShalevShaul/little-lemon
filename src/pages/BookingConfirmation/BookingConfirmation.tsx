import { useLocation, useNavigate } from 'react-router';
import './BookingConfirmation.css';
import type { Booking } from '../../types/booking';
const checkMark = 'src/assets/icons/checkmark.webp';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';

function BookingConfirmation() {
    const location = useLocation();
    const booking: Booking = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll({ top: 0 })
    }, [])

    const goHome = () => {
        navigate('/home');
        window.scrollTo({ top: 0 });
    }

    const goToReserve = () => {
        navigate('/reserve-a-table');
    }

    return (
        <>
            {booking ?
                <section className='booking-confirmed'>
                    <div className='confirmed-header'>
                        <span className='dateAndTime'>{new Date(booking.date).toLocaleDateString('he-IL')} - {booking.time}</span>
                        <h1 className='title'>CONFIRMED!</h1>
                        <img src={checkMark} alt='Booking confirmed successfully' width={100} />
                        <p className='restaurant'>Little Lemon Restaurant</p>
                    </div>
                    <div className="confirmed-main">
                        <div className='details'>
                            <h2 className='full-name'>{booking.fullName}</h2>
                            <h3 className='event'>{booking.event}</h3>
                            <p className='date'>📅 {new Date(booking.date).toLocaleDateString('he-IL')} - {booking.time}</p>
                            <p className='guests'>👥 {booking.guests} guests</p>
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
                        <Button paddingX={25} paddingY={20} text='🏠 Home Page' onClick={goHome} />
                    </div>
                </section>

                :
                <>
                    <div className='oops-header' aria-label="No booking found">
                        <h1>Oops! No booking found</h1>
                        <p>It looks like you don't have an active booking confirmation.</p>
                    </div>
                    <div className='oops-main'>
                        <p>Please make a new reservation.</p>
                        <Button text='Reserve a table' onClick={goToReserve} paddingX={35} paddingY={25} />
                    </div>
                </>
            }
        </>
    )
}

export default BookingConfirmation;