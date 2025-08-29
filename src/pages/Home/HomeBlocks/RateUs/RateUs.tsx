import { useForm } from 'react-hook-form';
import './RateUs.css';
import Button from '../../../../components/Button/Button';
import cancelIcon from '../../../../assets/icons/remove-button.webp'

interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

interface RateUsProps {
    openCloseModal: () => void;
    onAddReview: (review: Review) => void;
}

function RateUs(props: RateUsProps) {
    const { register, formState: { errors }, handleSubmit, watch, setValue } = useForm<Review>();

    const submitRating = (review: Review) => {
        props.onAddReview(review);
        props.openCloseModal();
    }

    return (
        <div className='rate-us'>
            <h1>Rate Us</h1>
            <form onSubmit={handleSubmit(submitRating)}>
                <div className='input-group'>
                    <label htmlFor="fullname">Full Name:</label>
                    <div className='input-with-icon'>
                        <span className='input-icon'>👤</span>
                        <input
                            {...register('name', {
                                required: 'Name is required',
                                minLength: { value: 2, message: 'Name is too short' }
                            })}
                            className={errors.name ? 'not-valid' : ''}
                            id='fullname'
                            placeholder='Full Name'
                        />
                        {errors.name && <span className='error'>* {errors.name.message}</span>}
                    </div>
                </div>

                <div className='input-group'>
                    <label htmlFor="rating">Rating : {watch('rating') || 1}/5</label>
                    <div className='input-with-icon'>
                        <span className='input-icon'>⭐</span>
                        <input
                            {...register('rating', {
                                required: 'Rating is required',
                                min: { value: 1, message: 'Rating must be at least 1' },
                                max: { value: 5, message: 'Rating cannot exceed 5' }
                            })}
                            className={errors.rating ? 'not-valid' : ''}
                            type='range'
                            id='rating'
                            step={1}
                            min={1}
                            max={5}
                            defaultValue={5}
                            onChange={(e) => {
                                const value:string = e.target.value;
                                const percentage = ((Number(e.target.value) - 1) / 4) * 100;
                                e.target.style.setProperty('--value', percentage + '%');
                                setValue('rating', Number(value));
                            }}
                        />
                        {errors.rating && <span className='error'>* {errors.rating.message}</span>}
                    </div>
                </div>

                <div className='input-group'>
                    <label htmlFor="comment">Comment :</label>
                    <div className='input-with-icon'>
                        <textarea
                            {...register('comment', {
                                required: 'Comment is required',
                                minLength: { value: 10, message: 'Comment must be at least 10 keys' },
                                max: { value: 150, message: 'Maximum 150 keys' }
                            })}
                            className={errors.comment ? 'not-valid' : ''}
                            id='comment'
                            autoComplete='off'
                            placeholder='Enter you review here'
                        />
                        {errors.comment && <span className='error'>* {errors.comment.message}</span>}
                    </div>
                </div>

                <Button paddingX={0} paddingY={20} text='Submit Rating' type='submit' />
            </form>
            <button
                className='close-modal'
                onClick={props.openCloseModal}
            >
                <img className='cancel-icon' src={cancelIcon} alt='cancel icon' />
            </button>
        </div>
    )
}

export default RateUs;