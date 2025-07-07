import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {
    const navigate = useNavigate();

    function moveToBooking() {
        navigate('/reserve-a-table');
    }

    return (
        <>
            <section className='hero' aria-label="Restaurant introduction">
                <h1 className='title'>Little Lemon</h1>
                <h2 className='sub-title'>Chicago</h2>
                <p className='description'>Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                <button onClick={moveToBooking} aria-label="On Click navigate to table reservation page">Reserve a table</button>
            </section>
            <img className='hero-img' src={require('../../assets/images/restauranfood.jpg')} alt='Little Lemon signature bruschetta dish' />
        </>
    )
}

export default Hero;