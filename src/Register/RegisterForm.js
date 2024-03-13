import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import {
    Validation,
    isConfirmPasswordValid,
    isEmailValid,
    isPasswordValid,
    isUserValid,
} from '../LoginValidation/Validation';
import { getLocalStorage, setLocalStorage } from '../Common/Storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../Redux/Slice';
import { userRegister } from '../API/services';


export const RegisterForm = () => {

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);

    const [values, setValues] = useState({
        username: '',
        password: '',
        email: '',
        conpassword: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        email: '',
        conpassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
    };

    const handleRegister = async (e) => {

        if (
            isUserValid(values) &&
            isEmailValid(values) &&
            isPasswordValid(values) &&
            isConfirmPasswordValid(values)
        ) {
            const data = {
                username: values.username,
                email: values.email,
                password: values.password
            }
            let resp = await userRegister(data);
            resp = await resp.json();
            if(resp.status === 200 && resp.error){
                swal('Oops!', "User Already Exists!!", 'error');
                return;
            }
            swal("Congrats!", "You have sucessfully registered!", "success");
            navigate('/');
           
            // const userid = userData.filter(e => e.email === values.email);
            // if (userid?.length > 0) {
            //     swal('Oops!', "User Already Exists!!", 'error');
            //     return;
            // }
            // const finalData = { ...values, id: userData.length + 1 }
            // // userData.push(finalData);
            // const updatedUserData = [...userData, finalData];
            // // setLocalStorage('userData', userData);
            // dispatch(setUserData(updatedUserData));

            // swal("Congrats!", "You have sucessfully registered!", "success");
            // navigate('/');
        }

    };



    return (
        <div className='register-box'>
            <div className='loginFormBox'>
                <div className='loginTitle'>
                    <h1>WELCOME</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='loginform'>
                        <label for="exampleInputEmail1">Username</label>
                        <input name='username' type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" value={values.username} onChange={handleChange} />
                    </div>

                    {errors.username && (
                        <p style={{ color: 'red', fontSize: '13px' }}>{errors.username}</p>
                    )}

                    <br></br>
                    <div className='loginform'>

                        <label for="exampleInputEmail1">Email address</label>
                        <input name='email' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={values.email} onChange={handleChange} />
                    </div>

                    {errors.email && (
                        <p style={{ color: 'red', fontSize: '13px' }}>{errors.email}</p>
                    )}

                    <br></br>
                    <div className='loginform'>

                        <label for="exampleInputPassword1">Password</label>
                        <input name='password' type="password" class="form-control" id="exampleInputPassword1" value={values.password} onChange={handleChange} />
                    </div>

                    {errors.password && (
                        <p style={{ color: 'red', fontSize: '13px' }}>{errors.password}</p>
                    )}

                    <br></br>
                    <div className='loginform'>

                        <label for="exampleInputPassword1">Confirm Password</label>
                        <input name='conpassword' type="password" class="form-control" id="exampleInputPassword1" value={values.conpassword} onChange={handleChange} />
                    </div>

                    {errors.conpassword && (
                        <p style={{ color: 'red', fontSize: '13px' }}>
                            {errors.conpassword}
                        </p>
                    )}

                    <br></br>
                    <div className='loginForm'>

                        <button type="submit" class="btn btn-primary " onClick={handleRegister} >Register</button>
                        <p>
                            Already have an account?
                            <Link to='/' class='link'>
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
