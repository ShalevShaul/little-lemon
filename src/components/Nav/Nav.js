import { useState } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    function openMenu() {
        setIsOpen(!isOpen);
    }

    function scrollToMain() {
        setTimeout(() => {
            document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
        }, 10)
        openMenu();
    }

    return (
        <nav>
            <a href='/'>
                <img className='nav-logo' src={require('../../assets/images/nav-logo.png')} alt='little lemon nav logo' />
            </a>
            <div className='menu'>
                <ul>
                    <li><Link to={'/home'}>Home</Link></li>
                    <li onClick={scrollToMain}><Link to={'/highlights'}>Highlights</Link></li>
                    <li onClick={scrollToMain}><Link to={'/testimonials'}>Testimonials</Link></li>
                    <li onClick={scrollToMain}><Link to={'/about'}>About</Link></li>
                    <li onClick={scrollToMain}><Link to={'/all'}>Show All</Link></li>
                </ul>
            </div>

            <button onClick={openMenu} className='hamburger'>
                <img src={require('../../assets/images/hamburger.png')} alt='hamburger menu icon' />
            </button>
            <div className={`mobile-menu ${isOpen ? 'show' : 'hide'}`}>
                <ul style={{ display: isOpen ? 'flex' : 'none' }}>
                    <li onClick={openMenu}><Link to={'/home'}>Home</Link></li>
                    <li onClick={scrollToMain}><Link to={'/highlights'}>Highlights</Link></li>
                    <li onClick={scrollToMain}><Link to={'/testimonials'}>Testimonials</Link></li>
                    <li onClick={scrollToMain}><Link to={'/about'}>About</Link></li>
                    <li onClick={scrollToMain}><Link to={'/all'}>Show All</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;