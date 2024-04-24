import { Box } from "@mui/material";
import CreateVenueForm from "./CreateVenueForm";
function CreateVenue() {
    return ( 
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <h1>Create Venue</h1>
            <CreateVenueForm />
        </Box >
     );
}

export default CreateVenue;