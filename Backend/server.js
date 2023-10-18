const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const multer = require("multer");
const app = express();
const PORT = 2909;

const mailOption = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'your email',
        pass: 'your password'
    },
    tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
    },
}

//middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(express.static('Public'));

app.listen(PORT, (err) => 
{ 
    if (err) console.error(err.message);
    console.log(`Server is running on PORT ${PORT}`)
});

// Path: Backend/server.js