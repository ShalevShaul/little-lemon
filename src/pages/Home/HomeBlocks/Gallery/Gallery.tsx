import './Gallery.css';
import outdoor from '../../../../assets/images/restaurant.webp';
import chef from '../../../../assets/images/restaurant chef B.webp';
import table from '../../../../assets/images/little-lemon.webp';
import inside from '../../../../assets/images/restaurant_inside.webp';

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
    return (
        <section className="gallery-section">
            <div className="container">
                <h2 className='animate-on-scroll fade-in-up'>Experience Little Lemon</h2>
                <div className="gallery-grid animate-on-scroll stagger-cards">
                    {galleryImages.map(image => (
                        <div key={image.id} className="gallery-item">
                            <img src={image.src} alt={image.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Gallery;