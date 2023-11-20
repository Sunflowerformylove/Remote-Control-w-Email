const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const OAuth2Client = google.auth.OAuth2Client;
const fs = require('fs');
const session = require('express-session');
const { get } = require('http');
const app = express();
const PORT = 3001;
const SCOPES = ['https://mail.google.com/']
const TOKEN_PATH = path.join(__dirname, 'Token/token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'Token/credentials.json');
const GMAIL_CLIENT_ID = JSON.parse(fs.readFileSync(CREDENTIALS_PATH)).web.client_id;
const GMAIL_CLIENT_SECRET = JSON.parse(fs.readFileSync(CREDENTIALS_PATH)).web.client_secret;
const GMAIL_REFRESH_TOKEN = "1//04FLNfW1nEh4wCgYIARAAGAQSNwF-L9Ir9bBpoj60Bgjl9ozBoaCVjV2oWVbRHU7WuLqZnZAHa-64MHMrshDcT5NG32nlakwa7hg"

// Create O2Auth2 client with the given credentials, and then execute the given callback function.
const userOauth2Client = new OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
);

userOauth2Client.setCredentials({
    refresh_token: GMAIL_REFRESH_TOKEN
});

async function getAuthClient() {
    const auth = await authenticate({
        keyfilePath: CREDENTIALS_PATH,
        scopes: SCOPES,
    })
    return auth;
}

async function getEmailAddress(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.getProfile({
        userId: 'me',
    });
    return res.data.emailAddress;
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
    const auth = await getAuthClient();
    const gmail = google.gmail({ version: 'v1', auth: userOauth2Client });
    const email = request.body.sender;
    const subject = request.body.subject;
    const cmdArg = request.body.cmdArg;
    const command = request.body.command;
    // if (fs.existsSync(path.join(__dirname, `Token/${request.body.sender}.json`))) {
    //     console.log("Token found!");
    //     try {
    //         const content = fs.readFileSync(`${request.body.sender}.json`);
    //         const credential = JSON.parse(content);
    //         auth = new OAuth2Client(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET);
    //         auth.setCredentials(credential);
    //         console.log(auth);
    //     } catch (err) {
    //         response.json({ message: "Cannot validate user!", status: 401 })
    //     }
    // }
    // else {
    //     console.log("No token found!");
    //     try {
    //         auth = await getAuthClient();
    //         const content = fs.readFileSync(CREDENTIALS_PATH);
    //         const keys = JSON.parse(content);
    //         const key = keys.web;
    //         const payload = JSON.stringify({
    //             type: 'authorized_user',
    //             client_id: key.client_id,
    //             client_secret: key.client_secret,
    //             refresh_token: GMAIL_REFRESH_TOKEN,
    //         });
    //         fs.writeFileSync(path.join(__dirname, `Token/${request.body.sender}.json`), payload);
    //     } catch (err) {
    //         response.json({ message: "Cannot authorize user!", status: 401 })
    //     }
    // }
    // try {
        const res = await gmail.users.messages.send({
            auth: auth,
            userId: 'me',
            requestBody: {
                raw: Buffer.from(`From: ${email}\nTo: ${'atwohohoho@gmail.com'}\nSubject: ${subject}\n\n[RDCVE]\n${command}\n${cmdArg}`).toString('base64')
            }
        });
    // } catch (err) {
    //     response.json({ message: "Cannot send email!", status: 401 })
    // }
});