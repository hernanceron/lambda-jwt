'use strict'
var AWS = require("aws-sdk");

var getInformationFile = function(nameFile, callback){
    const bucket_name = "web-42052757-us-west-2";
    var params = {
        Bucket : bucket_name,
        Key: nameFile
    };
    var s3 = new AWS.S3();
    s3.getObject(params, callback);
}

module.exports = {
    getInformation : getInformationFile
}