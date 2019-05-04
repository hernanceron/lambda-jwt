var AWS = require("aws-sdk");

AWS.config.update({
  //endpoint: "http://192.168.99.100:8000",
  region: "us-west-2"
});



var getUser = function(hash, docNumber, callback) {
	var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
	var params = {
        TableName : "Users",
        Key: {
            'hash': hash,
            'docNumber':docNumber
        }
    };

	docClient.get(params, callback);
};
module.exports = {
    getUser : getUser
}