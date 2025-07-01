import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {
    const navigate = useNavigate();

    function moveToBooking() {
        navigate('/reserve-a-table');
    }

    return (
        <>
            <article className='hero'>
                <h1 className='title'>Little Lemon</h1>
                <h2 className='sub-title'>Chicago</h2>
                <div className='description'>Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</div>
                <button onClick={moveToBooking}>Reserve a table</button>
            </article>
            <img className='hero-img' src={require('../../assets/images/restauranfood.jpg')} alt='Little Lemon signature bruschetta' />
        </>
    )
}

export default Hero;