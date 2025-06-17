import './Footer.css';

function Footer() {
  return (
    <footer>
      <ul className='footer-nav'>
        <img src={require('../../assets/images/footer-logo.png')} alt='liitle lemon footer logo' />
        <li className='doormat-list'>
          <span className='list-title'>Doormat<br /> Navigation</span>
          <ul>
            <li><a href='/home'>Home</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/menu'>Menu</a></li>
            <li><a href='/reservations'>Reservations</a></li>
            <li><a href='/order'>Order Online</a></li>
            <li><a href='/login'>Login</a></li>
          </ul>
        </li>

        <li className='contact-list'>
          <span className='list-title'>Contact</span>
          <ul>
            <li><a href='/address'>Address</a></li>
            <li><a href='/phone'>Phone Number</a></li>
            <li><a href='/email'>Email</a></li>
          </ul>
        </li>

        <li className='media-list'>
          <span className='list-title'>Social Media Links</span>
          <ul>
            <li><a href='/facebook'>Facebook</a></li>
            <li><a href='/instagram'>Instagram</a></li>
          </ul>
        </li>
      </ul>
    </footer>
  )
}

export default Footer;