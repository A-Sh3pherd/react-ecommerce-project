import React from "react";
import * as AiIcons from "react-icons/ai";

export const MainNavData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome/>,
        className: "nav-text",
    },
    {
        title: "Logout",
        path: "/logout",
        icon: <AiIcons.AiOutlineLogout/>,
        className: "nav-text",
    },
];
