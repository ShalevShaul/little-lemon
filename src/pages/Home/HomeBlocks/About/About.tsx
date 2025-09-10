import './About.css';
const marioAndAdrian = '/images/MarioAndAdrian.webp';
import { useInView } from '../../../../hooks/useInView';

function About() {
    const {ref, isVisible} = useInView();

    return (
        <section ref={ref} className="about-section">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2 className={`animate-on-scroll fade-in-up ${isVisible ? 'animated' : ''}`}>About Little Lemon</h2>
                        <p className={`animate-on-scroll fade-in-left ${isVisible ? 'animated' : ''}`}>
                            Little Lemon is a charming neighborhood restaurant that serves simple food
                            and classic cocktails in a lively but casual environment. We roast our own
                            coffee and offer fresh juices to accompany our Mediterranean-inspired menu.
                        </p>
                        <p className={`animate-on-scroll fade-in-left ${isVisible ? 'animated' : ''}`}>
                            Our story began in 1995 when two Italian brothers, Mario and Adrian,
                            moved to Chicago and decided to share their family's traditional recipes
                            with the local community. Today, Little Lemon continues to combine
                            traditional Mediterranean flavors with modern culinary techniques.
                        </p>
                        <div className={`about-stats animate-on-scroll stagger-cards ${isVisible ? 'animated' : ''}`}>
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
                    <div className={`about-image animate-on-scroll fade-in-right ${isVisible ? 'animated' : ''}`}>
                        <img src={marioAndAdrian} alt="Mario and Adrian, founders of Little Lemon" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;