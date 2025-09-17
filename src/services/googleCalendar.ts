let isGoogleLoaded = false;

export const addToGoogleCalendar = async (
    title: string,
    startDate: Date,
    endDate: Date,
    description?: string,
    location?: string
): Promise<boolean> => {

    console.log('=== Starting Google Identity Services ===');

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        console.log('Mobile device detected - creating ICS file');
        createICSFile(title, startDate, endDate, description, location);
        return true;
    }

    try {
        // Load Google Identity Services
        await loadGoogleIdentityServices();
        console.log('✅ Google Identity Services loaded');

        // Get access token
        const token = await getAccessToken();
        if (!token) {
            console.log('❌ Failed to get access token');
            return false;
        }
        console.log('✅ Access token received');

        // Create event
        const success = await createCalendarEvent(title, startDate, endDate, token, description, location);

        if (success) {
            console.log('✅ Event created successfully!');
            return true;
        } else {
            console.log('❌ Failed to create event');
            createICSFile(title, startDate, endDate, description, location);
            return false;
        }

    } catch (error) {
        console.error('❌ Error:', error);

        // Backup open Google Calendar manually
        openGoogleCalendarManually(title, startDate, endDate, description, location);
        return false;
    }
};

// Load Google Identity Services
const loadGoogleIdentityServices = (): Promise<void> => {
    if (isGoogleLoaded) return Promise.resolve();

    return new Promise((resolve, reject) => {
        // Load Google Identity Services
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;

        script.onload = () => {
            isGoogleLoaded = true;
            // Wait for Google Identity Services
            const checkGoogle = setInterval(() => {
                if ((window as any).google && (window as any).google.accounts) {
                    clearInterval(checkGoogle);
                    resolve();
                }
            }, 100);

            // 5 seconds timeout
            setTimeout(() => {
                clearInterval(checkGoogle);
                reject(new Error('Google Identity Services timeout'));
            }, 5000);
        };

        script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
        document.head.appendChild(script);
    });
};

// Get access token
const getAccessToken = (): Promise<string | null> => {
    return new Promise((resolve) => {
        const client = (window as any).google.accounts.oauth2.initTokenClient({
            client_id: (import.meta as any).env.VITE_GOOGLE_CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/calendar.events',
            callback: (response: any) => {
                if (response.access_token) {
                    console.log('Token received:', response.access_token.substring(0, 10) + '...');
                    resolve(response.access_token);
                } else {
                    console.error('No access token in response:', response);
                    resolve(null);
                }
            },
            error_callback: (error: any) => {
                console.error('Token error:', error);
                resolve(null);
            }
        });

        // Ask for access token
        client.requestAccessToken({
            prompt: 'consent'
        });
    });
};

// Create Google Calendar event
const createCalendarEvent = async (
    title: string,
    startDate: Date,
    endDate: Date,
    token: string,
    description?: string,
    location?: string
): Promise<boolean> => {
    try {
        const event = {
            summary: title,
            description: description || '',
            start: {
                dateTime: startDate.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            end: {
                dateTime: endDate.toISOString(),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            location: location || ''
        };

        console.log('Creating event with data:', event);

        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Event created:', result);
            return true;
        } else {
            const error = await response.text();
            console.error('Failed to create event:', response.status, error);
            return false;
        }

    } catch (error) {
        console.error('Error creating event:', error);
        return false;
    }
};

// Backup - open Google Calendar manually (for desktop errors)
const openGoogleCalendarManually = (
    title: string,
    startDate: Date,
    endDate: Date,
    description?: string,
    location?: string
): void => {
    console.log('Opening Google Calendar manually as fallback...');

    const formatDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
        details: description || '',
        location: location || ''
    });

    const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
    window.open(url, '_blank', 'width=600,height=600');
};

// Create ICS file for download (mobile devices and fallback)
const createICSFile = (
    title: string,
    startDate: Date,
    endDate: Date,
    description?: string,
    location?: string
): void => {
    console.log('Creating ICS file for download...');

    const formatDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODNAME:Little Lemon Restaurant',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DTSTART:${formatDate(startDate)}`,
        `DTEND:${formatDate(endDate)}`,
        `DESCRIPTION:${description || ''}`,
        `LOCATION:${location || ''}`,
        `UID:${Date.now()}@littlelemon.com`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.ics`;
    a.click();

    URL.revokeObjectURL(url);
};