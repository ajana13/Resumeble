const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();


// const profile = require('./routes/profile');
// app.use("/api/profile", profile);

app.use("/api/profile", require("./routes/profile"));

app.listen(PORT, () => {
  console.log(`Profile API Server is listening on ${PORT}`);
});