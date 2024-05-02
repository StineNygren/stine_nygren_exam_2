import { Grid } from "@mui/material";
import { ProfileResponse } from "../../types/types";
import VenueCard from "./VenueCard";



interface ProfileDisplayProps {
    data: ProfileResponse; 
    refetch: () => void;
  }
function VenueDisplay({ data, refetch }: ProfileDisplayProps) {


    const venues = data.venues

    return ( 
        <Grid container spacing={2} justifyContent="center" alignItems="center">

           { venues.map((venue) => (
                <Grid p={3} key={venue.id}>
                    <VenueCard venue={venue} refetch={refetch}/>

                    
                </Grid >
            ))}
         </Grid>

     );
}

export default VenueDisplay;