import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmedBooking.css';

function ConfirmedBooking() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    function goHome() {
        navigate('/home');
    }

    function goToReserve() {
        navigate('/reserve-a-table');
        setTimeout(() => {
            document.querySelector('main.booking-content').scrollIntoView({ behavior: 'smooth' });
        }, 20);
    }

    return (
        <>
            {state && state.formData ?
                <main className='ConfirmedBooking'>
                    <header className='confirmed-header'>
                        <span className='date-time'>{new Date(state.formData.date).toLocaleDateString('he-IL')} - {state.formData.time}</span>
                        <h1 className='title'>CONFIRMED!</h1>
                        <img src={require('../../assets/icons/icons8-checkmark-500.png')} alt='Check circle' width={100} />
                        <span className='restaurant'>Little Lemon Restaurant</span>
                    </header>
                    <section className='confirmed-main'>
                        <div className='details'>
                            <h2 className='full-name'>{state.formData.firstName} {state.formData.lastName}</h2>
                            <h3 className='occasion'>{state.formData.occasion === 'Anniversary' ? <>💕</> : <>🎂</>} {state.formData.occasion}</h3>
                            <span className='date'>📅 {new Date(state.formData.date).toLocaleDateString('he-IL')} - {state.formData.time}</span>
                            <span className='guests'>👥 {state.formData.guests} guests</span>
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
                        <button onClick={goHome} className='home-button'>🏠 Home Page</button>
                    </section>
                </main>
                :
                <>
                    <header className='oops-header'>
                        <h1>Oops! No booking found</h1>
                        <p>It looks like you don't have an active booking confirmation.</p>
                    </header>
                    <main className='oops-main'>
                        <p>Please make a new reservation.</p>
                        <button onClick={goToReserve}>Reserve a table</button>
                    </main>
                </>}
        </>
    )
}

export default ConfirmedBooking;