import { Booking } from "../../types/types";
import { Card, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDeleteBookingMutation } from "../../services/api.reducer";
import { NavLink } from "react-router-dom";
import { useState } from "react";


interface BookingCardProps {
    booking: Booking;
    refetch: () => void;
  }

function BookingCard( {booking, refetch}: BookingCardProps) {

    const [open, setOpen] = useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

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

    let media = "https://via.placeholder.com/500";
    if (venue.media && venue.media.length > 0) {
        media = venue.media[0].url;
    }
    
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = "https://via.placeholder.com/500";
    };
    
    return (
        <Card sx={{width: "253px", height: "350px"}}>
            <NavLink to={`/venues/${venue.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box
                    component="img"
                    src={media}
                    alt="venue media"
                    width={"100%"}
                    height={"200px"}
                    onError={handleError}
                    sx={{
                        objectFit: 'cover',
                      }}
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
                            <Typography><LocationOnIcon fontSize="small" /> {venue.location.city || "Unknown"}</Typography>
                            <Typography>{venue.price}$</Typography>
                        </Box>

                        <Box marginX={3} display={"flex"} justifyContent={"center"}>

                            <Typography  >{formattedDateFrom} - {formattedDateTo}</Typography>
                        </Box>
                        </NavLink>
                        <Box display={"flex"} justifyContent={"flex-end"}>
                        <Button onClick={handleClickOpen} variant="text" color="secondary"><DeleteIcon /></Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>
                            Confirm Delete
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this booking?
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

export default BookingCard;
