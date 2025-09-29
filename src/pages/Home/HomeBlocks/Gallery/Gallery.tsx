import './Gallery.scss';
const outdoor = '/images/restaurant.webp';
const chef = '/images/restaurant chef B.webp';
const table = '/images/little-lemon.webp';
const inside = '/images/restaurant_inside.webp';
import { useInView } from '../../../../hooks/useInView';

interface GalleryImage {
    id: string;
    src: string;
    alt: string;
}

const galleryImages: GalleryImage[] = [
    {
        id: '1',
        src: inside,
        alt: 'Little Lemon restaurant interior'
    },
    {
        id: '2',
        src: chef,
        alt: 'Chef preparing Mediterranean dishes'
    },
    {
        id: '3',
        src: outdoor,
        alt: 'Beautiful outdoor seating area'
    },
    {
        id: '4',
        src: table,
        alt: 'Beautifully plated Mediterranean cuisine'
    }
];

function Gallery() {
    const { ref, isVisible } = useInView();

    return (
        <section ref={ref} className="gallery-section">
            <div className="container">
                <h2 className={`animate-on-scroll fade-in-up ${isVisible ? 'animated' : ''}`}>Experience Little Lemon</h2>
                <div className={`gallery-grid animate-on-scroll stagger-cards ${isVisible ? 'animated' : ''}`}>
                    {galleryImages.map(image => (
                        <div key={image.id} className="gallery-item">
                            <img src={image.src} alt={image.alt} loading='lazy' />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Gallery;