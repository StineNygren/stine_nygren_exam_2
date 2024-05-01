import { useSearchVenuesQuery } from "../../services/api.reducer";
import { useState } from 'react';
import VenueCards from "../../components/VenueCards";
import { Grid } from "@mui/material";


function Search() {
    const [search, setSearch] = useState("");
    const [param, setParam] = useState("");
    
   
    const { data = [], error, isLoading } = useSearchVenuesQuery(param);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return <div>No data</div>;

    function handleSearch(e: any) {
        e.preventDefault();
        const currentInputValue = e.target.value;
    
        if (currentInputValue === ""){
            setSearch("");
            setParam("");
        } else {
            setSearch(currentInputValue);
            setParam(`/search?q=${currentInputValue}`);
        }
    }
    

    return ( 
    <div>      
        <h2>Search</h2>
        <input type="text" value={search} onChange={(e) => handleSearch(e)} />
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