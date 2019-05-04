'use strict';
const authorizer = require('./authorizer');

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!'
    }),
  };
  callback(null, response);
};

module.exports.generateToken = (event, context, callback) => {
  const token = authorizer.generateToken(event.body);
  if (token != null) {
    console.log(token);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        token
      })
    };
    callback(null, response);
  }
    callback("Validation Error", null);
 
};

module.exports.authorize = (event, context, callback) => {
  try {
    console.log(event.authorizationToken);
    console.log(event.methodArn);

    const policy = authorizer.generatePolicy(event.authorizationToken, event.methodArn);
    callback(null, policy);
  } catch (error) {
    console.log(error.message);
    callback(error.message);
  }
};