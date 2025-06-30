import { initializeTimes, updateTimes } from '../Main/Main';

test('return initial times', () => {
    const times = initializeTimes();
    expect(times).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
});

test('return same state when action type is unknown', () => {
    const state = ['existing times'];
    const action = { type: '', date: new Date };
    const result = updateTimes(state, action);
    expect(result).toEqual(['existing times']);
});

test('returns default times when no date provided', () => {
    const state = [];
    const action = { type: 'UPDATE_TIMES', date: '' };
    const result = updateTimes(state, action);
    expect(result).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
});

test('return times for sunday', () => {
    const state = [];
    const action = { type: 'UPDATE_TIMES', date: new Date('2024-01-07') };
    const result = updateTimes(state, action);
    expect(result).toEqual(['18:00', '19:00', '20:00', '21:00']);
});

test('return times for thursday', () => {
    const state = [];
    const action = { type: 'UPDATE_TIMES', date: new Date('2024-01-11') };
    const result = updateTimes(state, action);
    expect(result).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
});

test('return times for saturday', () => {
    const state = [];
    const action = { type: 'UPDATE_TIMES', date: new Date('2024-01-13') };
    const result = updateTimes(state, action);
    expect(result).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']);
});