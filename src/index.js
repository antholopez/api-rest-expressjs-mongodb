const express = require('express');
const router = express.Router();
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

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))

// route base
app.get('/', (req, res) => {
  res.send('Welcome API REST ExpresJS MongoDB.')
})

// all routes
app.use('/users', userRoutes)

// starting the server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}.`);
});

