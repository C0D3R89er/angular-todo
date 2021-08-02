const mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    name: String,
    details: String,
    contact: String
});

module.exports = mongoose.model('Todo', todoSchema, 'todos');

