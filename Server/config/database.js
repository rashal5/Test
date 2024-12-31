const { Sequelize } = require('sequelize');

// Initial Sequelize with database //
//Normally here The database Local hostage, database name and password
//  were stored in a .env file But here For Testing purpose directly applyed
const sequelize = new Sequelize('demotest', 'root', '', { 
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, 
    define: {
        timestamps: false, 
    },
});

// Authenticate connection to the database error handleing //
sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.error('Database connection error:', err.message);
        
    });

module.exports = sequelize;


