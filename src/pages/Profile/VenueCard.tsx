import { Box, Button, Card, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Venue } from "../../types/types";
import { useDeleteVenueMutation } from "../../services/api.reducer";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoModal from "./InfoModal";
import EditVenue from "./EditVenue";
import { NavLink } from "react-router-dom";
import { isManager } from "../../services/localeStorage/localeStorage";
import { useState } from "react";

interface VenueCardProps {
    venue: Venue;
    refetch: () => void;
  }
  
  function VenueCard({ venue, refetch }: VenueCardProps) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };

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
                 marginX={3} marginY={1} fontSize={"large"}>{venue.name}</Typography>
            <Box marginX={3} display={"flex"} justifyContent={"space-between"}>
            <Typography><LocationOnIcon fontSize="small"  /> {venue.location.city || "Unknown"}</Typography>
            <Typography>{venue.price}$</Typography>
            </Box>
            </NavLink>
            <Box display={"flex"} justifyContent={"flex-end"}>
            <InfoModal venueId={venue.id}/>
            <EditVenue venueId={venue.id} refetch={refetch}/>
            <Button disabled={!isManager} onClick={handleClickOpen} variant="text" color="secondary"><DeleteIcon /></Button>
            <Dialog
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>
                Confirm Delete
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this venue?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            </Box>
      </Card>
    );
  }

export default VenueCard;

