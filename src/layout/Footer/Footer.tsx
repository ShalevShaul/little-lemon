import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';
import footerLogo from '../../assets/images/footer-logo.png';

function Footer() {
    const navigate = useNavigate();

    const navTo = (path: string) => {
        navigate(`/${path}`);
        window.scrollTo({ top: 0 });
    }

    const goToHomeBlock = (selector: string) => {
        navigate('/home');
        setTimeout(() => {
            document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
        }, 200)
    }

    return (
        <footer>
            <ul className='footer-nav'>
                <img src={footerLogo} alt='liitle lemon footer logo' />
                <li className='doormat-list'>
                    <span className='list-title'>Doormat<br /> Navigation</span>
                    <ul>
                        <li><Link to={'/home'} onClick={() => navTo('home')}>Home</Link></li>
                        <li><Link to={'/reserve-a-table'} onClick={() => navTo('reserve-a-table')}>Reserve a table</Link></li>
                        <li><Link to={'/bookings'} onClick={() => navTo('bookings')}>Bookings</Link></li>
                        <li><Link to={'/home'} onClick={() => goToHomeBlock('section.specials-section')}>Specials</Link></li>
                        <li><Link to={'/home'} onClick={() => goToHomeBlock('section.reviews-section')}>Reviews</Link></li>
                        <li><Link to={'/home'} onClick={() => goToHomeBlock('section.about-section')}>About</Link></li>
                    </ul>
                </li>

                <li className='contact-list'>
                    <span className='list-title'>Contact</span>
                    <ul>
                        <li><a href='https://maps.app.goo.gl/LKWmGuEcgocPsHsK8'>Address</a></li>
                        <li><a href='tel:123-456-7890'>Phone Number</a></li>
                        <li><a href='mailto:littlelemon@example.com'>Email</a></li>
                    </ul>
                </li>

                <li className='media-list'>
                    <span className='list-title'>Social Media Links</span>
                    <ul>
                        <li><a href='https://www.facebook.com/'>Facebook</a></li>
                        <li><a href='https://www.instagram.com/'>Instagram</a></li>
                    </ul>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;