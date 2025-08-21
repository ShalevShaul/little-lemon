import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../../../src/assets/images/nav-logo.webp';
import hamburger from '../../assets/icons/hamburger.webp';
import closeIcon from '../../assets/icons/close.webp';
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';

function Nav() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();
    const path = location.pathname;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const scrollToTop = () => {
        window.scroll({ top: 0 });
    }

    return (
        <>
            <nav>
                <a href={'http://localhost:5173/home'}>
                    <img className='nav-logo' src={logo} alt='little lemon nav logo' />
                </a>
                <div className="menu">
                    <ul>
                        <li onClick={scrollToTop} className={`${path.includes('home') ? 'selected' : ''}`}><Link to={'/home'}>Home</Link></li>
                        <li onClick={scrollToTop} className={`${path.includes('reserve') ? 'selected' : ''}`}><Link to={'/reserve-a-table'}>Reserve A Table</Link></li>
                        <li onClick={scrollToTop} className={`${path.includes('bookings') ? 'selected' : ''}`}><Link to={'/bookings'}>Bookings</Link></li>
                    </ul>
                </div>

                <button onClick={toggleMenu} className={`hamburger ${isOpen ? 'open' : 'close'}`}>
                    <img
                        src={isOpen ? closeIcon : hamburger}
                        alt={isOpen ? 'close menu icon' : 'hamburger menu icon'}
                        key={isOpen ? 'close' : 'hamburger'}
                    />
                </button>

                <div className={`mobile-menu ${isOpen ? 'show' : ''}`}>
                    <ul>
                        <li onClick={() => { closeMenu(); scrollToTop(); }}>
                            <Link to={'/home'}>🏠 Home</Link>
                        </li>
                        <li onClick={() => { closeMenu(); scrollToTop(); }}>
                            <Link to={'/reserve-a-table'}>📅 Reserve A Table</Link>
                        </li>
                        <li onClick={() => { closeMenu(); scrollToTop(); }}>
                            <Link to={'/bookings'}>📋 Bookings</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div
                className={`mobile-menu-overlay ${isOpen ? 'show' : ''}`}
                onClick={closeMenu}
            ></div>
        </>
    )
}

export default Nav;