import React, { useState } from 'react';
import { Link } from 'react-router-dom';



export const ForgotPasswordForm = () => {
    const [values, setValues] = useState({
        password: '',
        email: '',
        conpassword: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        conpassword: '',
    });

    

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    

    return (
        <div className='login-box'>
            <div className='loginFormBox'>
                <div className='loginTitle'>
                    <h1>Forgot Password</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='loginform'>
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={values.email} onChange={handleChange} />
                    </div>

                    {errors?.email && (
                        <p style={{ color: 'red', fontSize: '13px' }}>{errors?.email}</p>
                    )}
                    <br></br>
                    <div className='loginform'>
                    <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" value={values.password} onChange={handleChange} />
                    </div>

                    {errors?.password && (
                        <p style={{ color: 'red', fontSize: '13px' }}>{errors?.password}</p>
                    )}
                    <br></br>
                    <div className='loginform'>
                    <label for="exampleInputPassword1">Confirm Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" value={values.conpassword} onChange={handleChange} />
                    </div>

                    {errors?.conpassword && (
                        <p style={{ color: 'red', fontSize: '13px' }}>
                            {errors?.conpassword}
                        </p>
                    )}
                    <br></br>
                    <div className='loginForm'>
                        
                         <button type="submit" class="btn btn-primary " >Update Password</button>
                        <p>
                        Return to login page..
                            <Link to='/' class='link'>
                            Login{' '}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
