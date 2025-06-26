import './About.css';

function About() {
    return (
        <section className='about'>
            <article className='info'>
                <h2 className='title'>Little Lemon</h2>
                <h3 className='sub-title'>Chicago</h3>
                <p className='description'>
                    Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                </p>
            </article>
            <div className='photos'>
                <img className='image1' src={require('../../assets/images/about/restaurant.jpg')} alt='The outside of the restaurant' />
                <img className='image2' src={require('../../assets/images/about/MarioAndAdrian.jpg')} alt='The chefs, Mario and Adrian' />
            </div>
        </section>
    )
}

export default About;