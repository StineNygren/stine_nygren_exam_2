interface media {
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
    lat: number;
    lng: number;
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
    id?: string;
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
    bookings: Booking;
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
  }


  // auth/login response

  export interface Image {
    url: string;
    alt: string;
  }
  
  export interface User {
    name: string;
    email: string;
    bio: string | null;
    avatar: Image;
    banner: Image;
    accessToken: string;
  }
  
  export interface LoginResponse {
    data: User;
    meta?: Record<string, unknown>; 
  }
