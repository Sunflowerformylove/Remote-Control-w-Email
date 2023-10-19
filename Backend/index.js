const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const multer = require("multer");
const initializeApp = require('firebase/app').initializeApp;
const getDatabase = require('firebase/database').getDatabase;
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const fs = require('fs');
const { child } = require('firebase/database');
const SALT_ROUNDS = 15;
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
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAawsFpV_P2WlUnPqXoDpqGi9jqhuAkrEM",
    authDomain: "serendipity-c66d7.firebaseapp.com",
    databaseURL: "https://serendipity-c66d7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "serendipity-c66d7",
    storageBucket: "serendipity-c66d7.appspot.com",
    messagingSenderId: "356592663900",
    appId: "1:356592663900:web:387b2a25d4905a49dcd599",
    measurementId: "G-1V83BTL7TJ",
    databaseURL: "https://serendipity.firebaseio.com/"
};

const databaseInit = initializeApp(firebaseConfig);
const database = getDatabase(databaseInit);

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
app.use((request, response, next) => {
    response.status(404).json({
        // trigger react to redirect to 404 page
        status: 404,
        message: 'URL does not exist or permission denied! Please try again!'
    });
})

app.listen(PORT, (err) => {
    if (err) console.error(err.message);
    console.log(`Server is running on PORT ${PORT}`)
});

app.post('/register', (request, response) => {
    bcrypt.hash(request.body.password, SALT_ROUNDS, (err, hash) => {
        if (err){
            response.json({
                status: 400,
                message: 'Something went wrong! Please try again later!'
            })
            response.end();
            return;
        }
        database.ref('users').push({
            email: request.body.email,
            password: hash,
            role: 1,
        });
        response.json({
            status: 200,
            message: 'Register successfully!',
        })
        response.end();
    });
});

app.post('/login', (request, response) => {
    database.ref('users').orderByChild('email').equalTo(request.body.email).once('value', (snapshot) => {
        if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const user = childSnapshot.val();
                    bcrypt.compare(request.body.password, user.password, (err, result) => {
                        if (err) {
                            response.json({
                                status: 400,
                                message: 'Something went wrong! Please try again later!'
                            })
                            response.end();
                            return;
                        }
                        if (result) {
                            response.json({
                                status: 200,
                                message: 'Login successfully!',
                                data: {
                                    email: user.email,
                                    role: user.role,
                                }
                            })
                            response.end();
                        } else {
                            response.json({
                                status: 401,
                                message: 'Password is incorrect!',
                            })
                            response.end();
                        }
                    })
                })
        } else {
            response.json({
                status: 400,
                message: 'Email does not exist!',
            })
        }
    })
})

// Path: Backend/server.js