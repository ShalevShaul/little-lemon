import { useEffect } from 'react';
import Hero from '../../blocks/Hero/Hero';
import './Header.css';

function Header() {
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [])

    return (
        <header>
            <Hero />
        </header>
    )
}

export default Header;