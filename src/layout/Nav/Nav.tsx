import { Link } from 'react-router-dom';
import './Nav.css';
const logo = '/images/nav-logo.webp'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
            document.documentElement.setAttribute('data-no-scroll', 'true');
        } else {
            document.documentElement.removeAttribute('data-no-scroll');
        }

        return () => {
            document.documentElement.removeAttribute('data-no-scroll');
        };
    }, [isOpen]);

    const scrollToTop = () => {
        window.scroll({ top: 0 });
    }

    return (
        <>
            <nav>
                <a href={'/'}>
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
                    {!isOpen ?
                        <MenuIcon className='hamburger-icon' fontSize='large' key={'hamburger'} /> :
                        <CloseIcon className='close-icon' fontSize='large' key={'close'} />}
                </button>

                <div className={`mobile-menu ${isOpen ? 'show' : ''}`}>
                    <ul>
                        <li onClick={() => { closeMenu(); scrollToTop(); }}>
                            <Link to={'/home'}>Home</Link>
                        </li>
                        <li onClick={() => { closeMenu(); scrollToTop(); }}>
                            <Link to={'/reserve-a-table'}>Reserve A Table</Link>
                        </li>
                        <li onClick={() => { closeMenu(); scrollToTop(); }}>
                            <Link to={'/bookings'}>Bookings</Link>
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