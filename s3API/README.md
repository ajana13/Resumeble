# Resumeble

Amazon S3 API server

# Running the API Server

## Creating the Environment

1. Create the config folder: s3API\config
2. Create the .env file and fill it with Mongo Atlas credentials, use port 3002
3. Create the s3config.json file and fill it with
```
{ 
    "accessKeyId": "accessKeyId",
    "secretAccessKey": "secretAccessKey",
    "region": "us-east-1", 
    "S3_BUCKET_NAME": ""
}
```
4. Place both the .env and s3config.json file in s3API\config file
# Run the s3 API Server
Production:\
```
npm start
```

Development with nodmon:\
```
npm run start_dev`
```
# Routes

## Upload file\
```
Request: POST\
Route: http://localhost:3002/api/s3/routes/upload
```
## Read file\
```
Request: GET\
Route: http://localhost:3002/api/s3/routes/readfile
```

## Delete file\
```
Request: DELETE\
Route: http://localhost:3002/api/s3/routes/deletefile
```