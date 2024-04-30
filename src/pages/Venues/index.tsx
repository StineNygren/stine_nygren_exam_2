import { useGetVenuesQuery } from "../../services/api.reducer";
import VenueCards from "../../components/VenueCards";
import { Button, Grid } from "@mui/material";
import { useState } from 'react';
import Search from "./Search";

function Venues() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useGetVenuesQuery(page);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return <div>No data</div>;


    const handleNext = () => {
        setPage(prevPage => prevPage + 1);
        console.log(page);
    }
    const handlePrevius = () => { 
        setPage(prevPage => prevPage - 1);
        console.log(page);
    }


    return ( 
    <div>      
        <h1>Venues</h1>
        <Search />
        <h2>All Listings</h2>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
        {data.map((venue) => (
                <Grid p={3} key={venue.id}>
                    <VenueCards venue={venue} />

                    
                </Grid >
            ))}
        </Grid>
        <Button variant="contained" onClick={handlePrevius} disabled={page === 1} color="primary">Previus</Button>
        <Button  variant="contained" onClick={handleNext} disabled={data.length < 50}   color="primary">Next</Button>

    </div>
  

     );
}

export default Venues;