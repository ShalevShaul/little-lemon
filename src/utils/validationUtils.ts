export const validateField = (field: string, value: string | number): string => {
  if (field === 'fullName') {
    if (!value) return '* Full name is required';
    if (value.toString().length < 2) return '* Name must be at least 2 characters';
  }

  if (field === 'phone') {
    if (!value) return '* Phone number is required';
    if (value.toString().length < 10) return '* Phone number must be at least 10 digits';
  }

  if (field === 'email') {
    if (!value) return '* Email is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof (value) === 'string' && !emailRegex.test(value)) {
      return '* Please enter a valid email address';
    }
  }

  if (field === 'date') {
    if (!value) return '* Date is required';
    const today = new Date().toISOString().split('T')[0];
    if (value < today) return '* Past dates are not allowed';
  }

  if (field === 'time') {
    if (!value) return '* Time is required';
  }

  if (field === 'guests') {
    const guestCount = Number(value);
    if (!value || guestCount < 1) return '* At least 1 guest is required';
    if (guestCount > 12) return '* Maximum 12 guests allowed';
  }

  if (field === 'event') {
    if (!value) return '* Please select an event type';
  }

  return '';
};