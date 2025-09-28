import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound: React.FC = () => {
    useEffect(() => {
        document.documentElement.setAttribute('data-no-scroll', 'true');

        return () => {
            document.documentElement.removeAttribute('data-no-scroll');
        };
    }, []);

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="error-code">404</div>

                <h1 className="error-title">Oops! Page Not Found</h1>

                <p className="error-message">
                    The page you're looking for seems to have wandered off like a hungry customer
                    looking for our kitchen!
                </p>

                <div className="error-actions">
                    <Link to="/" className="home-button">
                        🏠 Back to Home
                    </Link>

                    <Link to="/reserve-a-table" className="booking-button">
                        🍽️ Make a Reservation
                    </Link>
                </div>

                <div className="restaurant-info">
                    <p>Or call us directly:</p>
                    <a href="tel:+1234567890" className="phone-link">
                        📞 (123) 456-7890
                    </a>
                </div>
            </div>

            <div className="lemon-decoration">🍋</div>
        </div>
    );
};

export default NotFound;