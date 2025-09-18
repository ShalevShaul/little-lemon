import { ReactNode } from "react"

export interface Event {
    icon: ReactNode
    text: string
}

export interface Booking {
    id: string,
    phone: string,
    email: string,
    fullName: string,
    date: string,
    time: string,
    guests: number,
    event: Event
}