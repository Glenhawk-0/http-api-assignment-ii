// do html 
// function to handle the index page
// i dont think we need this. at least not here

const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`); 

//
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};


module.exports = {
  getIndex,
};