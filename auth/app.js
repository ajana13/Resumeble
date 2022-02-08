const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const path = require('path');
const multer = require('multer');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

// eslint-disable-next-line no-unused-vars
const auth = require('./routes/auth');
const { useJwtStrategy } = require('./util/passport/index');

const app = express();
const port = process.env.PORT || 5000;

// DB Config
const mongoURI = process.env.NODE_ENV
    ? process.env.MONGO_URI
    : process.env.DEV_MONGO_URI;

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

// Passport Middleware
useJwtStrategy();
app.use(passport.initialize());
app.use(passport.session());

app.use(
    require('express-session')({
        secret: 'build',
        resave: false,
        saveUninitialized: false,
    })
);

// Multer Middleware
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: process.env.MAX_FILE_SIZE,
    },
});
app.use(multerMid.single('file'));
app.disable('x-powered-by');

// Routes
app.use('/auth', auth);
app.use(express.static('client/build'));

// Serve static assets (build folder) if in production
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`BUILD UMass server running on http://localhost:${port}`);
});
