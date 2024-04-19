import { Avatar, Box, Card } from "@mui/material";
import { useGetProfileQuery } from "../../services/api.reducer";
import { user } from "../../services/localeStorage/localeStorage";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ProfileResponse } from "../../types/types";

interface ProfileDisplayProps {
    data: ProfileResponse; // specify that data is of type ProfileResponse
  }

function ProfileDisplay({ data }: ProfileDisplayProps) {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));



    return ( 
        <Box display={"flex"} flexDirection={"column"} alignItems={isSmallScreen ? "center" : "flex-start"}>
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
        <Card  sx={{ maxWidth: 345, backgroundColor: "white", marginTop: '-50px', padding: 5, marginX: 5 }}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>

                <Avatar src={data?.avatar.url} alt={data?.avatar.alt} sx={{ width: 56, height: 56 }}/>
                <h1>{data?.name}</h1>
                <p>{data?.email}</p>
                <p>{data?.bio}</p>
            </Box >
        </Card>
        </Box>

     );
}

export default ProfileDisplay;