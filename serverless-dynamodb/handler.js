'use strict';
const authorizer = require('./authorizer');
const itemDb = require('./loadItem');
const bucketHelper = require('./bucketHelper');

module.exports.hello = (event, context, callback) => {
  var htmlText = event.requestContext.authorizer.htmlText;
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      htmlText: htmlText,
      message: 'Go Serverless v1.0! Your function executed successfully!'
    }),
  };
  callback(null, response);
};

module.exports.getInformation = (event, context, callback) => {
  var htmlText = event.requestContext.authorizer.htmlText;
  bucketHelper.getInformation(htmlText, function(err, data){
    if(err) callback("Error en getInformation: " +err.message, null);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: data.Body.toString('base64')
      }),
    };
    callback(null, response);
  });
};
module.exports.generateToken = (event, context, callback) => {
  var json = JSON.parse(event.body); 
  let hash = json.hash;
  let docNumber = json.docNumber;  
  itemDb.getUser(hash,docNumber, function(err,data){
    if(err)
      callback("Error en getUser " + err.message,null);
    else{
      if(data.Item){
        const token = authorizer.generateToken(event.body);        
        const response = {
          statusCode: 200,
          body: JSON.stringify({
            token
          })
        };
        callback(null, response);       
      }        
      else{
        const response = {
          statusCode: 401,
          body: JSON.stringify({
            "message" : "No tiene permiso"
          })
        };
        callback(null, response);
      }   
    }
  });
};

module.exports.authorize = (event, context, callback) => {
  try {
    console.log(event.authorizationToken);
    console.log(event.methodArn);
    var decodedToken = authorizer.decodeToken(event.authorizationToken);    
    let hash = decodedToken.hash;
    let docNumber = decodedToken.docNumber;   
    itemDb.getUser(hash, docNumber, function(err, data) {
      let htmlText = data.Item.htmlText;      
      const policy = authorizer.generatePolicy(event.authorizationToken, event.methodArn, htmlText);
      callback(null, policy);
    });    
  } catch (error) {
    console.log(error.message);
    callback(error.message);
  }
};