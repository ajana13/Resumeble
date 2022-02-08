# Resumeble

Amazon S3 API server

# Run the API Server

Production:\
`npm start`

Development with nodmon:\
`npm run start_dev`

# Routes

Upload file\
Request: POST\
Route: http://localhost:3001/api/s3/routes/upload

Read file\
Request: GET\
Route: http://localhost:3001/api/s3/routes/readfile

Delete file\
Request: DELETE\
Route: http://localhost:3001/api/s3/routes/deletefile