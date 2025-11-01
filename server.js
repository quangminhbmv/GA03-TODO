const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Sample data
const todos = [
  { id: 1, title: 'Đi chợ', completed: false },
  { id: 2, title: 'Học bài', completed: true },
  { id: 3, title: 'Làm deadline', completed: false },
];

// Route to render products with EJS
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const todo = {
    ...req.body,
    id: todos.length + 1,
  };
  todos.push(todo);
  res.json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = req.body;
  const id = req.params.id;
  const found = todos.find(t => t.id === parseInt(id));
  found.completed = todo.completed;
  res.json(found);
});

app.get('/todos', (req, res) => {
  res.render('todos', { title: 'TODO list' });
});

// Root route
app.get('/', (req, res) => {
  res.render('index', { title: 'TODO', message: 'Welcome to the TODO app!' });
});

app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex(t => t.id === parseInt(id));
  if (index !== -1) {
    const deleted = todos.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).send('Todo not found');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});