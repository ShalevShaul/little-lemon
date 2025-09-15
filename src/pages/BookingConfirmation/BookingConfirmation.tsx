import { useLocation, useNavigate } from 'react-router';
import './BookingConfirmation.css';
import type { Booking } from '../../types/booking';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import { formatDate } from '../../utils/dateUtils';

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
                        <span className='dateAndTime'>{formatDate(booking.date)} - {booking.time}</span>
                        <h1 className='title'>CONFIRMED!</h1>
                        <CheckCircleOutlineIcon className='chek-circle' />
                        <p className='restaurant'>Little Lemon Restaurant</p>
                    </div>
                    <div className="confirmed-main">
                        <div className='details'>
                            <h2 className='full-name'>{booking.fullName}</h2>
                            <h3 className='event'>{booking.event.text}</h3>
                            <p className='date'>
                                <CalendarMonthIcon className='date-icon' /> {formatDate(booking.date)} - {booking.time}
                            </p>
                            <p className='guests'>
                                <GroupIcon className='group-icon' /> {booking.guests} guests
                            </p>
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
                        <CustomButton text='Home Page' onClick={goHome} />
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
                        <CustomButton text='Reserve a table' onClick={goToReserve} />
                    </div>
                </>
            }
        </>
    )
}

export default BookingConfirmation;