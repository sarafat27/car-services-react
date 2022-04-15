import React from 'react';
import google from '../../../images/social/google.png'
import facebook from '../../../images/social/facebook.png'
import github from '../../../images/social/GitHub.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    let errorElement;
    if (error || error1) {
        errorElement = <p className='text-danger'>Error: {error?.message} {error1?.message}</p>
    }

    if (user || user1) {
        navigate('/home')
    }

    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '2px' }} className='bg-primary w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '2px' }} className='bg-primary w-50'></div>
            </div>
            {errorElement}
            <div>
                <button
                    onClick={() => signInWithGoogle()}
                    className='btn btn-success d-block w-50 rounded-pill my-3 mx-auto'>
                    <img width={25} src={google} alt="" />
                    <span className='px-2'>Sign in with google</span>
                </button>
                <button className='btn btn-success d-block w-50 rounded-pill my-3 mx-auto'>
                    <img width={25} src={facebook} alt="" />
                    <span className='px-2'>Sign in with facebook</span>
                </button>
                <button
                    onClick={() => signInWithGithub()}
                    className='btn btn-success d-block w-50 rounded-pill my-3 mx-auto'>
                    <img width={25} src={github} alt="" />
                    <span className='px-2'>Sign in with github</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;