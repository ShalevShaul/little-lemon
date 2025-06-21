import './Highlights.css';

function Highlights() {
    return (
        <section className='highlights'>
            <div className='title-btn'>
                <h2>Sepecials</h2>
                <button>Online Menu</button>
            </div>
            <div className='specials-menu'>
                <div className='menu-item'>
                    <img src={require('../../assets/images/greek-salad.jpg')} />
                    <div className='details'>
                        <div className='title-price'>
                            <h3 className='item-title'>Greek Salad</h3>
                            <span className='price'>$12.99</span>
                        </div>
                        <p className='description'>Greek Salad is a fresh Mediterranean dish with tomatoes, cucumbers, olives, and feta. A classic Greek appetizer dressed with olive oil and lemon.</p>
                        <span className='order'>Order a delivery 🏍️</span>
                    </div>
                </div>

                <div className='menu-item'>
                    <img src={require('../../assets/images/bruschetta.jpg')} />
                    <div className='details'>
                        <div className='title-price'>
                            <h3 className='item-title'>bruschetta</h3>
                            <span className='price'>$15.99</span>
                        </div>
                        <p className='description'>Bruschetta is grilled Italian bread topped with fresh tomatoes and basil. A simple, flavorful appetizer with olive oil and garlic.</p>
                        <span className='order'>Order a delivery 🏍️</span>
                    </div>
                </div>

                <div className='menu-item'>
                    <img src={require('../../assets/images/lemon-dessert.jpg')} />
                    <div className='details'>
                        <div className='title-price'>
                            <h3 className='item-title'>Lemon Dessert</h3>
                            <span className='price'>$15.99</span>
                        </div>
                        <p className='description'>Lemon dessert is a tangy, citrusy sweet treat made with fresh lemon juice and zest. A refreshing, light finale that balances tartness with sweetness.</p>
                        <span className='order'>Order a delivery 🏍️</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Highlights;