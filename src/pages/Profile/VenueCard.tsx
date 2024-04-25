import { Box, Button, Card, Typography } from "@mui/material";
import { Venue } from "../../types/types";
import { useDeleteVenueMutation } from "../../services/api.reducer";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoModal from "./InfoModal";




interface VenueCardProps {
    venue: Venue;
  }
  
  function VenueCard({ venue }: VenueCardProps) {

    const [deleteVenue] = useDeleteVenueMutation();

    const handleDelete = async () => {
          try {
            await deleteVenue(venue.id).unwrap();
            console.log("Venue deleted");
          } catch (error) {
            console.error("Failed to delete the venue: ", error);
          }
        
      };
    
    return (
      <Card sx={{width: "253px"}}>
        <Box
             component="img"
             src={venue.media[0].url}
             alt={venue.media[0].alt}
             sx={{height: '200px',}}
        />
            <Typography marginX={3} variant="h4">{venue.name}</Typography>
            <Box marginX={3} display={"flex"} justifyContent={"space-between"}>
            <Typography><LocationOnIcon fontSize="small" /> {venue.location.city || "Unknown"}</Typography>
            <Typography>{venue.maxGuests}$</Typography>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"}>
            <InfoModal venueId={venue.id}/>
            <Button  variant="text" color="secondary"><EditIcon/></Button>
            <Button onClick={handleDelete} variant="text" color="secondary"><DeleteIcon/></Button>
            </Box>
      </Card>
    );
  }

export default VenueCard;