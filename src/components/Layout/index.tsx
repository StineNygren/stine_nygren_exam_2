import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
    return ( 
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh' }}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
       
     );
}

export default Layout;