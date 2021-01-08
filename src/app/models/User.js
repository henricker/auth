const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const connection = require('../../database');

const User = connection.define('User', 
    {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        resetPasswordToken: DataTypes.STRING,
        resetPasswordTokenExpires: DataTypes.DATE,
    },
    { 
        hooks: {
            beforeCreate: async (user) => {
                try{
                    const salt = await bcrypt.genSaltSync();
                    user.password = await bcrypt.hashSync(user.password, salt);
                }catch(err) {
                    console.log(err);
                }
            },

            beforeUpdate: async(user) => {
                try{
                    const salt = await bcrypt.genSaltSync();
                    user.password = await bcrypt.hashSync(user.password, salt);
                }catch(err) {
                    console.log(err);
                }
            }
        },
        freezeTableName: true,
    }
);

//Instance method
User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password) ? true : false;
}


module.exports = User;

// User.beforeCreate(async (user, options) => {
//     const hashPassword = await bcrypt.hashSync(user.password, 10);
//     user.password = hashPassword;
// });