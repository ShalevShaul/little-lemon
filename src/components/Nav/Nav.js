import './Nav.css';

function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <a href='/'>
                        <img className='nav-logo' src={require('../../assets/images/nav-logo.png')} alt='little lemon nav logo' />
                    </a>
                </li>
                <li><a href='/home'>Home</a></li>
                <li><a href='/about'>About</a></li>
                <li><a href='/menu'>Menu</a></li>
                <li><a href='/reservations'>Reservations</a></li>
                <li><a href='/order'>Order Online</a></li>
                <li><a href='/login'>Login</a></li>
            </ul>
        </nav>
    )
}

export default Nav;