import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const history = useNavigate();

  const [credentials, setCredentials] = useState({ userName: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // Redirect to home page if a valid token is found
      history('/dashboard');
    }
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/user/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.userName, password: credentials.password }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        toast.error(errorMessage.error)
        return;
      }

      const data = await response.json();

      if (response.ok) {
        toast.success('User logged in successfully');

        localStorage.setItem('authToken', data.authToken);
        localStorage.setItem('expiresAt', Date.now());
        localStorage.setItem('UserDetails', JSON.stringify(credentials));
        // Redirect to home page after successful login
        history('/dashboard');
      } else {
        // Login failed
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Failed to login. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center h-screen">
      <section className="dark:bg-gray-900 w-full max-w-md">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="bg-white-A700 w-full bg-white rounded-lg border border-gray-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login to an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <div className='border border-black p-2.5 rounded bg-gray-50'>
                  <input type="email" name="userName" id="email" value={credentials.userName} onChange={handleChange} className="border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className='border border-black p-2.5 rounded bg-gray-50'>
                  <input type="password" name="password" id="password" value={credentials.password} onChange={handleChange} placeholder="••••••••" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Login</button>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Not have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> <NavLink to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</NavLink></a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
