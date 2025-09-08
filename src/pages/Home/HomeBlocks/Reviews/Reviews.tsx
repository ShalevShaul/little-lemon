import Modal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './Reviews.css';
import leftArrow from '../../../../assets/icons/left-arrow-icon.webp'
import rightArrow from '../../../../assets/icons/right-arrow-icon.webp'
import RateUs from '../RateUs/RateUs';
import { useCallback, useEffect, useState } from 'react';
import Button from '../../../../components/Button/Button';
import toast, { Toaster } from 'react-hot-toast';
import { useInView } from '../../../../hooks/useInView';
import { formatDate } from '../../../../utils/dateUtils';
import { generateId } from '../../../../utils/generateId';

interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

const initialReviews: Review[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'Amazing Mediterranean food! The atmosphere is perfect for a romantic dinner. Will definitely come back!',
        date: '2025-07-15'
    },
    {
        id: '2',
        name: 'Mike Chen',
        rating: 5,
        comment: 'Best Greek salad in the city! Fresh ingredients and authentic flavors. The staff was incredibly friendly.',
        date: '2025-07-20'
    },
    {
        id: '3',
        name: 'Emily Rodriguez',
        rating: 4,
        comment: 'Great food and service. The bruschetta was outstanding. Perfect place for family dinners.',
        date: '2025-08-01'
    },
    {
        id: '4',
        name: 'David Williams',
        rating: 5,
        comment: 'Exceptional dining experience! The lemon dessert is a must-try. Highly recommend this place!',
        date: '2025-08-10'
    },
    {
        id: '5',
        name: 'Jessica Martinez',
        rating: 5,
        comment: 'Outstanding service and delicious food! The Mediterranean platter was incredible. Love the cozy atmosphere too!',
        date: '2025-08-12'
    }
];

const renderStars = (rating: number) => {
    return '⭐'.repeat(rating);
};

Modal.setAppElement('#root');

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1000
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '16px',
        padding: '0',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'hidden'
    }
};

function Reviews() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const { ref, isVisible } = useInView();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const storageReviews: Review[] = JSON.parse(localStorage.getItem('storageReviews') || '[]');
        if (storageReviews.length > 0) {
            setReviews([...initialReviews, ...storageReviews]);
        } else {
            setReviews(initialReviews);
        }
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    const handleOpenCloseModal = useCallback(() => {
        setIsModalOpen(prev => !prev);
    }, []);

    const addNewReview = useCallback(async (newReview: Review) => {
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 3500));

            const reviewWithId = {
                ...newReview,
                id: generateId(),
                date: new Date().toISOString().split('T')[0]
            };

            setReviews(prev => [...prev, reviewWithId]);

            const existingReviews: Review[] = JSON.parse(localStorage.getItem('storageReviews') || '[]');
            const updatedReviews = [...existingReviews, reviewWithId];
            localStorage.setItem('storageReviews', JSON.stringify(updatedReviews));

            toast.success('Review added successfully! 🎉');
        } catch (error) {
            toast.error('Failed to add review. Please try again.');
        } finally {
            setIsSubmitting(false);
            setIsModalOpen(false);
        }
    }, []);

    return (
        <>
            <section ref={ref} className="reviews-section">
                <div className="container">
                    <div className='reviews-section-header'>
                        <h2 className={`animate-on-scroll fade-in-left ${isVisible ? 'animated' : ''}`}>What Our Customers Say</h2>
                        <div className={`animate-on-scroll fade-in-right delay-200 ${isVisible ? 'animated' : ''}`}>
                            <Button paddingX={25} paddingY={0} text='Rate Us' onClick={handleOpenCloseModal} />
                        </div>
                    </div>

                    <div className={`reviews-swiper-container animate-on-scroll scale-in delay-400 ${isVisible ? 'animated' : ''}`}>
                        <Swiper

                            modules={[Navigation, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={2}
                            navigation={{
                                nextEl: '.custom-swiper-button-next',
                                prevEl: '.custom-swiper-button-prev',
                            }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            loop={true}
                            speed={600}
                            grabCursor={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 25,
                                },
                                1024: {
                                    slidesPerView: 1,
                                    spaceBetween: 30,
                                },
                            }}
                        >
                            {reviews.map(review => (
                                <SwiperSlide key={review.id}>
                                    <div className="review-card">
                                        <div className="review-header">
                                            <div className="reviewer-info">
                                                <h4>{review.name}</h4>
                                                <span className="review-date">
                                                    {formatDate(review.date)}
                                                </span>
                                            </div>
                                            <div className="rating">
                                                {renderStars(review.rating)}
                                            </div>
                                        </div>
                                        <p className="review-comment">"{review.comment}"</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className='navigation-buttons'>
                            <img src={leftArrow} alt='left arrow icon' className="custom-swiper-button-prev" />
                            <img src={rightArrow} alt='right arrow icon' className="custom-swiper-button-next" />
                        </div>
                    </div>
                </div>
            </section>
            <Modal
                isOpen={isModalOpen}
                style={modalStyles}
                shouldCloseOnOverlayClick={!isSubmitting}
                shouldCloseOnEsc={!isSubmitting}
                onRequestClose={isSubmitting ? undefined : handleOpenCloseModal}
            >
                <RateUs
                    openCloseModal={handleOpenCloseModal}
                    onAddReview={addNewReview}
                    isSubmitting={isSubmitting}
                />
            </Modal>
            <Toaster
                position='bottom-center'
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#4b5e57e7',
                        color: '#fff',
                        fontWeight: 'bolder',
                        fontSize: '18px',
                        padding: '15px',
                    },
                }}
            />
        </>
    );
}

export default Reviews;