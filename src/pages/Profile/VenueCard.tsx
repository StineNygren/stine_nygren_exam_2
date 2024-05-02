import { Box, Button, Card, Typography } from "@mui/material";
import { Venue } from "../../types/types";
import { useDeleteVenueMutation } from "../../services/api.reducer";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoModal from "./InfoModal";
import EditVenue from "./EditVenue";




interface VenueCardProps {
    venue: Venue;
    refetch: () => void;
  }
  
  function VenueCard({ venue, refetch }: VenueCardProps) {


    const [deleteVenue] = useDeleteVenueMutation();

    const handleDelete = async () => {
          try {
            await deleteVenue(venue.id).unwrap();
            console.log("Venue deleted");
            refetch();
            
          } catch (error) {
            console.error("Failed to delete the venue: ", error);
          }
        
      };
    
    return (
      <Card sx={{width: "253px"}}>
        <Box
             component="img"
             src={venue.media && venue.media.length > 0 ? venue.media[0].url : "https://via.placeholder.com/253"}
             alt={venue.media && venue.media.length > 0 ? venue.media[0].alt : "Placeholder image"}
             sx={{height: '200px',}}
        />
            <Typography marginX={3} variant="h4">{venue.name}</Typography>
            <Box marginX={3} display={"flex"} justifyContent={"space-between"}>
            <Typography><LocationOnIcon fontSize="small" /> {venue.location.city || "Unknown"}</Typography>
            <Typography>{venue.price}$</Typography>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"}>
            <InfoModal venueId={venue.id}/>
            <EditVenue venueId={venue.id} refetch={refetch}/>
            <Button onClick={handleDelete} variant="text" color="secondary"><DeleteIcon/></Button>
            </Box>
      </Card>
    );
  }

export default VenueCard;

