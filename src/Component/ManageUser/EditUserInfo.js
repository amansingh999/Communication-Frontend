import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from 'reactstrap';



export const EditUserInfo = ({ closePopUp, selectedData, handleSave, editOpen ,handleSubmit,handleChange}) => {


    // const [values, setValues] = useState({
    //     email: selectedData.email,
    //     username: selectedData.username,
    // });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    return (

        <Modal isOpen={editOpen} toggle={closePopUp}>

            <ModalHeader>
                <div className='loginTitle'>
                    <h1>Edit User Information</h1>
                </div>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <div className='loginform'>
                        <label for="exampleInputEmail1">Full Name</label>
                        <input name="username" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" value={selectedData.username} onChange={handleChange} />
                    </div>

                    <br></br>
                    <div className='loginform'>

                        <label for="exampleInputEmail1">Email </label>
                        <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={selectedData.email} onChange={handleChange} />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => handleSave(selectedData)} >Save</Button>
                <Button color="danger" onClick={closePopUp} >Cancel</Button>
            </ModalFooter>
        </Modal>

        // <div className='register-box'>
        //     <div className='loginFormBox'>
        //         <div className='loginTitle'>
        //             <h1>Edit User Information</h1>
        //         </div>
        //         <form onSubmit={handleSubmit}>
        //             <div className='loginform'>
        //                 <label for="exampleInputEmail1">Full Name</label>
        //                 <input name="username" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" value={values.username} onChange={handleChange} />
        //             </div>

        //             <br></br>
        //             <div className='loginform'>

        //                 <label for="exampleInputEmail1">Email </label>
        //                 <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={values.email} onChange={handleChange} />
        //             </div>

        //             <div className='loginForm'>

        //                 <button type="submit" class="btn btn-primary " onClick={() => handleSave(values)} >Save</button>
        //                 <button class="btn cancel_btn " onClick={closePopUp} >Cancel</button>

        //             </div>
        //             {/* <div>
        //                 <Button variant="contained" size="small" onClick={closePopUp}>Ok</Button>
        //                 <Button size="small" className="cancel_btn" onClick={handleSave}>Cancel</Button>
        //             </div> */}
        //         </form>
        //     </div>
        // </div>

    );
};
