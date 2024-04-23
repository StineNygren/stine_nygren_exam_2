import { Button, Card } from "@mui/material";
import { Venue } from "../../types/types";
import { useDeleteVenueMutation } from "../../services/api.reducer";



interface VenueCardProps {
    venue: Venue;
  }
  
  function VenueCard({ venue }: VenueCardProps) {

    const [deleteVenue] = useDeleteVenueMutation();

    const handleDelete = async () => {
        if (venue.id) {
          try {
            await deleteVenue(venue.id).unwrap();
            console.log("Venue deleted");
          } catch (error) {
            console.error("Failed to delete the venue: ", error);
          }
        }
      };
    
    return (
      <Card>
            <h2>{venue.name}</h2>
            <p>{venue.description}</p>
            <p>{venue.price}</p>
            <p>{venue.maxGuests}</p>
            <Button variant="contained" color="primary">Bookings</Button>
            <Button  variant="contained" color="primary">Edit</Button>
            <Button onClick={handleDelete} variant="contained" color="primary">Delete</Button>

      </Card>
    );
  }

export default VenueCard;