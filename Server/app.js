const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const sequelize = require('./config/database');
const Routes = require('./routes/Routes');

app.use(cors())//It give  a permission to the react app the in other port
app.use(express.json());


sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error:', err));

app.use('/api/user', Routes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
