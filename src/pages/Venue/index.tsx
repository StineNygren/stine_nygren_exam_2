import { useParams } from 'react-router-dom';
import { useGetVenueQuery } from '../../services/api.reducer';

function Venue() {
    const { id } = useParams();
    const { data, error, isLoading } = useGetVenueQuery(id || "");
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return <div>No data</div>;
    console.log(data);

    return ( 
        <div>
            Venue
        </div>
     );
}

export default Venue;