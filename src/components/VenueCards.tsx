import { Venue } from "../types/types";
import { Box, Card, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink } from "react-router-dom";





interface VenueCardProps {
    venue: Venue;
  }
  


function VenueCards({ venue }: VenueCardProps) {

    let media;

    if (venue.media[0]) {
        media = venue.media[0].url;
    }
     else {
        media = "https://via.placeholder.com/500";
    } 
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = "https://via.placeholder.com/500";
    };
    return (
        <Card sx={{width: "253px", height: "350px"}} >
            <NavLink   to={`/venues/${venue.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box
               component="img"
               src={media}
               alt="venue media"
               sx={{height: '200px'}}
               onError={handleError}
          />
              <Typography  marginX={3} variant="h4">{venue.name}</Typography>
              <Box marginX={3} display={"flex"} justifyContent={"space-between"}>
              <Typography><LocationOnIcon fontSize="small" /> {venue.location.city || "Unknown"}</Typography>
              <Typography>{venue.price}$</Typography>
              </Box>
              </NavLink>

        </Card>
      );
}

export default VenueCards;