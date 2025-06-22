import { useState } from 'react';
import './Nav.css';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    function openMenu() {
        setIsOpen(!isOpen);
    }

    return (
        <nav>
            <a href='/'>
                <img className='nav-logo' src={require('../../assets/images/nav-logo.png')} alt='little lemon nav logo' />
            </a>
            <div className='menu'>
                <ul>
                    <li><a href='/home'>Home</a></li>
                    <li><a href='/about'>About</a></li>
                    <li><a href='/menu'>Menu</a></li>
                    <li><a href='/reservations'>Reservations</a></li>
                    <li><a href='/order'>Order Online</a></li>
                    <li><a href='/login'>Login</a></li>
                </ul>
            </div>

            <button onClick={openMenu} className='hamburger'>
                <img src={require('../../assets/images/hamburger.png')} alt='hamburger menu icon' />
            </button>
            <div className={`mobile-menu ${isOpen ? 'show' : 'hide'}`}>
                <ul style={{ display: isOpen ? 'flex' : 'none' }}>
                    <li><a href='/home'>Home</a></li>
                    <li><a href='/about'>About</a></li>
                    <li><a href='/menu'>Menu</a></li>
                    <li><a href='/reservations'>Reservations</a></li>
                    <li><a href='/order'>Order Online</a></li>
                    <li><a href='/login'>Login</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;