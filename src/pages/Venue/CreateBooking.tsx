import {  DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { Booking } from '../../types/types';
import { isWithinInterval, parseISO, isBefore, endOfDay, isValid, isAfter } from 'date-fns';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useCreateBookingMutation } from '../../services/api.reducer';
import { useState } from 'react';
import { errorsSelector } from "../../services/redux.reducer";
import { useAppSelector } from "../../services/store";
import { user } from '../../services/localeStorage/localeStorage';
import { useNavigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';



interface CreateBookingProps {
    bookings: Booking[];
    id: string;
    owner: string;
    price: number;
    maxGuests: number;
}

function CreateBooking( { bookings, id, owner, price, maxGuests }: CreateBookingProps) {

    const [createBooking] = useCreateBookingMutation();
    const ApiErrors = useAppSelector(errorsSelector);

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
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);

    const numDays = differenceInDays(dateRange[1], dateRange[0]);
    const totalPrice = numDays * price;

    const navigate = useNavigate();

    const onSubmit = async () => {
        setMessage(null);
        
        console.log('Creating booking:', dateRange, guests)
        if (dateRange === null || dateRange[0] === null || dateRange[1] === null) {
            setMessage('Please select a date range');
            setIsError(true);
            return;
        }
        try {
            const bookingData = {
                venueId: id,
                dateFrom: dateRange[0],
                dateTo: dateRange[1],
                guests: guests
            };
            const result = await createBooking(bookingData).unwrap();
            console.log('Booking created:', result);
            setMessage('Booking created successfully');
            navigate(`/success`, { state: { result } });
            setIsError(false);
    
        } catch (error) {
            console.error('Failed to create booking:', error);

        }
    };
    
    return ( 
        <Box display={"flex"} flexDirection={"column"} gap={2} justifyContent={"flex-end"}>
                    {ApiErrors.map((error, index) => (
                            <p key={index}>
                                {error.message}
                            </p>
                        ))}
             {message && <p className={isError ? "error-message" : "success-message"}>{message}</p>}
             <Typography>Max guests: {maxGuests}</Typography>
             <Typography>Price pr nigth: {price}</Typography>
             <Typography>Total price: {totalPrice}</Typography>
             
            <DateRangePicker
                showOneCalendar
                shouldDisableDate={isDateBooked}
                value={dateRange}
                onChange={(newDateRange: [Date, Date] | any ) => setDateRange(newDateRange)}
            />
            <TextField             
                label="Guests" 
                type="number" 
                value={guests}
                onChange={(e) => {
                    if (e.target.value === '') {
                        setGuests(1);
                    } else {
                        const numGuests = parseInt(e.target.value);
                        if (!isNaN(numGuests) && numGuests >= 1 && numGuests <= maxGuests) {
                            setGuests(numGuests);
                          }
                    }
                }}
            />
            <Button disabled={!user || owner === user} variant="contained" onClick={onSubmit} type="submit">Book</Button>
        </Box>
    );
}

export default CreateBooking;
