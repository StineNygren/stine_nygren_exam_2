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

  interface location {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
  }
  interface owner {
    name: string;
    email: string;
    bio: string;
    avatar: media;
    banner: media;
  }
  interface count {
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
    location: location;
    owner: owner;
    bookings: Booking;
    _count: count;



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