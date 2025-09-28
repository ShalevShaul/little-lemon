import { useEffect } from 'react';
import './CustomModal.scss';

interface CustomModalProps {
    children: React.ReactNode;
}

function CustomModal({ children }: CustomModalProps) {
    useEffect(() => {
        const scrollY = window.scrollY;

        document.documentElement.style.setProperty('--scroll-y', `-${scrollY}px`);
        document.body.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
            document.documentElement.style.removeProperty('--scroll-y');
            window.scrollTo(0, scrollY);
        }
    }, []);

    return (
        <div className='custom-modal'>
            {children}
        </div>
    )
}

export default CustomModal;