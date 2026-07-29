

export interface Tracker {
    id: string;
    name: string;
    phone: string;
}

export interface TrackerLocation {
    latitude: number;
    longitude: number;
    speed?: number;
    satellites?: number;
    battery?: number;
    lastUpdate?: string;
}