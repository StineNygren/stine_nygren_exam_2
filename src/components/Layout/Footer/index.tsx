import { Box, Typography } from '@mui/material';
import sunicon from '../../../assets/sunicon.png';

function Footer() {
    return ( 
        <Box sx={{backgroundColor: "#343434",  width: "100%"}} p={5}  display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box        sx={{
            backgroundImage: `url(${sunicon})`,
            height: '40px',
            width: '60px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',

        }}></Box>
            <Typography fontSize={25} color={"primary"}>Holidaze</Typography>
            <Typography  color={"primary"}>All rigths reserved - 2024</Typography>
        </Box>
     );
}

export default Footer;