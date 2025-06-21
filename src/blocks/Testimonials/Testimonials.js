import './Testimonials.css';

function Testimonials() {
    return (
        <section className='testimonials'>
            <h2>Testimonials</h2>
            <div className='reviews'>
                <div className='item'>
                    <h3>Sarah Johnson</h3>
                    <img src={require('../../assets/images/Testimonials/Sarah.jpg')} />
                    <span className='stars'>⭐  5.0 / 5</span>
                    <p className='description'>
                        “Amazing Mediterranean flavors, absolutely perfect experience”
                    </p>
                </div>

                <div className='item'>
                    <h3>Michael Chen</h3>
                    <img src={require('../../assets/images/Testimonials/Michael.jpg')} />
                    <span className='stars'>⭐  5.0 / 5</span>
                    <p className='description'>
                        “Fresh ingredients, exceptional service, highly recommend visiting”
                    </p>
                </div>

                <div className='item'>
                    <h3>Emma Rodriguez</h3>
                    <img src={require('../../assets/images/Testimonials/Emma.jpg')} />
                    <span className='stars'>⭐  5.0 / 5</span>
                    <p className='description'>
                        “Best small plates restaurant in town”
                    </p>
                </div>

                <div className='item'>
                    <h3>David Thompson</h3>
                    <img src={require('../../assets/images/Testimonials/David.jpg')} />
                    <span className='stars'>⭐  5.0 / 5</span>
                    <p className='description'>
                        “Outstanding cocktails and delicious authentic Mediterranean cuisine!”
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Testimonials;