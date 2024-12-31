import { useState } from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function requestOtp(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        setOtpSent(true);
      } else {
        setError(data.message || 'Failed to send OTP. Please check your email and internet connection.');
      }
    } catch (err) {
      setError('An error occurred while requesting OTP.');
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/user/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        navigate('/login');
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('An error occurred while verifying OTP.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-80 flex items-center justify-center z-50">
          <p className="text-xl font-semibold text-gray-700">Sending OTP... Please wait.</p>
        </div>
      )}

      {!otpSent ? (
        <div className="bg-transparent">
          <div className="flex justify-center items-center min-h-screen">
            <form
              onSubmit={requestOtp}
              className="sign-in-form flex flex-col items-center justify-center p-8 transition-all duration-700 ease-in-out w-full max-w-md rounded-lg shadow-xl"
            >
              <h2 className="title text-3xl text-gray-700 mb-4">Sign Up</h2>

              <div className="input-field w-full bg-gray-100 mb-4 p-4 rounded-full flex items-center">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="bg-transparent outline-none text-lg text-gray-700 w-full"
                  required
                />
              </div>

              <div className="input-field w-full bg-gray-100 mb-4 p-4 rounded-full flex items-center">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="bg-transparent outline-none text-lg text-gray-700 w-full"
                  required
                />
              </div>

              <div className="input-field w-full bg-gray-100 mb-4 p-4 rounded-full flex items-center">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="bg-transparent outline-none text-lg text-gray-700 w-full"
                  required
                />
              </div>

              <input
                type="submit"
                value="Send OTP"
                disabled={loading}
                className="btn w-36 bg-blue-500 text-white py-2 rounded-full uppercase font-semibold mb-4 cursor-pointer hover:bg-blue-600"
              />

              {error && <p className="text-center text-red-600 mb-2 text-lg">{error}</p>}

              <p className="text-center text-gray-600 mb-4">
                Or{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Sign in
                </Link>
              </p>

              <p className="text-center text-gray-600 mb-2 text-sm">Contact Me On</p>

              <div className="social-media flex justify-center">
                <a
                  className="w-12 h-12 flex items-center justify-center text-gray-700 border border-gray-700 rounded-full mr-2 hover:text-blue-500 hover:border-blue-500"
                  href="https://github.com/rashal5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  className="w-12 h-12 flex items-center justify-center text-gray-700 border border-gray-700 rounded-full mr-2 hover:text-blue-500 hover:border-blue-500"
                  href="mailto:muhammedrashalm@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
                <a
                  className="w-12 h-12 flex items-center justify-center text-gray-700 border border-gray-700 rounded-full mr-2 hover:text-blue-500 hover:border-blue-500"
                  href="https://www.linkedin.com/in/rashal5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-transparent">
          <div className="flex justify-center items-center min-h-screen">
            <form
              onSubmit={verifyOtp}
              className="sign-in-form flex flex-col items-center justify-center p-8 transition-all duration-700 ease-in-out w-full max-w-md rounded-lg shadow-xl"
            >
              <h2 className="title text-3xl text-gray-700 mb-4">Verify OTP</h2>

              <div className="input-field w-full bg-gray-100 mb-4 p-4 rounded-full flex items-center">
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  type="text"
                  placeholder="Enter OTP"
                  className="bg-transparent outline-none text-lg text-gray-700 w-full"
                  required
                />
              </div>

              <input
                type="submit"
                value="Verify OTP"
                disabled={loading}
                className="btn w-36 bg-blue-500 text-white py-2 rounded-full uppercase font-semibold mb-4 cursor-pointer hover:bg-blue-600"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
