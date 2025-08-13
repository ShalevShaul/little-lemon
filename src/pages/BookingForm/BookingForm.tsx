import { useForm, useWatch } from 'react-hook-form';
import './BookingForm.css';
import type { Booking } from '../../types/booking';
import { useBooking } from '../../context/BookingContext';

function BookingForm() {
    const { addBooking, getAvailableHours } = useBooking();
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<Booking>({
        mode: 'onBlur',
        reValidateMode: 'onChange'
    });

    function addTable(bookingData: Omit<Booking, 'id'>) {
        console.log(bookingData);
        addBooking(bookingData)
        reset();
    }

    const EVENT_OPTIONS = [
        '🎂 Birthday', '💍 Anniversary', '💼 Business Meeting', '👨‍👩‍👧‍👦 Family Celebration', '💕 Date Night',
        '🎓 Graduation', '💐 Engagement', '🍼 Baby Shower', '🤝 Reunion', '🎉 Other'
    ];

    const selectedDate = useWatch({ control, name: 'date' });

    const availableHours = getAvailableHours(selectedDate || '');

    return (
        <form onSubmit={handleSubmit(addTable)}>
            <fieldset>
                <div className='input-group'>
                    <label htmlFor="fullName">Full Name:</label>
                    <input id='fullName' {...register('fullName', { required: true, minLength: 2 })} />
                    {errors.fullName?.type === 'required' && <span className='inputError'>* Name is required</span>}
                    {errors.fullName?.type === 'minLength' && <span className='inputError'>* Name is too short</span>}
                </div>

                <div className='input-group'>
                    <label htmlFor="date">Select Date:</label>
                    <input id='date' type="date" {...register('date', { required: true, min: new Date().toISOString().split('T')[0].toString() })} />
                    {errors.date?.type === 'required' && <span className='inputError'>* Date is required</span>}
                    {errors.date?.type === 'min' && <span className='inputError'>* Past dates are not allowed</span>}
                </div>

                <div className='input-group'>
                    <label htmlFor="time">Select Time:</label>
                    <select id="time" {...register('time', { required: true })}>
                        <option value={''}>Select Time</option>
                        {availableHours.map((h, index) =>
                            <option key={index} value={h}>{h}</option>
                        )}
                    </select>
                    {errors.time?.type === 'required' && <span className='inputError'>* Time is required</span>}
                </div>

                <div className='input-group'>
                    <label htmlFor="guests">Number Of Guests:</label>
                    <input id='guests' type="number" {...register('guests', { required: true, min: 1, max: 12 })} />
                    {errors.guests?.type === 'required' && <span className='inputError'>* Choose number of guests</span>}
                    {errors.guests?.type === 'min' && <span className='inputError'>* Minimum guests is 1</span>}
                    {errors.guests?.type === 'max' && <span className='inputError'>* Maximum guests is 12</span>}
                </div>

                <div className='input-group'>
                    <label htmlFor="event">Event:</label>
                    <select id='event' {...register('event', { required: true })}>
                        <option value={''}>Select Event</option>
                        {EVENT_OPTIONS.map((e, index) =>
                            <option value={e} key={index}>{e.split(' ').slice(1).join(' ')}</option>
                        )}
                    </select>
                    {errors.event?.type === 'required' && <span className='inputError'>Event is required</span>}
                </div>
            </fieldset>



            <button type='submit'>Submit</button>
        </form >
    )
}

export default BookingForm;