export const generateId = (): string => {
    if ('randomUUID' in crypto) {
        return crypto.randomUUID();
    }

    return `booking-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
};