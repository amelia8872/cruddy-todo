
// Todo Model //////////////////////////////////////////////////////////////////
// without .js, it finds index.js in this folder
const Todo = require('./datastore');

// Configure Express ///////////////////////////////////////////////////////////
// These lines import required modules for setting up an Express application.
/**
 * Express is a popular and widely used web application framework for Node.js. It provides a robust set of features and utilities for building web applications and APIs. Express simplifies the process of handling HTTP requests and responses, routing, middleware management, and other web-related tasks.
 * 
 */
const express = require('express');
const morgan = require('morgan');
const path = require('path');


// is creating an instance of an Express application.
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

// RESTful Routes for CRUD operations //////////////////////////////////////////

// Create (Crud) -- collection route
// Create (C) - corresponds to the HTTP POST method. It is used to create new resources on the server.
// this route handles POST requests to the '/todo' endpoint. It expects the todo text to be sent in the request body as JSON data under the property todoText. When a POST request is received, it creates a new todo item using the Todo.create() method from the 'datastore.js' module. The response will be a JSON object containing the newly created todo item if the creation is successful, or a status code 400 if there was an error during the creation process.
app.post('/todo', (req, res) => {
  Todo.create(req.body.todoText, (err, newTodo) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json(newTodo);
    }
  });
});

// Read all (cRud) -- collection route
// Read (R) - corresponds to the HTTP GET method. It is used to retrieve existing resources from the server.
app.get('/todo', (req, res) => {
  Todo.readAll((err, todos) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(todos);
    }
  });
});

// Update (U) - corresponds to the HTTP PUT or PATCH method. It is used to modify existing resources on the server.
// Read one (cRud) -- member route
app.get('/todo/:id', (req, res) => {
  Todo.readOne(req.params.id, (err, todo) => {
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.sendStatus(404);
    }
  });
});

// Delete (D) - corresponds to the HTTP DELETE method. It is used to remove existing resources from the server.
// Update (crUd) -- member route
app.put('/todo/:id', (req, res) => {
  Todo.update(req.params.id, req.body.todoText, (err, todo) => {
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.sendStatus(404);
    }
  });
});

// Delete (cruD) -- member route
app.delete('/todo/:id', (req, res) => {
  Todo.delete(req.params.id, (err) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
});

// Start & Initialize Web Server ///////////////////////////////////////////////

const port = 3000;
app.listen(port, () => {
  console.log('CRUDdy Todo server is running in the terminal');
  console.log(`To get started, visit: http://localhost:${port}`);
});

Todo.initialize();
