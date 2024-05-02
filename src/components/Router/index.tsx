import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Venues from "../../pages/Venues";
import Venue from "../../pages/Venue";
import Profile from "../../pages/Profile";
import CreateVenue from "../../pages/CreateVenue";

const Router = createBrowserRouter([
    {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "login",
            element: <Login />
        },

        {
            path: "home",
            element: <Home /> ,

        },
        {
            path: "venues",
            element: <Venues /> ,

        },
        {
            path: "/venues/:id",
            element: <Venue/>
        },
        {
            path: "profile",
            element: <Profile />
        },
        {
            path: "create venue",
            element: <CreateVenue />
        },

        {
            path: "*",
            element: <h1>Not Found</h1>
        },

    ]
}]);

export default Router;
