const express = require('express');
const morgan = require('morgan');

const app = express();

//importing routes
const userRoutes = require('./routes/users')

// config enviroments
require('dotenv').config();

// connection to database
require('./connection')

// settings
app.set('port', process.env.PORT);

// route base
app.get('/', (req, res) => {
  res.send('Welcome API REST ExpresJS MongoDB.')
})

// middlewares
app.use(morgan('dev'));
app.use(express.json())

// all routes
app.use('/users', userRoutes)

// starting the server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}.`);
});

