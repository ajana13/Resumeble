# Resumeble

profile API server

# Run the API Server

Production:
`npm start`

Development with nodmon:
`npm run start_dev`

# Routes

Update or Create if profile doesn't exist
    Request: POST
    Route: http://localhost:3001/api/profile/createProfile/userID

Read Profile
    Request: GET 
    Route: http://localhost:3001/api/routes/getProfile/userID

Delete Profile
    Request: DELETE
    Route: http://localhost:3001/api/routes/deleteProfile/userID