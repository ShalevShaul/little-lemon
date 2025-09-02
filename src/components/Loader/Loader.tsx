import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8faf7',
            fontFamily: 'Arial, sans-serif'
        }}>
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