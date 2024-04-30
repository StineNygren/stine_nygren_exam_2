import { useGetVenuesQuery } from "../../services/api.reducer";
import VenueCards from "../../components/VenueCards";
import { Grid } from "@mui/material";

function Venues() {
    const { data, error, isLoading } = useGetVenuesQuery();
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return <div>No data</div>;
    console.log(data);


    return ( 
    <div>      
        <h1>Venues</h1>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
        {data.map((venue) => (
                <Grid p={3} key={venue.id}>
                    <VenueCards venue={venue} />

                    
                </Grid >
            ))}
        </Grid>

    </div>
  

     );
}

export default Venues;