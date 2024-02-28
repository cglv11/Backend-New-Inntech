// Import Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('./../database/config.db').sequelize;

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true, 
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
    }
}, {
    
    tableName: 'users', 
    timestamps: false, 
});

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password; 
    return values;
};

module.exports = User;
