import { Avatar, Box,  Card, Typography } from "@mui/material";
import { useScreenTheme} from "../../theme/screenTheme";
import { ProfileResponse } from "../../types/types";

import BasicModal from "../../components/BasicModal";

interface ProfileDisplayProps {
    data: ProfileResponse; 
  }

function ProfileDisplay({ data }: ProfileDisplayProps) {

    const { isSmallScreen } = useScreenTheme();





    return ( 
        <Box display={"flex"} flexDirection={"column"} alignItems={isSmallScreen ? "center" : "flex-start"}>

        <Card  sx={{ maxWidth: 345, backgroundColor: "white", marginTop: '-50px', padding: 5, marginX: 5 }}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>

                <Avatar src={data?.avatar.url} alt={data?.avatar.alt} sx={{ width: 100, height: 100 }}/>
                <h1>{data?.name}</h1>
                <Typography>{data?.email}</Typography>
                <Typography>{data?.bio}</Typography>

                <BasicModal />
            </Box >
        </Card>
        </Box>

     );
}

export default ProfileDisplay;