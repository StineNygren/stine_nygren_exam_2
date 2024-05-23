import { Box, Grid, Button } from "@mui/material";
import { ProfileResponse } from "../../types/types";
import VenueCard from "./VenueCard";
import BookingCard from "./BookingCard";
import { isManager } from "../../services/localeStorage/localeStorage";
import { useState } from 'react';

interface ProfileDisplayProps {
    data: ProfileResponse; 
    refetch: () => void;
  }
function VenueDisplay({ data, refetch }: ProfileDisplayProps) {

    const [view, setView] = useState('venues');

    const venues = data.venues
    const bookings = data.bookings

console.log(venues.length)

    return ( 
        <Box p={5}>
            {!isManager && venues.length === 0 ? (
              <>
                                <Button variant="outlined" sx={{color: "#343434"}} onClick={() => {setView('bookings'); refetch();}}>
                                Show Bookings
                                </Button>
                                <Grid container spacing={2} justifyContent="center" alignItems="center">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Grid p={3} key={booking.id}>
              <BookingCard booking={booking} refetch={refetch}/>
            </Grid>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </Grid>
        </> 
            ) : (
            <>
                <Button  variant="outlined" sx={{color: "#343434"}} onClick={() => {setView('venues'); refetch();}}>
                Show Venues
                </Button>
                <Button variant="outlined" sx={{color: "#343434"}} onClick={() => {setView('bookings'); refetch();}}>
                Show Bookings
                </Button>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                {view === 'venues' ? (
      venues.length > 0 ? (
        venues.map((venue) => (
          <Grid p={3} key={venue.id}>
            <VenueCard venue={venue} refetch={refetch}/>
          </Grid>
        ))
      ) : (
        <p>No venues available.</p>
      )
    ) : (
      bookings.length > 0 ? (
        bookings.map((booking) => (
          <Grid p={3} key={booking.id}>
            <BookingCard booking={booking} refetch={refetch}/>
          </Grid>
        ))
      ) : (
        <p>No bookings available.</p>
      )
    )}
    </Grid>
            </>
            )}



         </Box>
     );
}

export default VenueDisplay;

