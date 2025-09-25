import './SkeletonLoader.scss';

interface SkeletonLoaderProps {
    count?: number;
}

const SkeletonLoader = ({ count = 3 }: SkeletonLoaderProps) => {
    const SkeletonCard = () => {
        return <div className='skeleton-card'></div>
    }

    return (
        <div className='skeleton-loader'>
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    )
}

export default SkeletonLoader;