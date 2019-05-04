var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://192.168.99.100:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Users",
    Item: {
        'hash': {S: 'mypassword'},
        'docNumber': {S: '42052757'},
        'textHtml': {S: 'test.html'}
    }
};

dynamodb.putItem(params, function(err, data) {
    if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
});