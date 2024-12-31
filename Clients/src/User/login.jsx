import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {//If a user Already Login (web token that available in a browserstore 4kb),Then it return to the home page of user 
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = jwtDecode(token);
        
        if (!user) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          alert('You are already logged in. You need to log out first.');
          navigate('/home');
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

  async function LoginUser(event) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.user) {
        alert('Login successful!');
        localStorage.setItem('token', data.user);
        window.location.href = '/home'; //If successfully matches data it redirected to the user home page
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  }

  return (
    <div className="bg-transparent">
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={LoginUser}
          className="sign-in-form flex flex-col items-center justify-center p-8 transition-all duration-700 ease-in-out w-full max-w-md rounded-lg shadow-xl"
        >
          <h2 className="title text-3xl text-gray-700 mb-4">Sign In</h2>

          <div className="input-field w-full bg-gray-100 mb-4 p-4 rounded-full flex items-center">
            <i className="fas fa-user text-gray-400 mr-2"></i>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none text-lg text-gray-700 w-full"
            />
          </div>

          <div className="input-field w-full bg-gray-100 mb-4 p-4 rounded-full flex items-center">
            <i className="fas fa-lock text-gray-400 mr-2"></i>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-lg text-gray-700 w-full"
            />
          </div>

          <input
            type="submit"
            value="Login"
            className="btn w-36 bg-blue-500 text-white py-2 rounded-full uppercase font-semibold mb-4 cursor-pointer hover:bg-blue-600"
          />

          <p className="social-text text-center text-gray-600 mb-4">
            Or <Link to="/Register" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>

          <p className="social-text text-center text-gray-600 mb-2 text-sm">Contact Me On</p>

          <div className="social-media flex justify-center">
           
            <a
              href="https://github.com/rashal5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-icon w-12 h-12 flex items-center justify-center text-gray-700 border border-gray-700 rounded-full mr-2 hover:text-blue-500 hover:border-blue-500"
            >
              <FaGithub />
            </a>

           
            <a
              href="mailto:muhammedrashalm@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="social-icon w-12 h-12 flex items-center justify-center text-gray-700 border border-gray-700 rounded-full mr-2 hover:text-blue-500 hover:border-blue-500"
            >
              <FaEnvelope />
            </a>

            
            <a
              href="https://www.linkedin.com/in/rashal5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-icon w-12 h-12 flex items-center justify-center text-gray-700 border border-gray-700 rounded-full mr-2 hover:text-blue-500 hover:border-blue-500"
            >
              <FaLinkedin />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
