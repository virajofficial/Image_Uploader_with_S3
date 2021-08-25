require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')


const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
})

function uploadFile(files){
    for(var i=0;i<files.length; i++ ){
        const fileStream = fs.createReadStream(files[i].path)

        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: files[i].filename
        }

        s3.upload(uploadParams).promise()
    }
    
}
exports.uploadFile = uploadFile

function removeFiles(files){
    for(var i=0;i<files.length; i++ ){
        const deleteParams = {
            Bucket: bucketName,
            Key: files[i].filename
        }

        s3.deleteObject(deleteParams, function(err, data){
            if(err)
                console.log(err, err.stack);
            else
                console.log("file deleted successfully...");
        })
    }
}
exports.removeFiles = removeFiles
