import { Box } from "@mui/material";
import CreateVenueForm from "./CreateVenueForm";
import { useCreateVenueMutation } from "../../services/api.reducer";

function CreateVenue() {
    const [createVenue] = useCreateVenueMutation();
    return ( 
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <h1>Create Venue</h1>
            <CreateVenueForm onSubmit={(data) => createVenue(data)}/>
        </Box >
     );
}

export default CreateVenue;