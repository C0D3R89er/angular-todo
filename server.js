const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

let Todo = require('./models/todo');
const todo = require('./models/todo');

const port = 3000;

app.use(express.static(path.join(__dirname, '/fronts/dist/fronts')));

app.use(bodyParser.urlencoded({extendedUrl:true}));
app.use(bodyParser.json());

var db = 'mongodb://localhost:27017/dbone';
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
  res.send("Hola");
});

app.get('/todos/list', (req,res) => {
  var name = req.body.name;
  Todo.find({}, name).populate({path:'list',select: 'name'}).exec((err,todo) => {
    if(err)
      console.log(err);
    res.send(todo);  
  });
})

app.post('/todos/add', (req, res) => {
  let todo = new Todo({
    name: req.body.name,
    details: req.body.details,
    contact: req.body.contact,
    senttodo: req.body.senttodo
  });
  todo.save();
});

app.put('/todos/update', (req, res) => {
  let todo = new Todo({
    name: req.body.name,
    details: req.body.details,
    contact: req.body.contact,
    senttodo: req.body.senttodo
  });
  Todo.find({}, name).updateOne(todo).then(success => console.log('Updated')).catch(err => console.log('Not updated'));
});

app.delete('/todos/delete/:name', (req, res) => {
  //var name = req.body.name;
  var name = req.params.name;
  Todo.find({}, name).deleteOne({name: name}).then(success => console.log('Found')).catch(err => console.log('Not found'));
});

app.listen(port, () => {
  console.log(`App running at port ${port}`);
});