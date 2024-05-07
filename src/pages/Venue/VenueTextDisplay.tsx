import { Typography, Rating, Box } from "@mui/material";
import { Venue } from "../../types/types";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PetsIcon from '@mui/icons-material/Pets';

interface VenueTextDisplayProps {
    data: Venue;
}

function VenueTextDisplay( { data }: VenueTextDisplayProps) {


    return ( 
        <Box maxWidth={"500px"}>
            <h1>{data.name}</h1>
            <Typography><LocationOnIcon /> {data.location.address}</Typography>
            <Rating name="read-only" value={data.rating} readOnly />
            <Typography>{data.description}</Typography>
            {data.meta.wifi && <Typography><RssFeedIcon /> Wifi</Typography>}
            {data.meta.parking && <Typography><LocalParkingIcon /> Parking</Typography>}
            {data.meta.breakfast && <Typography><RestaurantIcon /> Breakfast</Typography>}
            {data.meta.pets && <Typography><PetsIcon /> Pet Friendly</Typography>}
            <Typography>Price: {data.price}$</Typography>
        </Box>
     );
}

export default VenueTextDisplay;