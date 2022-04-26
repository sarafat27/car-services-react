import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetail';

const CheckOut = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);
    /* const [user, setUser] = useState({
        name: 'Md. Arafat Sunny',
        email: 'arafatsunny44@gmail.com',
        address: '162,mdpur,ctg',
        phone: '01711881722'
    });

    const handleAddressChange = event => {
        const { address, ...rest } = user;
        const newAddress = event.target.value;
        const newUser = { address: newAddress, ...rest };
        setUser(newUser)
    } */

    const handlePlaceOrder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('http://localhost:5000/order', order)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    toast('your order is booked');
                    event.target.reset()
                }
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please order: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className="w-100 mb-3" type="text" value={user?.displayName} name='name' placeholder='name' required readOnly disabled />
                <br />
                <input className="w-100 mb-3" type="email" value={user?.email} name='email' placeholder='email' required readOnly disabled />
                <br />
                <input className="w-100 mb-3" type="text" value={service.name} name='service' placeholder='service' required readOnly />
                <br />
                <input className="w-100 mb-3" type="text" name='address' placeholder='address' autoComplete='off' required />
                <br />
                <input className="w-100 mb-3" type="text" name='phone' placeholder='phone' required />
                <br />
                <input className='w-100 btn btn-primary' type="submit" value="Place order" />
            </form>
        </div>
    );
};

export default CheckOut;