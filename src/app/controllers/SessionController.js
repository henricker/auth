const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = require('../../config/auth').secret;
const mailer = require('../../modules/mailer');
function generateToken(params = {}) {
    return jwt.sign(params, secret)
}

module.exports = {

    async login(req, res) {
        
        try{
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email }});

            if(!user)
                return res.status(400).send({ error: "User not found"});
        
            if(!user.validPassword(password))
                return res.status(400).send({ error: "Password incorrect"});
            
            user.password = undefined;
            user.resetPasswordToken = undefined;
            user.resetPasswordTokenExpires = undefined;

            return res.send({
                user,
                token: generateToken({id: user.id})
            })
        }catch(err) {
            return res.status(400).send({ error: "Login failed"});
        }
    },

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            let user = await User.findOne({ where: { email } });

            if(!user)
                return res.status(400).send({ error: "User not found" });
            
            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            user.resetPasswordToken = token;
            user.resetPasswordTokenExpires = now;

            user.save();

            //send token to email of user
            mailer.sendMail({
                to: email,
                from: "henricker666@gmail.com",
                template: 'forgotPassword',
                context: { token }
            }, (err) => {
                if(err){
                    console.log(err);
                    return res.status(400).send({ error: "Cannot send forgot password email"});
                }
                return res.send({ ok: "Email sended with sucessfully!"});
            });

        }catch(err) {
            return res.status(400).send({ error: "Error on forgot password, try again" });
        }
    },

    async resetPassword(req, res) {
        const { email, token, newPassword } = req.body;

        let user = await User.findOne( { where: { email } } );

        if(!user)
            return res.status(400).send( { error: "User not found" } );
        
        
        if(token !== user.resetPasswordToken)
            return res.status(400).send( { error: "Token invalid" } );

        const now = new Date();
        
        if(now > user.resetPasswordTokenExpires)
            return res.status(400).send( { error: "Token expired, generate a new one" } );
        
        user.password = newPassword;
        use.updatedAt = now;

        user.save();

        return res.send( { ok: "Your password were settings with sucessfully" } );

    }
    
}