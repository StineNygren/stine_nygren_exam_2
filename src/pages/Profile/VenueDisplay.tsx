import { Grid } from "@mui/material";
import { ProfileResponse } from "../../types/types";
import VenueCard from "./VenueCard";



interface ProfileDisplayProps {
    data: ProfileResponse; 
  }
function VenueDisplay({ data }: ProfileDisplayProps) {


    const venues = data.venues

    return ( 
        <Grid container spacing={2} justifyContent="center" alignItems="center">

           { venues.map((venue) => (
                <Grid p={3} key={venue.id}>
                    <VenueCard venue={venue} />

                    
                </Grid >
            ))}
         </Grid>

     );
}

export default VenueDisplay;