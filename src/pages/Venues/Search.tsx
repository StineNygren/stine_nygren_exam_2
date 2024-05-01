import { useSearchVenuesQuery } from "../../services/api.reducer";
import { useState } from 'react';
import VenueCards from "../../components/VenueCards";
import { Grid, Button, TextField } from "@mui/material";


function Search() {
    const [search, setSearch] = useState("");
    const [param, setParam] = useState("?");
    const [page, setPage] = useState(1);
    
   
    const { data = [], error, isLoading } = useSearchVenuesQuery({ search: param, page: page });
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

    function handleSearch(e: any) {
        e.preventDefault();
        const currentInputValue = e.target.value;
        setPage(1);
    
        if (currentInputValue === ""){
            setSearch("");
            setParam("?");
        } else {
            setSearch(currentInputValue);
            setParam(`/search?q=${currentInputValue}&`);
        }
    }
    

    return ( 
    <div>      
        <h2>Search</h2>
        <TextField label="Search.." type="text" value={search} onChange={(e) => handleSearch(e)} />
        <Grid container spacing={2} justifyContent="center" alignItems="center">
        {data.map((venue) => (
                        <Grid p={3} key={venue.id}>
            <VenueCards key={venue.id} venue={venue} />
        </Grid>
        )) }
        </Grid>
        <Button variant="contained" onClick={handlePrevius} disabled={page === 1} color="primary">Previus</Button>
        <Button  variant="contained" onClick={handleNext} disabled={data.length < 50}   color="primary">Next</Button>
    </div>
     );
}

export default Search;