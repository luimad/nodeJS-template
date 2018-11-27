
const mongoose = require('mongoose');

URI = 'mongodb://localhost:27017/escuelas';
mongoose.connect(URI)
    .then(db => console.log("mongodb conectado"))
    .catch(err => console.error(err))

module.exports = mongoose;