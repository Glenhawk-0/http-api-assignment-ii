// i used piceces of code from the week 3 examples as a baseline.
// ill be honest though, i like... kinda half understand how it works.
// i apologize.
//const { constants } = require('buffer');
//const fs = require('fs'); // pull in the file system module
//const { request } = require('http');
//const { title } = require('process');

// Load our index fully into memory.
// THIS IS NOT ALWAYS THE BEST IDEA.
// We are using this for simplicity. Ideally we won't have
// synchronous operations or load entire files into memory.
//const index = fs.readFileSync(`${__dirname}/../client/client.html`);

//____________________

// function to send response // add status and remove the 200 default there.
const respond = (request, response, content, type, statusCode) => {
  // set status code (200 success) and content type
// response.writeHead(200, {

  response.writeHead(statusCode, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  // write the content string or buffer to response
  response.write(content);
  // send the response to the client
  response.end();

  if (response === "farmine"){
    response.write (request);
  }
};

//____________________

//created a funtion to make it so that i dont have to keep rewriting stuff For XML
const createXML = (sentObj, success) =>{ 
  //check for success of failure. 
  if (success === true){
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${sentObj.message}</message>`;
    responseXML = `${responseXML} <id>${sentObj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return (responseXML);

  } else {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${sentObj.message}</message>`;
    responseXML = `${responseXML} <id>${sentObj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return (responseXML);
  } 
}//end createXML

//____________________


// success
const getSuccess = (request, response) => {
  // object to send
  const objectToSend = {
    id: 'Success',
    message: 'This is a successfull response',
     statusCode: 200,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (request.acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    const responseXML =  createXML(objectToSend, true);

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', objectToSend.statusCode);
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const responseJson = JSON.stringify({ message: objectToSend.message, id: objectToSend.id,});

  // return response passing json and content type
  return respond(request, response, responseJson, 'application/json', objectToSend.statusCode);
};// end of getSuccess


// bad Request
const getBadRequest = (request, response) => {
  // object to send
  let objectToSend;
  
  //querystuff
  if(request.query.valid === 'true'){

    objectToSend = {
    id: 'badRequest',
    message: 'This request has the required parameters',
     statusCode: 200,
  };
    

  }else{

   objectToSend = {
    id: 'badRequest',
    message: 'Missing valid query parameter set to true',
     statusCode: 400,
  };

  }


  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (request.acceptedTypes[0] === 'text/xml') { 
  const responseXML =  createXML(objectToSend, false);
    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', objectToSend.statusCode);
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const responseJson = JSON.stringify({ message: objectToSend.message, id: objectToSend.id,});

  // return response passing json and content type
  return respond(request, response, responseJson, 'application/json', objectToSend.statusCode);
};// end of getBadRequest

// Unauthorized
const getUnauthorized = (request, response) => {
  // object to send
  let objectToSend ;


    //querystuff
  if(request.query.loggedIn === 'yes'){

    objectToSend = {
    id: 'unauthorized',
    message: 'You are Logged in',
     statusCode: 200,
  };
    

  }else{

   objectToSend = {
    id: 'unauthorized',
    message: 'Missing loggedIn query parameter set to yes',
     statusCode: 400,
  };

  }
  

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (request.acceptedTypes[0] === 'text/xml') { 
  const responseXML =  createXML(objectToSend, false);
    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', objectToSend.statusCode);
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const responseJson = JSON.stringify({ message: objectToSend.message, id: objectToSend.id,});

  // return response passing json and content type
  return respond(request, response, responseJson, 'application/json', objectToSend.statusCode);
};// end of getUnauthorized

// forbidden
const getForbidden = (request, response) => {
  // object to send
  const objectToSend = {
    id: 'forbidden',
    message: 'You do not have access to this content.',
    statusCode: 403,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (request.acceptedTypes[0] === 'text/xml') { 
  const responseXML =  createXML(objectToSend, false);
    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', objectToSend.statusCode);
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const responseJson = JSON.stringify({ message: objectToSend.message, id: objectToSend.id,});

  // return response passing json and content type
  return respond(request, response, responseJson, 'application/json', objectToSend.statusCode);
};// end of getForbidden

// Internal
const getInternal = (request, response) => {
  // object to send
  const objectToSend = {
    id: 'internalError',
    message: 'The server encountered an internal error. Please try again later.',
    statusCode: 500,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (request.acceptedTypes[0] === 'text/xml') { 
  const responseXML =  createXML(objectToSend, false);
    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', objectToSend.statusCode);
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const responseJson = JSON.stringify({ message: objectToSend.message, id: objectToSend.id,});

  // return response passing json and content type
  return respond(request, response, responseJson, 'application/json', objectToSend.statusCode);
};// end of getInternal

// not Implemented
const getNotImplemented = (request, response) => {
  // object to send
  const objectToSend = {
    id: 'notImplemented',
    message: 'A request for this resource has not yet been implemented.',
    statusCode: 501,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (request.acceptedTypes[0] === 'text/xml') { 
  const responseXML =  createXML(objectToSend, false);
    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', objectToSend.statusCode);
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const responseJson = JSON.stringify({ message: objectToSend.message, id: objectToSend.id,});

  // return response passing json and content type
  return respond(request, response, responseJson, 'application/json', objectToSend.statusCode);
};// end of getNotImplemented

// not found
const getNotFound = (request, response) => {
  // object to send
  const objectToSend = {
    id: 'notFound',
    message: 'The page you are looking for was not found.',
    statusCode: 404,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (request.acceptedTypes[0] === 'text/xml') { 
  const responseXML =  createXML(objectToSend, false);
    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml', objectToSend.statusCode);
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const responseJson = JSON.stringify({ message: objectToSend.message, id: objectToSend.id,});

  // return response passing json and content type
  return respond(request, response, responseJson, 'application/json', objectToSend.statusCode);
};// end of getNotImplemented/



//____________________

// exports to set functions to public.
// In this syntax, you can do getCats:getCats, but if they
// are the same name, you can short handle to just getCats,
// change this to the statuses we need.

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,/**/
};