import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../../../src/assets/images/nav-logo.webp';
import hamburger from '../../../src/assets/images/hamburger.webp';
import { useLocation } from 'react-router';
import { useState } from 'react';

function Nav() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();
    const path = location.pathname;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const scrollToTop = () => {
        window.scroll({ top: 0 });
    }

    return (
        <nav>
            <a href={'http://localhost:5173/home'}>
                <img className='nav-logo' src={logo} alt='litlle lemon nav logo' />
            </a>
            <div className="menu">
                <ul>
                    <li onClick={scrollToTop} className={`${path.includes('home') ? 'selected' : ''}`}><Link to={'/home'}>Home</Link></li>
                    <li onClick={scrollToTop} className={`${path.includes('reserve') ? 'selected' : ''}`}><Link to={'/reserve-a-table'}>Reserve A Table</Link></li>
                    <li onClick={scrollToTop} className={`${path.includes('bookings') ? 'selected' : ''}`}><Link to={'/bookings'}>Bookings</Link></li>
                </ul>
            </div>

            <button onClick={toggleMenu} className='hamburger'>
                <img src={hamburger} alt='hamburger menu icon' />
            </button>
            <div className={`mobile-menu ${isOpen ? 'show' : 'hide'}`}>
                <ul style={{ display: isOpen ? 'flex' : 'none' }}>
                    <li onClick={() => { toggleMenu(); scrollToTop(); }}><Link to={'/home'}>Home</Link></li>
                    <li onClick={() => { toggleMenu(); scrollToTop(); }}><Link to={'/reserve-a-table'}>Reserve A Table</Link></li>
                    <li onClick={() => { toggleMenu(); scrollToTop(); }}><Link to={'/bookings'}>Bookings</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;