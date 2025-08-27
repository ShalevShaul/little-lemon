import { useLocation, useNavigate } from 'react-router';
import './PageHeader.css';
import homeHeader from '../../assets/images/home-header.webp';
import reserveHeader from '../../assets/images/reserve-header.webp';
import bookingsHeader from '../../assets/images/bookings-header.webp';
import { useBooking } from '../../context/BookingContext';
import type React from 'react';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import arrowDownIcon from '../../assets/icons/arrow-down.webp';

function PageHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const { getUpcomingBookings } = useBooking();
    const upcomingBookings = getUpcomingBookings();

    useEffect(() => {
        [homeHeader, reserveHeader, bookingsHeader].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const pageHeight = window.innerHeight;
    const scrollDown = () => {
        window.scroll({ top: pageHeight, behavior: 'smooth' })
    }

    let title: string = '';
    let subtitle: string | React.ReactNode = '';
    let description: React.ReactNode;
    let image = homeHeader;
    let btnText: string = '';
    let btnAction = () => { };

    if (path.includes('home')) {
        title = 'Welcome to Little Lemon';
        subtitle = 'The best Mediterranean restaurant in the city';
        description = <p className='description'>
            <span>📍 Address: 123 Main St, Chicago</span>
            <span>📞 Phone: (123) 456-7890</span>
            <span>🕒 Hours: Sun - Sat 6PM - 11PM</span>
        </p>
        image = homeHeader;
        btnText = 'Reserve a table';
        btnAction = () => { navigate('/reserve-a-table'); window.scrollTo({ top: 0 }) }
    } else if (path.includes('reserve')) {
        title = 'Reserve Your Table';
        image = reserveHeader;
        subtitle = 'Book your perfect dining experience';
        description = <p className='description'>
            <span>✓ Free cancellation up to 2 hours before</span>
            <span>✓ Instant confirmation</span>
            <span>✓ Table guaranteed for 2 hours</span>
        </p>
        btnText = upcomingBookings.length < 2 ? "Let's start" : '';
        btnAction = () => {
            document.querySelector('div.progress-indicator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else if (path.includes('bookings')) {
        title = 'Your Reservations';
        image = bookingsHeader;
        subtitle = 'Manage your upcoming dining reservations';
        description = <p className='description'>
            {upcomingBookings.length > 0 ?
                <span>{upcomingBookings.length} Upcoming Reservation{upcomingBookings.length > 1 && 's'}</span>
                :
                <span>No Upcoming Reservations</span>
            }
        </p>
        btnText = '';
    }

    return (
        <header key={path} className='PageHeader' style={{ display: `${path.includes('confirmed') ? 'none' : 'flex'}` }}>
            <section className='hero'>
                <h1 className='header-title'>{title}</h1>
                <h2 className='header-subtitle'>{subtitle}</h2>
                <>{description}</>
                {btnText && <Button paddingX={40} paddingY={40} text={btnText} onClick={btnAction} />}
            </section>
            <img src={image} alt={`${path} header`} className='header-img' loading='lazy' />
            <div className="header-lemon-decoration">🍋</div>

            <img src={arrowDownIcon} alt='arrow down icon' className='arrow-down' onClick={scrollDown} />
        </header>
    )
}

export default PageHeader;