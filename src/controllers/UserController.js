const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

module.exports = {
    async createUser(request, response) {
        try {
            var { name, email, password } = request.body;
            if(await User.findOne({where: { email }}))
                return response.status(400).send({error: "Email alredy exists "});
            
            password = await User.hashGenerate(password);

            const user = await User.create({
                name,
                email,
                password
            });
            
            user.password = undefined;
            return response.send({
                user,
                token: generateToken({ id: user.id }),
            });

        }catch(err) {
            return response.status(400).send({error: "Registration failed"});
        }
    },

    async authenticateUser(request, response) {
        const { email, password } = request.body;

        const user = await User.findOne({ where: { email }});

        //First, check if exists email in database
        if(!user)
            return response.status(400).send({ error: "User not found"});
        
        //Now, we go compare if password digited of the user is the same as the password in database
        if(! await bcrypt.compare(password, user.password))
            return response.status(400).send({ error: "Password does not a match"});
        
        user.password = undefined;

        return response.send({
            user,
            token: generateToken({ id: user.id }),
        });
    }
}