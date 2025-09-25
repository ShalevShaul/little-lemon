import { Link, useNavigate } from 'react-router-dom';
import './AppFooter.scss';
const footerLogo = '/images/footer-logo.webp';

function AppFooter() {
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({ top: 0 });
    };

    const goToHomeBlock = (selector: string) => {
        navigate('/home');
        setTimeout(() => {
            document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
        }, 200)
    }

    const handleSpecialsClick = () => goToHomeBlock('section.specials-section');
    const handleReviewsClick = () => goToHomeBlock('section.reviews-section');
    const handleAboutClick = () => goToHomeBlock('section.about-section');

    return (
        <footer>
            <ul className='footer-nav'>
                <img src={footerLogo} alt='liitle lemon footer logo' />
                <li className='doormat-list'>
                    <span className='list-title'>Doormat<br /> Navigation</span>
                    <ul>
                        <li><Link to={'/home'} onClick={scrollToTop}>Home</Link></li>
                        <li><Link to={'/reserve-a-table'} onClick={scrollToTop}>Reserve a table</Link></li>
                        <li><Link to={'/bookings'} onClick={scrollToTop}>Bookings</Link></li>
                        <li><Link to={'/home'} onClick={handleSpecialsClick}>Specials</Link></li>
                        <li><Link to={'/home'} onClick={handleReviewsClick}>Reviews</Link></li>
                        <li><Link to={'/home'} onClick={handleAboutClick}>About</Link></li>
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

export default AppFooter;