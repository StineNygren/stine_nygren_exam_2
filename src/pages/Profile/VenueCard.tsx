import { Box, Button, Card, Typography } from "@mui/material";
import { Venue } from "../../types/types";
import { useDeleteVenueMutation } from "../../services/api.reducer";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoModal from "./InfoModal";
import EditVenue from "./EditVenue";
import { NavLink } from "react-router-dom";




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

      let media = "https://via.placeholder.com/500";

if (venue.media && venue.media[0]) {
    media = venue.media[0].url;
}

const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://via.placeholder.com/500";
};
    
    return (
      <Card sx={{width: "253px"}}>
                    <NavLink to={`/venues/${venue.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box
                component="img"
                src={media}
                alt="venue media"
                width={"100%"}
                height={"200px"}
                onError={handleError}
            />
            <Typography sx={{   
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical'
                }} 
                 marginX={3} variant="h4">{venue.name}</Typography>
            <Box marginX={3} display={"flex"} justifyContent={"space-between"}>
            <Typography><LocationOnIcon fontSize="small" /> {venue.location.city || "Unknown"}</Typography>
            <Typography>{venue.price}$</Typography>
            </Box>
            </NavLink>
            <Box display={"flex"} justifyContent={"flex-end"}>
            <InfoModal venueId={venue.id}/>
            <EditVenue venueId={venue.id} refetch={refetch}/>
            <Button onClick={handleDelete} variant="text" color="secondary"><DeleteIcon/></Button>
            </Box>
      </Card>
    );
  }

export default VenueCard;

