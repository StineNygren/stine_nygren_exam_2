import { Grid } from "@mui/material";
import { ProfileResponse } from "../../types/types";
import VenueCard from "./VenueCard";
interface ProfileDisplayProps {
    data: ProfileResponse; 
  }
function VenueDisplay({ data }: ProfileDisplayProps) {
    console.log(data.venues)
    const venues = data.venues

    return ( 

            venues.map((venue) => (
                <Grid key={venue.id}>
                    <VenueCard venue={venue} />

                    
                </Grid >
            ))

     );
}

export default VenueDisplay;