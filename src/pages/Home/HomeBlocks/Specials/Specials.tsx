import './Specials.css';
import greekSaladImg from '../../../../assets/images/greek-salad.webp';
import bruschettaImg from '../../../../assets/images/bruschetta.webp';
import lemonDessertImg from '../../../../assets/images/lemon-dessert.webp';

interface SpecialDish {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
}

const specialDishes: SpecialDish[] = [
    {
        id: '1',
        name: 'Greek Salad',
        price: '$12.99',
        description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
        image: greekSaladImg
    },
    {
        id: '2',
        name: 'Bruchetta',
        price: '$5.99',
        description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
        image: bruschettaImg
    },
    {
        id: '3',
        name: 'Lemon Dessert',
        price: '$5.00',
        description: 'This comes straight from grandma\'s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
        image: lemonDessertImg
    }
];

function Specials() {
    return (
        <section className="specials-section">
            <div className="container">
                <div className="section-header animate-on-scroll fade-in-up">
                    <h2>This Week's Specials!</h2>
                </div>

                <div className="specials-grid animate-on-scroll stagger-cards">
                    {specialDishes.map(dish => (
                        <div key={dish.id} className="special-card">
                            <div className="card-image">
                                <img src={dish.image} alt={dish.name} />
                            </div>
                            <div className="card-content">
                                <div className="card-header">
                                    <h3>{dish.name}</h3>
                                    <span className="price">{dish.price}</span>
                                </div>
                                <p className="description">{dish.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="leaf-decoration">🍃</div>
        </section>
    )
}

export default Specials;