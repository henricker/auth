const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

//config
    
    //config body-parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    //config routes
    app.use(routes);

    //Running database
    require('./database/db');


//Open server in localhost 3333 port
app.listen(3333, () => console.log("Server running!"));