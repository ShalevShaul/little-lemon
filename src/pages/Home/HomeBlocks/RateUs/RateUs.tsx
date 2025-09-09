import { useForm } from 'react-hook-form';
import './RateUs.css';
import Button from '../../../../components/Button/Button';
const cancelIcon = "/src/assets/icons/remove-button.webp";
import { useEffect } from 'react';
import Loader from '../../../../components/Loader/Loader';

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
    isSubmitting: boolean;
}

function RateUs(props: RateUsProps) {
    const { register, formState: { errors }, handleSubmit, watch } = useForm<Review>();

    const submitRating = (review: Review) => {
        props.onAddReview(review);
    }

    const rating = watch('rating', 5);

    useEffect(() => {
        const slider = document.getElementById('rating');
        if (slider) {
            const percentage = ((rating - 1) / 4) * 100;
            slider.style.setProperty('--value', percentage + '%');
        }
    }, [rating]);

    return (
        <div className='rate-us'>
            {props.isSubmitting ?
                <Loader />
                :
                <>
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
                            <label htmlFor="rating">Rating : {rating}/5</label>
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
                                        maxLength: { value: 150, message: 'Maximum 150 keys' }
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
                </>
            }
        </div>
    )
}

export default RateUs;