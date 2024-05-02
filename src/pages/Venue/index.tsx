import { useParams } from 'react-router-dom';
import { useGetVenueQuery } from '../../services/api.reducer';
import Carousel from './Carousel';
import { Box } from '@mui/material';

function Venue() {
    const { id } = useParams();
    const { data, error, isLoading } = useGetVenueQuery(id || "");
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return <div>No data</div>;
    console.log(data.media);

    return ( 
        <Box maxWidth={"1200px"}  >
            <Carousel media={data.media} />
        </Box >
     );
}

export default Venue;