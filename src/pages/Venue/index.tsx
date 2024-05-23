import { useParams } from 'react-router-dom';
import { useGetVenueQuery } from '../../services/api.reducer';
import Carousel from './Carousel';
import { Box, Grid } from '@mui/material';
import VenueTextDisplay from './VenueTextDisplay';
import CreateBooking from './CreateBooking';
import { useScreenTheme } from '../../theme/screenTheme';

function Venue() {
    const { isSmallScreen } = useScreenTheme();

    const { id } = useParams();
    const { data, error, isLoading } = useGetVenueQuery(id || "");
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return <div>No data</div>;

    return ( 
        <Grid container justifyContent="center" alignItems="center" flexDirection={"column"}>
        <Box   >
            <Carousel media={data.media} />
        </Box >
        <Box display={'flex'} flexDirection={isSmallScreen ? "column" : "row"} m={5} gap={5}>
        <VenueTextDisplay data={data} />
        <CreateBooking id={data.id} bookings={data.bookings} owner={data.owner.name} />
        </Box>

        </Grid>
     );
}

export default Venue;
