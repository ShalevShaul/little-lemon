import './Home.css';
import About from './HomeBlocks/About/About';
import Gallery from './HomeBlocks/Gallery/Gallery';
import Reviews from './HomeBlocks/Reviews/Reviews';
import Specials from './HomeBlocks/Specials/Specials';

function Home() {
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