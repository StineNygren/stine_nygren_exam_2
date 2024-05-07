import {  DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { Booking } from '../../types/types';
import { isWithinInterval, parseISO, isBefore, endOfDay, isValid, isAfter } from 'date-fns';
import { Box, Button, TextField } from '@mui/material';
import { useCreateBookingMutation } from '../../services/api.reducer';
import { useState } from 'react';




interface CreateBookingProps {
    bookings: Booking[];
    id: string;
}


function CreateBooking( { bookings, id }: CreateBookingProps) {

    const [createBooking] = useCreateBookingMutation();

    const bookedDates = bookings.map(booking => ({
        dateFrom: parseISO(booking.dateFrom),
        dateTo: parseISO(booking.dateTo)
    }));

    const isDateBooked = (date: Date) => {
        const today = endOfDay(new Date());
        return isBefore(date, today) || bookedDates.some(({ dateFrom, dateTo }) => {
            if (!isValid(dateFrom) || !isValid(dateTo)) {
                console.error('Invalid dateFrom or dateTo');
                return false;
            }
            let start = dateFrom;
            let end = dateTo;
            if (isAfter(dateFrom, dateTo)) {
                console.warn('dateFrom is after dateTo, swapping dates');
                start = dateTo;
                end = dateFrom;
            }
            return isWithinInterval(date, { start, end });
        });
    };

    const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
    const [guests, setGuests] = useState(1);
    
    const onSubmit = () => {
        try {
            const bookingData = {
                venueId: id,
                dateFrom: dateRange[0],
                dateTo: dateRange[1],
                guests: guests
            };
            const result = createBooking(bookingData).unwrap();
            console.log('Booking created:', result);

        } catch (error) {
            console.error('Failed to create booking:', error);

        }
    }


    
    return ( 
        <Box display={"flex"} flexDirection={"column"} gap={2} justifyContent={"flex-end"}>
            <DateRangePicker
                showOneCalendar
                shouldDisableDate={isDateBooked}
                value={dateRange}
                onChange={(newDateRange: [Date, Date]) => setDateRange(newDateRange)}
            />
            <TextField 

            
                label="Guests" 
                type="number" 
                value={guests}
                onChange={(e) => {
                    if (e.target.value === '') {
                        setGuests(0);
                    } else {
                        const numGuests = parseInt(e.target.value);
                        if (!isNaN(numGuests)) {
                            setGuests(numGuests);
                        }
                    }
                }}
            />
            <Button variant="contained" onClick={onSubmit} type="submit">Book</Button>
        </Box>
    );
}

export default CreateBooking;