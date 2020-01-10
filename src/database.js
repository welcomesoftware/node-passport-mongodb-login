const mongoose = require('mongoose');
const { mongodb } = require('./keys');


const mongoConnection= mongoose.connect(mongodb.URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('Database is connected on port', mongodb.PORT))
    .catch(err => console.error(err));






module.exports = mongoConnection;
