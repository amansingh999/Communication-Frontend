import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../Redux/Slice';



const Welcome = () => {

    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.user.loggedInUser);

    // const [userName, setUserName] = useState("");

    // useEffect(() => {
    //     const user = setUserName(loggedInUser[0]?.username);
    //     dispatch(setLoggedInUser(user));
    // }, []);

    return (
        <div className=''>
            <div>
                <h1>Login Successful!!</h1>
            </div>
            <div>
                <p>Welcome! {loggedInUser[0]?.username}</p>
            </div>
        </div>
    );
};

export default Welcome;



