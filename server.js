const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();
server.use(express.json());

server.use(morgan('dev'));
server.use(helmet());
server.use(logger);
server.use(isMelon("hello"));

server.use('/api/hubs', hubsRouter);

server.get('/', addName, (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  console.log('req.name: ', req.name);

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function addName(req, res, next) {
  req.name = 'Web 28';
  next();
};

function logger (req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;

  console.log(`method: ${method} endpoint: ${endpoint}`);
  next();
};

function isMelon(password){
  return (req, res, next) => {
    req.query.pass === password
    ?next()
    :res.status(400).json({ message: "please provide the correct pass." })
  }
}

module.exports = server;
