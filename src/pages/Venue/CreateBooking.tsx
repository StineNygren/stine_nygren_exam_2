import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { Booking } from '../../types/types';
import { isWithinInterval, parseISO, isBefore, endOfDay } from 'date-fns';

interface CreateBookingProps {
    bookings: Booking[];
}



function CreateBooking( { bookings }: CreateBookingProps) {

    const bookedDates = bookings.map(booking => ({
        dateFrom: parseISO(booking.dateFrom),
        dateTo: parseISO(booking.dateTo)
    }));

    const isDateBooked = (date: Date) => {
        const today = endOfDay(new Date());
        return isBefore(date, today) || bookedDates.some(({ dateFrom, dateTo }) => 
            isWithinInterval(date, { start: dateFrom, end: dateTo })
        );
    };
    console.log(bookedDates)


    return ( 
        <div>
            <DateRangePicker
            showOneCalendar
            shouldDisableDate={isDateBooked}
             />
        </div>
     );
}

export default CreateBooking;