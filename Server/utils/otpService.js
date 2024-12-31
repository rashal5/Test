const otpStorage = {};

const saveOtp = (email, otp) => {
  otpStorage[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // OTP expires in 5 minutes
};

const getOtp = (email) => otpStorage[email];

const removeOtp = (email) => {
  delete otpStorage[email];
};

module.exports = { saveOtp, getOtp, removeOtp };
