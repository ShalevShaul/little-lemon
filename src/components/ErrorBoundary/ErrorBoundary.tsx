import React, { Component } from 'react';
import './ErrorBoundary.scss';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleRefresh = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary-container">
                    <div className="error-boundary-content">
                        <div className="error-code">Oops!</div>
                        <h1 className="error-title">Something went wrong.</h1>
                        <p className="error-message">
                            An unexpected system error has occurred.<br />
                            Please try again or return to the home page.
                        </p>

                        <div className="error-actions">
                            <button onClick={this.handleRefresh} className="refresh-button">
                                Refresh page
                            </button>
                            <button onClick={this.handleGoHome} className="home-button">
                                Home page
                            </button>
                        </div>

                        <div className="restaurant-info">
                            <p>Need help? Contact us</p>
                            <a href="tel:+1234567890" className="phone-link">
                                📞 (123) 456-7890
                            </a>
                        </div>
                    </div>

                    <div className="lemon-decoration">🍋</div>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;