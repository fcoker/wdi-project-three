const express = require('express');
const app = express();

//sham's code
console.log('testing for merge conflicts');

const { port } = require('./config/environment');
// Grant starting here
const test = function() {
  return console.log('Hello');
};



app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express is running on port ${port}`));

module.exports = app;
