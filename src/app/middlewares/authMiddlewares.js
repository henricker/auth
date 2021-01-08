const jwt = require('jsonwebtoken');
const secret = require('../../config/auth').secret;

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    //Check if exists one token
    if(!authHeader)
        return res.status(401).send({ error: "No token provided"});

    // check if token have the same format than: Bearer 1298asdhalkdh871yskljdhaoius 
    const parts = authHeader.split(' ');

    //Chekc if parts have exactly two parts( schema and token)
    if(!parts.length === 2)
        return res.status(401).send({ error: "Token error"});
    

    const [ schema, token ] = parts;
    
    //Check if schema have "Bearer"
    if(!/^Bearer$/i.test(schema))
        return res.status(401).send({ error: "Token malformatted"});
    
    // Now, verify if token is valid
    jwt.verify(token, secret, (err, decoded) => {
        if(err)
            return res.status(401).send({ error: "Token invalid"});
        
        //Generate key "userId" with value id in request to use in routes
        req["userId"] = decoded.id;
        return next();
    });

}