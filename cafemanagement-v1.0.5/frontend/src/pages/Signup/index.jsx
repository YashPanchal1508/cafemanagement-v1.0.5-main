import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({ userName: '', email: '', password: '', retypePassword: '', role: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation
    if (formData.userName.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    if (formData.password.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return;
    }

    if (formData.password !== formData.retypePassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/user/CreateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName: formData.userName, password: formData.password, email: formData.email, role: formData.role })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          // Display error message received from the middleware
          toast.error(data.errors[0].msg);
        } else if (data.error) {
          toast.error(data.error)
        } else {
          // Default error message for unexpected errors
          toast.error("Error while Register User");
        }

        return;
      }

      if (response.ok) {
        // Registration successful, redirect to login page
        toast.success(data.message);
        history('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center h-screen">
      <section className="dark:bg-gray-900 w-full max-w-md">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white-A700 bg-white rounded-lg border border-gray-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                  <div className='border border-black p-2.5 rounded bg-gray-50'>
                    <input type="text" name="userName" id="text" value={formData.userName} onChange={handleChange} className="border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g John Doe" required />
                  </div>
                  <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">Role</label>
                  <div className=''>
                    <select id="role" name="role" value={formData.role} onChange={handleChange} className="border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>

                </div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <div className='border border-black p-2.5 rounded bg-gray-50'>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className='border border-black p-2.5 rounded bg-gray-50'>
                  <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                <div className='border border-black p-2.5 rounded bg-gray-50'>
                  <input type="password" name="retypePassword" id="confirm-password" value={formData.retypePassword} onChange={handleChange} placeholder="••••••••" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-400 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Create an account</button>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-light  text-gray-500 dark:text-gray-400">
                    Already have an account?
                    <NavLink to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</NavLink>
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

export default Signup;
