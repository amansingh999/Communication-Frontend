import React from 'react';
import { Outlet, Link } from 'react-router-dom';



export const NavBar = () => {

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active" style={{ marginRight: "100px", marginLeft: "180px" }}>
                            <Link to='/groupchat' className='nav-link '>
                                Group Chat
                            </Link>
                        </li>
                        <li class="nav-item" style={{ marginRight: "180px" }}>
                            <Link to='/manageuser' className='nav-link '>
                                Manage Users
                            </Link>
                        </li>
                        <li class="nav-item" style={{ marginRight: "180px" }}>
                            <Link to='/managedocument' className='nav-link '>
                                Manage Documents
                            </Link>
                        </li>
                        <li class="nav-item" style={{ marginRight: "180px" }}>
                            <Link to='/' className='nav-link '>
                                LogOut
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* <div className="container mt-4">
                <Outlet />
            </div> */}
        </>

    );
};
