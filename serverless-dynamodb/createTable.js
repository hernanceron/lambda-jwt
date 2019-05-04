var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://192.168.99.100:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Users",
    KeySchema: [       
        { AttributeName: "hash", KeyType: "HASH"},  //Partition key
        { AttributeName: "docNumber", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "hash", AttributeType: "S" },
        { AttributeName: "docNumber", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});