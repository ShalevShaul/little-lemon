import './BookingForm.css';
import { useBooking } from '../BookingContext';
import { useState } from 'react';

function BookingForm({ onSubmit, availableTimes, dispatch, bookedTimes }) {
    const { formData, setFormData } = useBooking(); //
    const [isSubmitted, setIsSubmitted] = useState({
        firstName: false,
        lastName: false,
        date: false,
        time: false,
        guests: false,
        occasion: false,
    });

    return (
        <>
            <form className='table-form' onSubmit={onSubmit} aria-label="Table reservation form">
                <h2 style={{ textAlign: 'center' }}>Reserve a table</h2>
                <fieldset>
                    <legend><strong>Personal Information</strong></legend>

                    {/* First name field */}
                    <div className='form-field'>
                        <label htmlFor='first-name'>First Name:</label>
                        <input type='text' name='firstName' id='first-name' placeholder='First Name' required aria-required='true' minLength={2}
                            value={formData.firstName}
                            onChange={(e) => setFormData({
                                ...formData,
                                firstName: e.target.value
                            })}
                            onBlur={() => setIsSubmitted({ ...isSubmitted, firstName: true })} />
                        {isSubmitted.firstName && <span className='errors' style={{ display: `${formData.firstName ? 'none' : 'inline'}` }}>* First Name is required</span>}
                        {isSubmitted.firstName && <span className='errors' style={{ display: `${formData.firstName.length < 2 && formData.firstName.length > 0 ? 'inline' : 'none'}` }}>* First Name is too short</span>}
                    </div>

                    {/* Last name field */}
                    <div className='form-field'>
                        <label htmlFor='last-name'>Last Name:</label>
                        <input type='text' name='lastName' id='last-name' placeholder='Last Name' required aria-required='true' minLength={2}
                            value={formData.lastName}
                            onChange={(e) => setFormData({
                                ...formData,
                                lastName: e.target.value
                            })}
                            onBlur={() => setIsSubmitted({ ...isSubmitted, lastName: true })} />
                        {isSubmitted.lastName && <span className='errors' style={{ display: `${formData.lastName ? 'none' : 'inline'}` }}>* Last Name is required</span>}
                        {isSubmitted.lastName && <span className='errors' style={{ display: `${formData.lastName.length < 2 && formData.lastName.length > 0 ? 'inline' : 'none'}` }}>* Last Name is too short</span>}

                    </div>
                </fieldset>

                <fieldset>
                    <legend><strong>Reservation Details</strong></legend>

                    {/* Date field */}
                    <div className='form-field'>
                        <label htmlFor='res-date'>Choose date:</label>
                        <input type='date' name='date' id='res-date' required aria-required='true'
                            value={formData.date}
                            min={new Date().toISOString().split('T')[0].toString()}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    date: e.target.value
                                });
                                dispatch({
                                    type: 'UPDATE_TIMES',
                                    date: e.target.value
                                });
                            }}
                            onBlur={() => setIsSubmitted({ ...isSubmitted, date: true })} />
                        {isSubmitted.date && <span className='errors' style={{ display: `${formData.date ? 'none' : 'inline'}` }}>* Date is required</span>}
                        {isSubmitted.date && <span className='errors' style={{ display: `${formData.date && formData.date < (new Date().toISOString().split('T')[0].toString()) ? 'inline' : 'none'}` }}>* Past dates are not allowed</span>}
                    </div>

                    {/* Time field */}
                    <div className='form-field'>
                        <label htmlFor='res-time'>Choose time:</label>
                        <select id='res-time' name='time' required aria-required='true'
                            value={formData.time}
                            onChange={(e) => setFormData({
                                ...formData,
                                time: e.target.value
                            })}
                            onBlur={() => setIsSubmitted({ ...isSubmitted, time: true })}>
                            <option value=''>Select time</option>
                            {availableTimes.map(time => {
                                if (bookedTimes.includes(time)) {
                                    return null;
                                }
                                return <option key={time} value={time}>{time}</option>
                            })}
                        </select>
                        {isSubmitted.time && <span className='errors' style={{ display: `${formData.time ? 'none' : 'inline'}` }}>* Time is required</span>}
                    </div>

                    {/* Number of guests field */}
                    <div className='form-field'>
                        <label htmlFor='guests'>Number of guests:</label>
                        <input type='number' name='guests' id='guests' placeholder='1' min={1} max={10} required aria-required='true'
                            value={formData.guests}
                            onChange={(e) => setFormData({
                                ...formData,
                                guests: e.target.value
                            })}
                            onBlur={() => setIsSubmitted({ ...isSubmitted, guests: true })} />
                        {isSubmitted.guests && <span className='errors' style={{ display: `${formData.guests ? 'none' : 'inline'}` }}>* Guests is required</span>}
                        {isSubmitted.guests && <span className='errors' style={{ display: `${formData.guests && formData.guests < 1 ? 'inline' : 'none'}` }}>* Minimum guests is 1</span>}
                        {isSubmitted.guests && <span className='errors' style={{ display: `${formData.guests && formData.guests > 10 ? 'inline' : 'none'}` }}>* Maximum guests is 10</span>}
                    </div>

                    {/* Occasion field */}
                    <div className='form-field'>
                        <label htmlFor='occasion'>Occasion:</label>
                        <select id='occasion' name='occasion' required aria-required='true'
                            value={formData.occasion}
                            onChange={(e) => setFormData({
                                ...formData,
                                occasion: e.target.value
                            })}
                            onBlur={() => setIsSubmitted({ ...isSubmitted, occasion: true })}>
                            <option value=''>Select occasion</option>
                            <option value='Birthday'>Birthday</option>
                            <option value='Anniversary'>Anniversary</option>
                            <option value='Other'>Other</option>
                        </select>
                        {isSubmitted.occasion && <span className='errors' style={{ display: `${formData.occasion ? 'none' : 'inline'}` }}>* Occasion is required</span>}
                    </div>
                </fieldset>

                <fieldset>
                    <legend><strong>Submit</strong></legend>
                    <input type='submit' value='Make your reservation'
                        aria-label="On Click"
                        disabled={!formData.firstName || !formData.lastName || !formData.date ||
                            !formData.time || !formData.guests || !formData.occasion} />
                    {(!formData.firstName || !formData.lastName || !formData.date ||
                        !formData.time || !formData.guests || !formData.occasion)
                        && <span className='submit-error'>Please fill all required fields</span>}
                </fieldset>
            </form>
        </>
    )
}

export default BookingForm;