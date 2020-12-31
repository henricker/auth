const User = require('../models/User');

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
                password // User.hashGenerate(password)
            });
            
            user.password = undefined;
            return response.send(user);
        }catch(err) {
            return response.status(400).send({error: "Registration failed"});
        }
    }
}