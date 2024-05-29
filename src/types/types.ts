export interface media {
    url: string;
    alt: string;
  }

  interface meta {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  }

  interface Location {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat?: number;
    lng?: number;
  }

  interface Owner {
    name: string;
    email: string;
    bio: string;
    avatar: media;
    banner: media;
  }
  interface Count {
    bookings: number;
  }

export interface Venue {
    id: string;
    name: string;
    description: string;
    media: media[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: meta;
    location: Location;
    owner: Owner;
    bookings: Booking[];
    _count: Count;

  }

  interface Customer {
    name: string;
    email: string;
    bio: string | null;
    avatar: media;
    banner: media;
  }

  export interface Booking {
    id: string;
    dateFrom: string;
    dateTo: string;
    guests: number;
    created: string;
    updated: string;
    customer: Customer;
    venue: Venue;
  }
  
  export interface User {
    name: string;
    email: string;
    bio: string | null;
    avatar: media;
    banner: media;
    accessToken: string;
    venueManager: boolean;
  }
  
  export interface LoginResponse {
    data: User;
    meta?: Record<string, unknown>; 
  }

  export interface ProfileCount {
    venues: number;
    bookings: number;
  }
  
  export interface ExtendedUser extends User {
    venueManager: boolean;
    _count: ProfileCount;
  }  
  
  export interface ProfileResponse {
    name: string;
    email: string;
    bio: string | null;
    avatar: media;
    banner: media;
    data: ExtendedUser;
    venues: Venue[];
    bookings: Booking[];
    venueManager: boolean;
    meta?: Record<string, unknown>; 
  }
  