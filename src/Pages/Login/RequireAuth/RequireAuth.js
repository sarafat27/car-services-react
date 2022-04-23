import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth)
    const location = useLocation();
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        return <div className="text-center">
            <ToastContainer></ToastContainer>
            <h3 className='text-danger'>Your email is not verified</h3>
            <h4 className='text-success'>please verify your email address</h4>
            <button
                className="btn btn-primary"
                onClick={async () => {
                    await sendEmailVerification();
                    toast('Sent email');
                }}
            >
                send verification email again
            </button>
        </div>
    }
    return children;
};

export default RequireAuth;