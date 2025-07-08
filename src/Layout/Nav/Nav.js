import { useState } from 'react';
import './Nav.css';
import { Link, useLocation } from 'react-router-dom';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const path = location.pathname;

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    return (
        <nav role='navigation'>
            <a href='/' aria-label='On Click navigate to Little Lemon homepage'>
                <img className='nav-logo' src={require('../../assets/images/nav-logo.png')} alt='little lemon nav logo' />
            </a>
            <div className='menu'>
                <ul role='menubar'>
                    <li onClick={scrollToTop} aria-label='On Click' className={`home ${path.includes('home') ? 'selected' : ''}`}><Link role='menuitem' to={'/home'}>Home</Link></li>
                    <li onClick={scrollToTop} aria-label='On Click' className={`reserve ${path.includes('reserve') ? 'selected' : ''}`}><Link role='menuitem' to={'/reserve-a-table'}>Reserve A Table</Link></li>
                    <li onClick={scrollToTop} aria-label='On Click' className={`bookings ${path.includes('bookings') ? 'selected' : ''}`}><Link role='menuitem' to={'/bookings'}>Bookings</Link></li>
                </ul>
            </div>

            <button onClick={toggleMenu} className='hamburger' aria-label='On Click'>
                <img src={require('../../assets/images/hamburger.png')} alt='hamburger menu icon' />
            </button>
            <div className={`mobile-menu ${isOpen ? 'show' : 'hide'}`}>
                <ul role='menubar' style={{ display: isOpen ? 'flex' : 'none' }}>
                    <li onClick={() => { toggleMenu(); scrollToTop(); }} aria-label='On Click'><Link role='menuitem' to={'/home'}>Home</Link></li>
                    <li onClick={() => { toggleMenu(); scrollToTop(); }} aria-label='On Click'><Link role='menuitem' to={'/reserve-a-table'}>Reserve A Table</Link></li>
                    <li onClick={() => { toggleMenu(); scrollToTop(); }} aria-label='On Click'><Link role='menuitem' to={'/bookings'}>Bookings</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;