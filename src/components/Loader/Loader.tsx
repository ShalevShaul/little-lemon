import React, { useEffect } from 'react';
import './Loader.css';

const Loader: React.FC = () => {
    useEffect(() => {
        document.documentElement.setAttribute('data-no-scroll', 'true');

        return () => {
            document.documentElement.removeAttribute('data-no-scroll');
        }
    }, [])

    return (
        <div className='global-loader-overlay'>
            <div className="loader-container">
                <div className="glass">
                    <div className='glass-top'></div>
                    <div className="straw"></div>
                    <div className="juice"></div>
                    <div className="bubbles">
                        <div className="bubble bubble-1"></div>
                        <div className="bubble bubble-2"></div>
                        <div className="bubble bubble-3"></div>
                        <div className="bubble bubble-4"></div>
                        <div className="bubble bubble-5"></div>
                    </div>
                </div>
                <div className="lemon-slice"></div>
                <p className="loading-text">Little Lemon</p>
            </div>
        </div>
    );
};

export default Loader;