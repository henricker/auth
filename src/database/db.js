const Sequelize = require('sequelize');
const dbConfig = require('../config/dbConfig.json');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

User.init(connection);

module.exports = connection;