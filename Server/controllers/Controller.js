const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/emailService');
const otpStorage = require('../utils/otpService');
const User = require('../models/user.model');
const crypto = require('crypto');// this library used for OTP validationin email
const  customerdata = {}; // Here temporary store the user(name, email, password) and otpStorage data That need verifyOTP for save  data in databases. 
// It's usually it's a bad method by redis library
// const redisClient = redis.createClient();
// redisClient.connect();


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingcustomer = await User.findOne({ // To avoid the duplication
            where: { email: req.body.email }, 
        });
        if (existingcustomer) {
            return res.json({ status: 'error', error: 'Duplicate email' });
        }
        customerdata[email] = { name, email, password };
        const otp = crypto.randomInt(100000, 999999).toString(); //Here generated random opt
        otpStorage.saveOtp(email, otp);
        await sendOTP(email, otp);

        res.json({ status: 'ok', message: 'OTP sent to your email' });
    } catch (err) {
        console.error(err);
        res.json({ status: 'error', error: 'Something went wrong' });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const storedOtp = otpStorage.getOtp(email); 

    if (!storedOtp || storedOtp.expiresAt < Date.now()) {
        return res.status(400).json({ status: 'error', error: 'OTP expired or invalid' });
    }

    if (storedOtp.otp !== otp) {
        return res.status(400).json({ status: 'error', error: 'Incorrect OTP' });
    }

    const storeddata = customerdata[email];
    const hashedPassword = await bcrypt.hash(storeddata.password, 10);//Hashing password for security
 
    
    await User.create({ //Save the data in database sql
      name: storeddata.name,     
      email: storeddata.email,    
      password: hashedPassword,
    });
    otpStorage.removeOtp(email);
    delete customerdata[email];
    res.json({ status: 'ok', message: 'Customer registered successfully' });
};

const login = async (req, res) => {
    const user = await User.findOne({
        where: { email: req.body.email }, // find email id, that in database 
    });
    if (!user) {
        return res.json({ status: 'error', error: "Invalid login" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);//here the compare the password by hashing and validating

    if (isPasswordValid) {
        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, '1234');
        return res.json({ status: 'ok', user: token });
    } else {
        return res.json({ status: 'error', user: false });
    }
};

module.exports = { register, verifyOTP, login };
