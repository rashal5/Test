const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // import the sequelize//

const User = sequelize.define('Customer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'user',  // table name in database //
    timestamps: false,      
});


module.exports = User;
