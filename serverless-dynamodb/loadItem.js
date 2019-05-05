var AWS = require("aws-sdk");

AWS.config.update({
  //endpoint: "http://192.168.99.100:8000",
  region: process.env.REGION_NAME
});



var getUser = function(hash, docNumber, callback) {
	var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
	var params = {
        TableName : process.env.TABLE_NAME,
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