import { useEffect } from 'react';
import './CustomModal.scss';

interface CustomModalProps {
    children: React.ReactNode;
}

function CustomModal({ children }: CustomModalProps) {
    useEffect(() => {
        document.documentElement.setAttribute('data-no-scroll', 'true');

        return () => document.documentElement.removeAttribute('data-no-scroll');
    }, [])

    return (
        <div className='custom-modal'>
            {children}
        </div>
    )
}

export default CustomModal;