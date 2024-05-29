import { Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import CreateVenueForm from "./CreateVenueForm";
import { useCreateVenueMutation } from "../../services/api.reducer";
import { Venue } from "../../types/types";

function CreateVenue() {
    const [createVenue] = useCreateVenueMutation();
    const navigate = useNavigate();
    
const onSubmit = async (data: Partial<Venue>) => {
    try {

            const response = await createVenue(data);
                // @ts-ignore
            const venueId = response?.data?.data?.id;
            if(venueId){
                            navigate(`/venues/${venueId}`); 
            }else{
                console.log("Failed to create venue: ", response);
            }
 
        } catch (error) {
            console.error("Failed to create venue: ", error);
        }
    }

    return ( 
        <Box m={5} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <h1>Create Venue</h1>
            <CreateVenueForm onSubmit={onSubmit}/>
        </Box >
     );
}

export default CreateVenue;