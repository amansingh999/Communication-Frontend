import React, { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../Common/Storage';
import { EditUserInfo } from './EditUserInfo';
import { DeletePopup } from '../../Popup/DeletePopup';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser, setUserData } from '../../Redux/Slice';




const ManageUser = () => {
    const [DeleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    // const [userData, setUserData] = useState([]);   
    // const [loggedInUser, setLoggedInUser] = useState([]);

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user.userData);
    const loggedInUser = useSelector((state) => state.user.loggedInUser);

    useEffect(() => {
        // const storedUsers = getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')) : [];
        // setUserData(storedUsers);
        dispatch(setUserData(userData));

        // const loggedInUser = getLocalStorage('loggedInUser') ? JSON.parse(getLocalStorage('loggedInUser')) : [];
        // setLoggedInUser(loggedInUser);
        dispatch(setLoggedInUser(loggedInUser));
    }, []);


    const toggleEdit = (item) => {
        setEditOpen(true);
        setSelectedData(item);
        setDeleteOpen(false);
    }

    const toggleDelete = (item) => {
        setDeleteOpen(true);
        setSelectedData(item);
        setEditOpen(false);
    };

    const handleSave = (value) => {
        const updatedUsers = userData.map(user => {
            if (user.id == selectedData?.id) {
                // user.username = value.username;
                // user.email = value.email;
                return {
                    ...user,
                    username: value.username,
                    email: value.email
                };
            }
            return user;
        });
        dispatch(setUserData(updatedUsers));
        // setLocalStorage('userData', updatedUsers);
        if (loggedInUser.length && loggedInUser[0].email == selectedData.email) {
            // const loggedUser = { ...loggedInUser };
            // loggedUser[0].email = value.email;
            // loggedUser[0].username = value.username;
            // setLocalStorage('loggedInUser', loggedUser)
            const loggedUser = [{
                ...loggedInUser[0],
                email: value.email,
                username: value.username
            }];
            dispatch(setLoggedInUser(loggedUser));
        }
        setEditOpen(false);
    }

    const handleDelete = () => {
        const updatedUsers = userData.filter(user => user.id !== selectedData.id);
        // setUserData(updatedUsers);
        // setLocalStorage('userData', updatedUsers);
        dispatch(setUserData(updatedUsers));
        setDeleteOpen(false);

    }

    const closePopUp = () => {
        setDeleteOpen(false);
        setEditOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        setSelectedData({ ...selectedData, [e.target.name]: e.target.value })
    };

    return (
        <>
            <div >
                <h1 className='heading'>Users</h1>
            </div>
            <div>
                <Table bordered hover className='customTable'>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">User Email ID</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((item, index) =>
                            <tr key={item?.id}>
                                <td>{item?.username}</td>
                                <td>{item?.email}</td>
                                <td>
                                    <Button variant="outline-dark" className="btn" onClick={() => toggleEdit(item)}>Edit</Button>
                                    {!loggedInUser.length || loggedInUser[0].email !== item.email ? (

                                        <Button
                                            variant="outline-dark"
                                            className="btn"
                                            onClick={() => toggleDelete(item)}
                                        >
                                            Delete
                                        </Button>
                                    ) : (

                                        <Button
                                            variant="outline-dark"
                                            className="btn"
                                            disabled
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>

            <DeletePopup
                closePopUp={closePopUp}
                open={DeleteOpen}
                handleDelete={handleDelete} />


            <EditUserInfo
                editOpen={editOpen}
                closePopUp={closePopUp}
                selectedData={selectedData}
                handleSave={handleSave}
                handleSubmit={handleSubmit}
                handleChange={handleChange} />

        </>

    );
};

export default ManageUser;



