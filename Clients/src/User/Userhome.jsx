import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function UserHome() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = jwtDecode(token);  ////From Webtoken Decode the user data
        
        if (!user) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          const { name, email } = user;//from Decode user object Retrieving email and name from the user 
        setUserDetails({ name, email }); 
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const gologout = () => {
    localStorage.removeItem('token');
    navigate('/login');

  };
  

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl">
       
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800">Welcome, {userDetails.name}!</h1>
          <p className="text-xl text-gray-600 mt-2">We're glad to have you here.</p>
        </div>

       
        <div className=" p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Your Information</h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-gray-600">Name:</span> {userDetails.name}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-gray-600">Email:</span> {userDetails.email}
            </p>
          </div>
        </div>

       
        <div className="mt-6 text-center">
          <button onClick={gologout} className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
          logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
