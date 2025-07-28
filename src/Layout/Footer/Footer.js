import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  function navigateTo(block) {
    setTimeout(() => {
      document.querySelector(`section.${block}`).scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0 });
  }

  return (
    <footer>
      <ul className='footer-nav'>
        <img src={require('../../assets/images/footer-logo.png')} alt='liitle lemon footer logo' />
        <li className='doormat-list'>
          <span className='list-title'>Doormat<br /> Navigation</span>
          <ul>
            <li><Link to={'/home'} onClick={scrollToTop}>Home</Link></li>
            <li><Link to={'/reserve-a-table'} onClick={scrollToTop}>Reserve a table</Link></li>
            <li><Link to={'/bookings'} onClick={scrollToTop}>Bookings</Link></li>
            <li><Link to={'/home'} onClick={() => navigateTo('highlights')}>Menu</Link></li>
            <li><Link to={'/home'} onClick={() => navigateTo('testimonials')}>Reviews</Link></li>
            <li><Link to={'/home'} onClick={() => navigateTo('about')}>About</Link></li>
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