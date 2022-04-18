import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Register.css'
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../Shared/loading/Loading';
import PageTitle from '../../Shared/PageTitle/PageTitle';
const Register = () => {
    const [agree, setAgree] = useState(false)
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login')
    }
    if (user) {
        console.log('user', user)
    }

    if (loading || updating) {
        return <Loading></Loading>
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        // const agree = event.target.terms.checked
        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName: name });
        console.log('Updated profile', name);
        navigate('/home')
    }

    return (
        <div className='register-form'>
            <PageTitle title="Register"></PageTitle>
            <h2 className='text-center text-primary mt-3 mb-4 '>Please register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder='Your Name' />
                <input type="email" name="email" id="" placeholder='email address' required />
                <input type="password" name="password" id="" placeholder='password' required />
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                {/* <label className={agree ? 'text-primary ms-2' : 'text-danger ms-2'} htmlFor="terms">Accept terms and conditions</label> */}
                <label className={`ms-2 ${agree ? 'text-primary' : 'text-danger'}`} htmlFor="terms">Accept terms and conditions</label>
                <input
                    disabled={!agree}
                    className='btn btn-primary mt-3'
                    type="submit"
                    value="Register" />
            </form>
            <p>Already have an account? <Link to='/login' className='text-primary pe-auto text-decoration-none' onClick={navigateLogin}>Please login</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;