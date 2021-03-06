const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const PORT = process.env.PORT || 3001;
const app = express();

// DB Config
const mongoURI = process.env.NODE_ENV
    ? process.env.MONGO_URI
    : process.env.DEV_MONGO_URI;

console.log(mongoURI)
// Connect to MongoDB
mongoose
.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// eslint-disable-next-line no-console
.then(() => console.log('MongoDB successfully connected'))
// eslint-disable-next-line no-console
.catch((err) => console.log(err));

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
const routes = require('./routes');
app.use('/api/routes', routes);
app.use(express.static('client/build'));

// app.use("/api/profile", require("./routes/profile"));

app.listen(PORT, () => {
  console.log(`Profile API Server is listening on ${PORT}`);
});