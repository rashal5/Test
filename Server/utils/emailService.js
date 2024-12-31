const nodemailer = require('nodemailer');
//Normally here The rashalm740@gmail.com and pass
//  were stored in a .env file But here For Testing purpose directly applyed
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "rashalm740@gmail.com",
    pass: "fxhjsfnzzwelibzp",
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Verify your email',
    text: `Welcome to our platform! our reYour OTP for registration is: ${otp}. It is valid for 5 minutes.If you did not request this, please ignore this message.`,
  });
};

module.exports = { sendOTP };
