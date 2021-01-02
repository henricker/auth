const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig.json');

module.exports = (request, response, next) => {

    const authHeader = request.headers.authorization;
    
    //First, check if authHeader were provided
    if(!authHeader)
        return response.status(401).send({error: "No token provided"});
    
    //Second, check if the token have the same formatted than: Bearer  ahsdasyd9821760921dhnasndlkasjdpo01
    const parts = authHeader.split(' ');
  
    if(!(parts.length === 2))
        return response.status(401).send({error: "Token error"});
    
    const [ schema, token ] = parts;
    
    //Thirty, check if schema == Bearer
    if(!/^Bearer$/i.test(schema))
        return response.status(401).send({error: "Token malformatted"});
    
    //Finaly, check if the token is valid
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
            return response.status(401).send({error: "Token invalid"});
        
        //Now, after next() i have access to the user id
        request["userId"] = decoded.id;

        return next();
    })

}