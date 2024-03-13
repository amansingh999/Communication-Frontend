import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Validation,
    isEmailValid,
    isPasswordValid,
} from '../LoginValidation/Validation';
import { getLocalStorage, setLocalStorage } from '../Common/Storage';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from '../Redux/Slice';
import { loginUser } from '../API/services';


export const LoginForm = () => {

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    // const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // const handleRememberMeChange = (event) => {
    //     setRememberMe(event.target.checked);
    // };

    const handleLogin = async () => {
        setErrors(Validation(values));

        if (!isEmailValid(values) || !isPasswordValid(values)) {
            return;
        }
        // let userData = getLocalStorage('userData') ? JSON.parse(getLocalStorage('userData')) : [];

        const data = {
            email: values.email,
            password: values.password
        }
        let resp = await loginUser(data);
        resp = await resp.json();
        if(resp.status === 200 && !resp.error){
            swal("Congrats!", "You have sucessfully Login!", "success");
            setLocalStorage('loggedInUser',values.email)
            navigate('/dashboard');
        }else {
            swal('Oops!', 'Incorrect Email or Password!', 'error');
            return;
        }
    };

    return (
        <div className='login-box'>
            <div className='loginFormBox'>
                <div className='loginTitle'>
                    <h1>SIGN IN</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='loginform'>
                        <label for="exampleInputEmail1">Email address</label>
                        <input name='email' type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={values.email} onChange={handleChange} />
                    </div>

                    {errors?.email && (
                        <p style={{ color: 'red', fontSize: '13px' }}>{errors?.email}</p>
                    )}
                    <br></br>

                    <div className='loginform password-field'>
                        <label for="exampleInputPassword1">Password</label>
                        <input name='password' type="password" class="form-control" id="exampleInputPassword1" value={values.password} onChange={handleChange} />

                        {errors?.password && (
                            <p style={{ color: 'red', fontSize: '13px' }}>
                                {errors?.password}
                            </p>
                        )}
                        <br></br>
                        <br></br>
                        {/* 
                        <div>
                            <label htmlFor='rememberMe'>
                                <input
                                    type='checkbox'
                                    id='rememberMe'
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                                Remember me
                            </label>
                        </div> */}

                        {/* <div>
                            <Link to='/forgotpassword' className='link forgotPass'>
                                Forgot Password?
                            </Link>
                        </div> */}
                    </div>

                    <div className='loginForm'>

                        <button type="submit" class="btn btn-primary " onClick={handleLogin}>Log In</button>
                        <p>
                            Don't have an account?
                            <Link to='/register' class='link'>
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
