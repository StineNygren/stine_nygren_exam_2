import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function Layout() {
    return ( 
        <Box display={"flex"} flexDirection={"column"}  minHeight={"100vh"}>
            <Header/>
            <Outlet />
            <Box mt="auto">
                <Footer/>
            </Box>
        </Box>
       
     );
}

export default Layout;