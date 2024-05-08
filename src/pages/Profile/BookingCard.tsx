import { Booking } from "../../types/types";
import { Card, Box, Typography, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDeleteBookingMutation } from "../../services/api.reducer";

interface BookingCardProps {
    booking: Booking;
    refetch: () => void;
  }

function BookingCard( {booking, refetch}: BookingCardProps) {

    const [deleteBooking] = useDeleteBookingMutation();

    const handleDelete = async () => {

        try {
            await deleteBooking(booking.id).unwrap();

            console.log("Venue deleted");
            refetch();
            
        } catch (error) {
            console.error("Failed to delete the venue: ", error);
        }
    };

    const venue = booking.venue;


    const dateFrom = new Date(booking.dateFrom);
    const dateTo = new Date(booking.dateTo);


    const formattedDateFrom = dateFrom.toISOString().split('T')[0];
    const formattedDateTo = dateTo.toISOString().split('T')[0];

    return ( 
  




                    <Card key={booking.id} sx={{ width: "253px" }}>
                        <img
                            src={venue.media && venue.media.length > 0 ? venue.media[0].url : "https://via.placeholder.com/253"}
                            alt={venue.media && venue.media.length > 0 ? venue.media[0].alt : "Placeholder image"}
                            style={{ height: '200px' }}
                        />
                        <Typography marginX={3} variant="h4">{venue.name}</Typography>
                        <Box marginX={3} display={"flex"} justifyContent={"space-between"}>
                            <Typography><LocationOnIcon fontSize="small" /> {venue.location.city || "Unknown"}</Typography>
                            <Typography>{venue.price}$</Typography>
                        </Box>

                            <Typography >{formattedDateFrom} - {formattedDateTo}</Typography>

                        <Box display={"flex"} justifyContent={"flex-end"}>
                            <Button onClick={handleDelete} variant="text" color="secondary"><DeleteIcon /></Button>
                        </Box>
                    </Card>

     );
}

export default BookingCard;