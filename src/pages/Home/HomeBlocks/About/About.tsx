import './About.css';
import marioAndAdrian from '../../../../assets/images/MarioAndAdrian.webp'

function About() {
    return (
        <section className="about-section">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2>About Little Lemon</h2>
                        <p>
                            Little Lemon is a charming neighborhood restaurant that serves simple food
                            and classic cocktails in a lively but casual environment. We roast our own
                            coffee and offer fresh juices to accompany our Mediterranean-inspired menu.
                        </p>
                        <p>
                            Our story began in 1995 when two Italian brothers, Mario and Adrian,
                            moved to Chicago and decided to share their family's traditional recipes
                            with the local community. Today, Little Lemon continues to combine
                            traditional Mediterranean flavors with modern culinary techniques.
                        </p>
                        <div className="about-stats">
                            <div className="stat">
                                <span className="stat-number">30+</span>
                                <span className="stat-label">Years of Experience</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">500+</span>
                                <span className="stat-label">Happy Customers Weekly</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">4.8★</span>
                                <span className="stat-label">Average Rating</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-image">
                        <img src={marioAndAdrian} alt="Mario and Adrian, founders of Little Lemon" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;