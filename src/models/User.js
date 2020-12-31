const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


class User extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        }, { sequelize: connection });
    }

    static async hashGenerate(password) {
        const cryptedPassword =  await bcrypt.hash(password, 10);
        return cryptedPassword;
    }
}

module.exports = User;