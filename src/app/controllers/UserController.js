const { response } = require('express');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        var { name, email, password } = req.body;
        try{
            var user = await User.findOne( { where: { email }});

            //Check if user already exists
            if(user)
                return res.status(400).send({error: "User already exists."});
            
            user = await User.create({ name, email, password });
            user.password = undefined;
            return res.send(user);
        }catch(err) {
            console.log(err);
            res.status(400).send({ error: "Create user error!"});
        }
    },

    async index(req, res) {
        try{
            const users = await User.findAll( {attributes: {exclude: ['password', 'resetPasswordToken', 'resetPasswordTokenExpires']}});
            return res.send(users);
        }catch(err) {
            return res.status(400).send({ error: "Failed connection with database"});
        }
    },


}