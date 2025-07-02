import './BookingForm.css';
import { useBooking } from '../BookingContext';

function BookingForm({ onSubmit, availableTimes, dispatch, bookedTimes }) {
    const { formData, setFormData } = useBooking(); //

    return (
        <>
            <form className='table-form' onSubmit={onSubmit} aria-labelledby='booking-title'>
                <h2 style={{ textAlign: 'center' }}>Reserve a table</h2>
                <fieldset>
                    <legend><strong>Personal Information</strong></legend>

                    {/* First name field */}
                    <div className='form-field'>
                        <label htmlFor='first-name'>First Name:</label>
                        <input type='text' name='firstName' id='first-name' placeholder='First Name' required aria-required='true'
                            value={formData.firstName}
                            onChange={(e) => setFormData({
                                ...formData,
                                firstName: e.target.value
                            })} />
                    </div>

                    {/* Last name field */}
                    <div className='form-field'>
                        <label htmlFor='last-name'>Last Name:</label>
                        <input type='text' name='lastName' id='last-name' placeholder='Last Name' required aria-required='true'
                            value={formData.lastName}
                            onChange={(e) => setFormData({
                                ...formData,
                                lastName: e.target.value
                            })} />
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
                            }} />
                    </div>

                    {/* Time field */}
                    <div className='form-field'>
                        <label htmlFor='res-time'>Choose time:</label>
                        <select id='res-time' name='time' required aria-required='true'
                            value={formData.time}
                            onChange={(e) => setFormData({
                                ...formData,
                                time: e.target.value
                            })}>
                            <option value=''>Select time</option>
                            {availableTimes.map(time => {
                                if (bookedTimes.includes(time)) {
                                    return null;
                                }
                                return <option key={time} value={time}>{time}</option>
                            })}
                        </select>
                    </div>

                    {/* Number of guests field */}
                    <div className='form-field'>
                        <label htmlFor='guests'>Number of guests:</label>
                        <input type='number' name='guests' id='guests' placeholder='1' min={1} max={10} required aria-required='true'
                            value={formData.guests}
                            onChange={(e) => setFormData({
                                ...formData,
                                guests: e.target.value
                            })} />
                    </div>

                    {/* Occasion field */}
                    <div className='form-field'>
                        <label htmlFor='occasion'>Occasion:</label>
                        <select id='occasion' name='occasion' required aria-required='true'
                            value={formData.occasion}
                            onChange={(e) => setFormData({
                                ...formData,
                                occasion: e.target.value
                            })}>
                            <option value=''>Select occasion</option>
                            <option value='Birthday'>Birthday</option>
                            <option value='Anniversary'>Anniversary</option>
                        </select>
                    </div>
                </fieldset>

                <fieldset>
                    <legend><strong>Submit</strong></legend>
                    <input type='submit' value='Make your reservation' />
                </fieldset>
            </form>
        </>
    )
}

export default BookingForm;