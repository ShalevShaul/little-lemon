import { useLocation, useNavigate, type NavigateFunction } from 'react-router';
import './PageHeader.css';
const homeHeader = '/images/home-header.webp';
const reserveHeader = '/images/reserve-header.webp';
const bookingsHeader = '/images/bookings-header.webp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useBooking } from '../../context/BookingContext';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import type { Booking } from '../../types/booking';

function PageHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const { upcomingBookings } = useBooking();

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

    const createPageConfig = (navigate: NavigateFunction, upcomingBookings: Booking[]) => ({
        home: {
            title: 'Welcome to Little Lemon',
            subtitle: 'The best Mediterranean restaurant in the city',
            description: '',
            image: '',
            btnText: 'Reserve a table',
            btnAction: () => { navigate('/reserve-a-table'); window.scrollTo({ top: 0 }) }
        },
        reserve: {
            title: 'Reserve Your Table',
            subtitle: 'Book your perfect dining experience',
            description: <>
                <span>✓ Free cancellation up to 2 hours before</span>
                <span>✓ Instant confirmation</span>
                <span>✓ Table guaranteed for 2 hours</span>
            </>,
            image: reserveHeader,
            btnText: upcomingBookings.length < 2 ? "Let's start" : '',
            btnAction: () => { document.querySelector('div.progress-indicator')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        },
        bookings: {
            title: 'Your Reservations',
            subtitle: 'Manage your upcoming dining reservations',
            description: <>
                {upcomingBookings.length > 0 ?
                    <span>{upcomingBookings.length} Upcoming Reservation{upcomingBookings.length > 1 && 's'}</span>
                    :
                    <span>No Upcoming Reservations</span>
                }
            </>,
            image: bookingsHeader,
            btnText: '',
            btnAction: () => { }
        }
    });

    const PAGE_CONFIG = createPageConfig(navigate, upcomingBookings);

    const getPageConfig = () => {
        if (path.includes('home')) return PAGE_CONFIG.home;
        if (path.includes('reserve')) return PAGE_CONFIG.reserve;
        if (path.includes('bookings')) return PAGE_CONFIG.bookings;
        return PAGE_CONFIG.home;
    }

    const config = getPageConfig();

    return (
        <header
            key={path}
            className={`PageHeader ${path.includes('confirmed') ? 'confirmed' : ''} ${path.includes('/home') && 'home-header'}`}
            style={{ height: `calc(${pageHeight}px - 88px)` }}
        >
            <section className='hero'>
                <h1 className='header-title'>{config?.title}</h1>
                <h2 className='header-subtitle'>{config?.subtitle}</h2>
                <p className='description'>{config?.description}</p>
                {config?.btnText && <Button paddingX={40} paddingY={40} text={config?.btnText} onClick={config?.btnAction} />}
            </section>
            {config?.image && <img src={config?.image} alt={`${path} header`} className='header-img' loading='lazy' />}
            <div className="header-lemon-decoration">🍋</div>

            <span className='arrow-down' onClick={scrollDown}>
                <KeyboardArrowDownIcon sx={{ fontSize: 60 }} />
            </span>
        </header>
    )
}

export default PageHeader;