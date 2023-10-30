const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const MailComposer = require('nodemailer/lib/mail-composer');
const bcrypt = require('bcrypt');
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const OAuth2Client = google.auth.OAuth2Client;
const fs = require('fs');
const session = require('express-session');
const SALT_ROUNDS = 15;
const app = express();
const PORT = 3001;
const SCOPES = ['https://mail.google.com/']
const TOKEN_PATH = path.join(__dirname, 'Token/token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'Token/credentials.json');
const GMAIL_CLIENT_ID = JSON.parse(fs.readFileSync(CREDENTIALS_PATH)).web.client_id;
const GMAIL_CLIENT_SECRET = JSON.parse(fs.readFileSync(CREDENTIALS_PATH)).web.client_secret;
const GMAIL_REFRESH_TOKEN = "1//04FLNfW1nEh4wCgYIARAAGAQSNwF-L9Ir9bBpoj60Bgjl9ozBoaCVjV2oWVbRHU7WuLqZnZAHa-64MHMrshDcT5NG32nlakwa7hg"

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.promises.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

async function saveCredentials(client) {
    const content = await fs.promises.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.promises.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

// Create O2Auth2 client with the given credentials, and then execute the given callback function.
const userOauth2Client = new OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
);

userOauth2Client.setCredentials({
    refresh_token: GMAIL_REFRESH_TOKEN
});

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
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
        secure: false,
        httpOnly: false,
    }
}))

app.listen(PORT, (err) => {
    if (err) console.error(err.message);
    console.log(`Server is running on PORT ${PORT}`)
});

app.post('/api/sendMail', async (request, response) => {

    // try {
    //     const email = request.body.sender;
    //     const subject = request.body.subject;
    //     const cmdArg = request.body.cmdArg;
    //     const command = request.body.command;
    //     const ACCESS_TOKEN = await userOauth2Client.getAccessToken();
    //     const TOKEN = ACCESS_TOKEN?.token;
    //     console.log(command, cmdArg, subject, email);
    //     const transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             type: 'OAuth2',
    //             user: email,
    //             clientId: GMAIL_CLIENT_ID,
    //             clientSecret: GMAIL_CLIENT_SECRET,
    //             refreshToken: GMAIL_REFRESH_TOKEN,
    //             accessToken: TOKEN,
    //         },
    //     });
    //     const mailOptions = {
    //         from: "atwohohoho@gmail.com",
    //         to: email,
    //         subject: subject,
    //         html: `<div>${command}</div>
    //             <br>
    //             <div>${cmdArg}</div>
    //             <br>
    //         `,
    //         priority: 'high',
    //     };
    //     transporter.sendMail(mailOptions, (err, info) => {
    //         if (err) console.log(err.message);
    //         else console.log(info);
    //     });
    //     response.status(200).json({ message: "Email sent successfully", status: 200 });
    // }
    // catch {
    //     console.log("Error sending email");
    //     response.status(500).json({ message: "Error sending email", status: 500 });
    // }
    const gmail = google.gmail({ version: 'v1', auth: userOauth2Client });
    const email = request.body.sender;
    const subject = request.body.subject;
    const cmdArg = request.body.cmdArg;
    const command = request.body.command;
    const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: Buffer.from(
                `From: ${email}\n` + 
                `To: atwohohoho@gmail.com\n` +
                `Subject: ${subject}\n\n` +
                `${command}\n` +
                `${cmdArg}`
            ).toString('base64')
        }
    });
    console.log(res.data.id);
    response.status(200).json({ message: "Email sent successfully", status: 200 });
});