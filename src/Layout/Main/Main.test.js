import { fetchAPI } from '../../data/api';
import { initializeTimes, updateTimes } from '../Main/Main';

const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

test('writes to local storage', () => {
    const bookingData = [{ firstName: 'Shalev', lastName: 'Shaul', date: '2025-07-03', time: '18:00' }];
    localStorage.setItem('bookings', JSON.stringify(bookingData));

    expect(localStorage.setItem).toHaveBeenCalledWith('bookings', JSON.stringify(bookingData));
});

test('reads from local storage', () => {
    const mockBookings = [{ firstName: 'Shalev', lastName: 'Shaul', date: '2025-07-03', time: '18:00' }];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockBookings));

    const result = JSON.parse(localStorage.getItem('bookings'));

    expect(localStorage.getItem).toHaveBeenCalledWith('bookings');
    expect(result).toEqual(mockBookings);
});

test('return initial times', () => {
    const times = initializeTimes();
    expect(times).toEqual(expect.any(Array));
    expect(times.length).toBeGreaterThan(0);
});

test('return same state when action type is unknown', () => {
    const state = ['existing times'];
    const action = { type: '', date: new Date() };
    const result = updateTimes(state, action);
    expect(result).toEqual(['existing times']);
});

test('returns default times when no date provided', () => {
    const times = fetchAPI(new Date());

    const state = [];
    const action = { type: 'UPDATE_TIMES', date: '' };
    const result = updateTimes(state, action);

    expect(result).toEqual(times);
});

test('return times for (sunday) 2025-07-06', () => {
    const times = fetchAPI(new Date('2025-07-06'));

    const state = [];
    const action = { type: 'UPDATE_TIMES', date: '2025-07-06' };
    const result = updateTimes(state, action);
    expect(result).toEqual(times);
});

test('return times for (thursday) 2025-07-10', () => {
    const times = fetchAPI(new Date('2025-07-10'));

    const state = [];
    const action = { type: 'UPDATE_TIMES', date: '2025-07-10' };
    const result = updateTimes(state, action);
    expect(result).toEqual(times);
});

test('return times for (saturday) 2025-07-12', () => {
    const times = fetchAPI(new Date('2025-07-12'));

    const state = [];
    const action = { type: 'UPDATE_TIMES', date: '2025-07-12' };
    const result = updateTimes(state, action);
    expect(result).toEqual(times);
});