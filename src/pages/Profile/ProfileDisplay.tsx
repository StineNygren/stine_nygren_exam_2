import { Avatar, Box, Chip, Card, Typography } from "@mui/material";
import { useScreenTheme} from "../../theme/screenTheme";
import { ProfileResponse } from "../../types/types";
import EditProfile from "./EditProfile";

interface ProfileDisplayProps {
    data: ProfileResponse; 
    refetch: () => void;
  }

function ProfileDisplay({ data, refetch }: ProfileDisplayProps) {

    const { isSmallScreen } = useScreenTheme();

    return ( 
        <Box display={"flex"} flexDirection={"column"} alignItems={isSmallScreen ? "center" : "flex-start"}>

        <Card  sx={{ maxWidth: 345, backgroundColor: "white", marginTop: '-50px', padding: 5, marginX: 5 }}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>

                <Avatar  src={data?.avatar.url} alt={data?.avatar.alt} sx={{ width: 100, height: 100, marginBottom: 3  }}/>
                {data?.venueManager && <Chip label="Venue Manager" color="primary" />}
                <h1>{data?.name}</h1>
                <Typography>{data?.email}</Typography>
                <Typography>{data?.bio}</Typography>

                <EditProfile profile={data} refetch={refetch}/>
            </Box >
        </Card>
        </Box>
     );
}

export default ProfileDisplay;
