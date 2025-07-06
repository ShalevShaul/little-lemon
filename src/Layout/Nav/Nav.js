import { useState } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    return (
        <nav>
            <a href='/'>
                <img className='nav-logo' src={require('../../assets/images/nav-logo.png')} alt='little lemon nav logo' />
            </a>
            <div className='menu'>
                <ul>
                    <li onClick={scrollToTop}><Link to={'/home'}>Home</Link></li>
                    <li onClick={scrollToTop}><Link to={'/reserve-a-table'}>Reserve A Table</Link></li>
                    <li onClick={scrollToTop}><Link to={'/bookings'}>Bookings</Link></li>
                </ul>
            </div>

            <button onClick={toggleMenu} className='hamburger'>
                <img src={require('../../assets/images/hamburger.png')} alt='hamburger menu icon' />
            </button>
            <div className={`mobile-menu ${isOpen ? 'show' : 'hide'}`}>
                <ul style={{ display: isOpen ? 'flex' : 'none' }}>
                    <li onClick={() => {toggleMenu(); scrollToTop()}}><Link to={'/home'}>Home</Link></li>
                    <li onClick={() => {toggleMenu(); scrollToTop()}}><Link to={'/reserve-a-table'}>Reserve A Table</Link></li>
                    <li onClick={() => {toggleMenu(); scrollToTop()}}><Link to={'/bookings'}>Bookings</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;