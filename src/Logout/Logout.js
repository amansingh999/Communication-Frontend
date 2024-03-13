import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../Common/Storage";

export const LogOut = () => {
    const[logOutUser, setLogOutUser] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = getLocalStorage('loggedInUser') ? JSON.parse(getLocalStorage('loggedInUser')) : [];
        setLogOutUser(loggedInUser[0]?.username)
        navigate("/");
    }, [])

    return(
        <>
          <div >Log Out {logOutUser} </div>
        </>
    )
}