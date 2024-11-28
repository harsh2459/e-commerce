import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {

    const [currentState, setCurrentState] = useState('Login');

        const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: ''
        });
    
        const onSubmitHandler = async (e) => {
            e.preventDefault();
            const url = currentState === 'Login' ? 'http://localhost:3000/user_login' : 'http://localhost:3000/add_user'; // Replace with your actual API endpoints
    
            try {
                const response = await axios.post(url, formData);
                console.log('Response:', response.data);
                // Handle successful response (e.g., redirect, show success message, etc.)
            } catch (error) {
                console.error('Error:', error);
                // Handle error (e.g., show error message)
            }
        };
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className=' border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        {currentState === 'Login' ? null : 
            <input 
                className='w-full px-3 py-2 border border-gray-800' 
                type="text" 
                name="name" 
                placeholder='Name' 
                required 
                value={formData.name} 
                onChange={handleChange} 
            />
        }
        <input 
            className='w-full px-3 py-2 border border-gray-800' 
            type="email" 
            name="email" 
            placeholder='Email' 
            required 
            value={formData.email} 
            onChange={handleChange} 
        />
        <input 
            className='w-full px-3 py-2 border border-gray-800' 
            type="password" 
            name="password" 
            placeholder='Password' 
            required 
            value={formData.password} 
            onChange={handleChange} 
        />
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p className='cursor-pointer'>Forgot your password?</p>
            {
                currentState === 'Login'
                    ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
                    : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login here</p>
            }
        </div>
        <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>
            {currentState === 'Login' ? 'Sign in' : 'Sign up'}
        </button>
    </form>
    )
}

export default Login
