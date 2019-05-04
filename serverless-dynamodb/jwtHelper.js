'use strict';

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey';
var jsonToSign = {hash:'mypassword',docNumber:'42052757'};

/*var token = jwt.sign(jsonToSign, SECRET_KEY, { expiresIn: 60});
console.log("token : " + token);*/
var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoIjoibXlwYXNzd29yZCIsImRvY051bWJlciI6IjQyMDUyNzU3IiwiaWF0IjoxNTU2OTQ5MjI4LCJleHAiOjE1NTY5NDkyODh9.xmVJzzs4iN8JgQ1wMeW5vNBofrqdV7teN1QBryQJLuU";
var decoded = jwt.verify(token, SECRET_KEY);

console.log(decoded);