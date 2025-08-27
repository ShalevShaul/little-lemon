import { useEffect } from 'react';
import './Home.css';
import About from './HomeBlocks/About/About';
import Gallery from './HomeBlocks/Gallery/Gallery';
import Reviews from './HomeBlocks/Reviews/Reviews';
import Specials from './HomeBlocks/Specials/Specials';

function Home() {
    useEffect(() => {
        const observeElements = () => {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach((element) => {
                observer.observe(element);
            });
        };

        observeElements();
    }, []);

    return (
        <>
            <Specials />
            <Reviews />
            <Gallery />
            <About />
        </>
    );
}

export default Home;