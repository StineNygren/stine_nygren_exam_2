import { Grid } from "@mui/material";
import { ProfileResponse } from "../../types/types";
import VenueCard from "./VenueCard";
import BookingCard from "./BookingCard";
import { isManager } from "../../services/localeStorage/localeStorage";



interface ProfileDisplayProps {
    data: ProfileResponse; 
    refetch: () => void;
  }
function VenueDisplay({ data, refetch }: ProfileDisplayProps) {


    const venues = data.venues
    const bookings = data.bookings



    return ( 
        <Grid container spacing={2} justifyContent="center" alignItems="center">

            {isManager ? venues.map((venue) => (
                <Grid p={3} key={venue.id}>
                    <VenueCard venue={venue} refetch={refetch}/>
  


                    
                </Grid >
            )) :
            bookings.map((booking) => (
                <Grid p={3} key={booking.id}>
                        <BookingCard booking={booking} refetch={refetch}/>
                </Grid>
            ))
            }
{/* 
           { venues.map((venue) => (
                <Grid p={3} key={venue.id}>
                    <VenueCard venue={venue} refetch={refetch}/>
  


                    
                </Grid >
            ))}

            { bookings.map((booking) => (
                <Grid p={3} key={booking.id}>
                        <BookingCard booking={booking} refetch={refetch}/>
                </Grid>
            ))} */}

         </Grid>

     );
}

export default VenueDisplay;