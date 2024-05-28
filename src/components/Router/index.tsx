import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Venue from "../../pages/Venue";
import Profile from "../../pages/Profile";
import CreateVenue from "../../pages/CreateVenue";
import Success from "../../pages/Success";

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
            path: "",
            element: <Home /> ,

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
            path: "success",
            element: <Success />
        },

        {
            path: "*",
            element: <h1>Not Found</h1>
        },

    ]
}]);

export default Router;
