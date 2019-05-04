'use strict';

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mysecretkey';

module.exports.generatePolicy = (token, methodArn,htmlText) => {
    var decodedToken = this.decodeToken(token);
    if ( decodedToken != null) {
        console.log('yep');
        return generatePolicy('user','Allow', methodArn, htmlText);
    } else {
        console.log('fallo');
        const error = new Error('Unauthorized');
        throw error;
    }
};

module.exports.generateToken = jsonToSign => {
    var json = JSON.parse(jsonToSign);
    var token = jwt.sign(jsonToSign, SECRET_KEY, { expiresIn: '1h'});
    console.log(token);
    return token;  
};

module.exports.decodeToken = token => {
    try {
        var decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        return decoded;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Help function to generate an IAM policy
var generatePolicy = function(principalId, effect, resource, htmlText) {
    var authResponse = {};
    
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {
        "htmlText": htmlText        
    };
    return authResponse;
}