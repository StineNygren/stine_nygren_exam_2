import ProfileDisplay from "./ProfileDisplay";
import { Box } from "@mui/material";
import { useGetProfileQuery } from "../../services/api.reducer";
import { user } from "../../services/localeStorage/localeStorage";
import VenueDisplay from "./VenueDisplay";
import { useScreenTheme } from "../../theme/screenTheme";




function Profile() {
    const { isSmallScreen } = useScreenTheme();
    const { data, error, isLoading } = useGetProfileQuery(user);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    if (!data) return <div>No data</div>;

    return ( 
        <>
        <Box
        component="img"
        src={data?.banner.url}
        alt={data?.banner.alt}
        sx={{
            height: '300px',
            objectFit: 'cover',
            width: '100%',
            maxWidth: "1800px",
        }}
        />
        <Box display={"flex"} flexDirection={isSmallScreen ? "column" : "row"}>
            <ProfileDisplay data={data} />
            <VenueDisplay data={data} />
        </Box>
        </>
     );
}

export default Profile;