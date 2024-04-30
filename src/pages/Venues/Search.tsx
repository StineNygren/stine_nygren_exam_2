import { useSearchVenuesQuery } from "../../services/api.reducer";
import { useState } from 'react';
import VenueCards from "../../components/VenueCards";
import { Grid } from "@mui/material";

function Search() {
    const [search, setSearch] = useState("Disney");
   
    const { data = [], error, isLoading } = useSearchVenuesQuery(search);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return <div>No data</div>;
    

    return ( 
    <div>      
        <h2>Search</h2>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
        {data.map((venue) => (
                        <Grid p={3} key={venue.id}>
            <VenueCards key={venue.id} venue={venue} />
        </Grid>
        )) }
        </Grid>
    </div>
     );
}

export default Search;