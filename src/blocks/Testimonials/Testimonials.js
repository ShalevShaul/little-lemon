import './Testimonials.css';

function Testimonials() {
    return (
        <section className='testimonials' aria-label="Customer testimonials">
            <h2>Testimonials</h2>
            <div className='reviews'  role="list" aria-label="Customer reviews">
                <article className='item' role='listitem'>
                    <h3>Sarah Johnson</h3>
                    <img src={require('../../assets/images/Testimonials/Sarah.jpg')} alt='Sarah Johnson portrait' />
                    <span className='stars' aria-label="5 out of 5 stars"><div className='star'>⭐</div>  5.0 / 5</span>
                    <blockquote className='description'>
                        “Amazing Mediterranean flavors, absolutely perfect experience”
                    </blockquote>
                </article>

                <article className='item' role='listitem'>
                    <h3>Michael Chen</h3>
                    <img src={require('../../assets/images/Testimonials/Michael.jpg')} alt='Michael Chen portrait' />
                    <span className='stars' aria-label="5 out of 5 stars"><div className='star'>⭐</div>  5.0 / 5</span>
                    <blockquote className='description'>
                        “Fresh ingredients, exceptional service, highly recommend visiting”
                    </blockquote>
                </article>

                <article className='item' role='listitem'>
                    <h3>Emma Rodriguez</h3>
                    <img src={require('../../assets/images/Testimonials/Emma.jpg')} alt='Emma Rodriguez portrait' />
                    <span className='stars' aria-label="5 out of 5 stars"><div className='star'>⭐</div>  5.0 / 5</span>
                    <blockquote className='description'>
                        “Best small plates restaurant in town”
                    </blockquote>
                </article>

                <article className='item' role='listitem'>
                    <h3>David Thompson</h3>
                    <img src={require('../../assets/images/Testimonials/David.jpg')} alt='David Thompson portrait' />
                    <span className='stars' aria-label="5 out of 5 stars"><div className='star'>⭐</div>  5.0 / 5</span>
                    <blockquote className='description'>
                        “Outstanding cocktails and delicious authentic Mediterranean cuisine!”
                    </blockquote>
                </article>
            </div>
        </section>
    )
}

export default Testimonials;