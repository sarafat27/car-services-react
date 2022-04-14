import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'
const Register = () => {
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login')
    }

    const handleRegister = event => {
        event.preventDefault();
    }

    return (
        <div className='register-form'>
            <h2 className='text-center mt-3 '>Please register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder='Your Name' />
                <input type="email" name="email" id="" placeholder='email address' required />
                <input type="password" name="password" id="" placeholder='password' required />
                <input type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link to='/login' className='text-success pe-auto text-decoration-none' onClick={navigateLogin}>Please login...</Link></p>
        </div>
    );
};

export default Register;