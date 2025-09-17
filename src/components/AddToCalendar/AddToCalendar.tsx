import './AddToCalendar.css';
import React, { useEffect, useState } from 'react';
import { addToGoogleCalendar } from '../../services/googleCalendar';
import { useLoader } from '../../contexts/LoaderContext';
import toast from 'react-hot-toast';
import CustomButton from '../CustomButton/CustomButton';

interface AddToCalendarProps {
    title: string;
    startDate: Date;
    endDate: Date;
    description?: string;
    location?: string;
}

export const AddToCalendar: React.FC<AddToCalendarProps> = ({
    title,
    startDate,
    endDate,
    description,
    location
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { setLoaderOn, setLoaderOff } = useLoader();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleAddToCalendar = async () => {
        setIsLoading(true);

        try {
            const success = await addToGoogleCalendar(
                title,
                startDate,
                endDate,
                description,
                location
            );

            if (success) {
                toast.success('Event created successfully!');
                setIsSuccess(true);
            } else {
                toast.error('Add the event manually');
            }
        } catch (error) {
            toast.error('Error adding event');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isLoading) {
            setLoaderOn('Adding to calendar...')
        } else {
            setLoaderOff()
        }

        return () => setLoaderOff()
    }, [isLoading])

    return (
        <CustomButton
            color='primary'
            onClick={handleAddToCalendar}
            text={`${isSuccess ? 'Event Added!' : 'Add to calendar'}`}
            disabled={isSuccess}
        />
    );
};