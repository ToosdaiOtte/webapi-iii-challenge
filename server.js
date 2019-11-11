const express = require('express');
// const helmet = require('helmet');
// const morgan = require('morgan');
const userRouter = require('./users/userRouter.js');

const server = express();

server.use(express.json());

server.use('/users', userRouter);
// server.use(helmet());
// server.use(morgan('dev'));
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request, ${req.url}`, Date.now());
  next();
};

module.exports = server;