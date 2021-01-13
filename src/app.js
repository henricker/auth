const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

//config

    //bodyParser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //routes
    app.use(routes);


app.listen(3333, () => console.log("Server running!"));