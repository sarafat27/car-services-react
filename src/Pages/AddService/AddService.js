import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, event) => {
        const url = 'https://serene-beyond-13093.herokuapp.com/service';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
            });
        toast('service added successfully');
        event.target.reset();
    };
    return (
        <div className='w-50 mx-auto'>
            <h2>please add a service</h2>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-3' placeholder='name'  {...register("name", { required: true, maxLength: 20 })} />
                <textarea className='mb-3' placeholder='description' {...register("description")} />
                <input className='mb-3' placeholder='price' type="number" {...register("price")} />
                <input className='mb-3' placeholder='Photo URL' type="text" {...register("img")} />
                <input type="submit" value='Add service' />
            </form>
        </div>
    );
};

export default AddService;