import { useBookingForm } from '../../context/FormContext';
import './BookingForm.css';
import PersonalInfo from './steps/step1/PersonalInfo';
import DateTime from './steps/step2/DateTime';
import EventDetails from './steps/step3/EventDetails';
import Summary from './steps/step4/Summary';

function MultiStepBookingForm() {
    const { currentStep } = useBookingForm();

    const steps = [
        {
            component: <PersonalInfo />,
            title: 'Personal Information'
        },
        {
            component: <DateTime />,
            title: 'Date & Time'
        },
        {
            component: <EventDetails />,
            title: 'Event Details'
        },
        {
            component: <Summary />,
            title: 'Review Booking'
        }
    ];

    const renderProgressIndicator = () => {
        return (
            <div className='progress-indicator' data-step={currentStep}>
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`progress-step ${index === currentStep ? 'active' :
                            index < currentStep ? 'completed' : 'pending'
                            }`}
                    >
                        <div className='step-number'>
                            {index < currentStep ? '✓' : index + 1}
                        </div>
                        <div className='step-title'>{step.title}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='booking-form' >
            <div className='form-container'>
                <div className='form-header'>
                    <h1>Table Reservation</h1>
                    <p>Little Lemon Restaurant</p>
                </div>

                {renderProgressIndicator()}

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='form-content'>
                        {steps[currentStep]?.component}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MultiStepBookingForm;