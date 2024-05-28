import { useSearchVenuesQuery } from "../../services/api.reducer";
import { useState } from 'react';
import VenueCards from "../../components/VenueCards";
import { Grid, Button, TextField, Box, Typography } from "@mui/material";
import beach from '../../assets/beach.png';
import { useScreenTheme } from "../../theme/screenTheme";

function Search() {
    const { isSmallScreen } = useScreenTheme();
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

    function handleSearch(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        e.preventDefault();
        const currentInputValue = (e.target as HTMLInputElement).value;
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
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} marginBottom={5}> 
        <Box display={"flex"}  flexDirection={"column"} alignItems={"center"} justifyContent={"center"}      sx={{
            backgroundImage: `url(${beach})`,
            width: '100%',
            height: '300px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>   
        <Box sx={{backgroundColor: "white"}} paddingY={2} paddingX={5} minWidth={isSmallScreen ? "100%" : "500px"}>
        <Typography fontSize={"large"}>Find your next new adventure!</Typography>
        <TextField id="search_input" sx={{width: "100%"}} label="Search.." type="text" value={search} onChange={(e) => handleSearch(e)} />
        </Box> 
        </Box> 
        <Typography m={5} variant="h1">Hotells for you!</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
        {data.length === 0 ? (
        <p>No venues by that name!</p>
        ) : (
        data.map((venue) => (
            <Grid p={3} key={venue.id}>
            <VenueCards key={venue.id} venue={venue} />
            </Grid>
        ))
        )}
        </Grid>
        <Box display={"flex"} gap={10} >
        <Button variant="contained" onClick={handlePrevius} disabled={page === 1} color="primary">Previus</Button>
        <Button  variant="contained" onClick={handleNext} disabled={data.length < 50}   color="primary">Next</Button>
        </Box>
    </Box>
     );
}

export default Search;
