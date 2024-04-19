import ProfileDisplay from "./ProfileDisplay";
import { token } from "../../services/localeStorage/localeStorage";
import { Box } from "@mui/material";
import { useGetProfileQuery } from "../../services/api.reducer";
import { user } from "../../services/localeStorage/localeStorage";




function Profile() {
    const { data, error, isLoading } = useGetProfileQuery(user);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return <div>No data</div>;
    console.log(token)
    return ( 
        <Box>
            <ProfileDisplay data={data} />
        </Box>
     );
}

export default Profile;