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
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const fs = require('fs');
const session = require('express-session');
const SALT_ROUNDS = 15;
const app = express();
const PORT = 3001;
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
const TOKEN_PATH = path.join(__dirname, 'Token/token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'Token/credentials.json');
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
/**
 * Reads previously authorized credentials from the save file.
 *
 * return {Promise<OAuth2Client|null>}
 */

async function loadSaveCredentialIfExist(){
    try{
        const content = await fs.promises.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.OAuth2.fromJSON(credentials);
    }
    catch(err){
        if(err.code === 'ENOENT'){
            return null;
        }
    }
}

async function saveCredential(client){
    const content = await fs.promises.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    })
    await fs.promises.writeFile(TOKEN_PATH, payload, {mode: 0o600});
}

async function authorize(){
    let client = await loadSaveCredentialIfExist();
    if(client){
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if(client.credentials){
        await saveCredential(client);
    }
    return client;
}

async function listLabels(auth){
    const gmail = google.gmail({version: 'v1', auth});
    const res = await gmail.users.labels.list({
        userId: 'me',
    });
    const labels = res.data.labels;
    if(!labels || labels.length === 0){
        console.log('No labels found.');
        return;
    }
    console.log('Labels:');
    labels.forEach((label) => {
        console.log(`-${label.name}`)
    });
}

async function createMail(option){
    const mailComposer = new MailComposer(option);
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
    authorize();
    if (err) console.error(err.message);
    console.log(`Server is running on PORT ${PORT}`)
});

app.post('/api/sendMail', async (request, response) => {
    const token = await JSON.parse(fs.promises.readFile(TOKEN_PATH));
    const credentials = await JSON.parse(fs.promises.readFile(CREDENTIALS_PATH));
    const oauth2Client = new OAuth2(
        token.client_id,
        token.client_secret,
        'http://localhost:3000/email-verification'
    );
    oauth2Client.setCredentials({
        refresh_token: token.refresh_token
    });
    const accessToken = await oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: request.body.sender,
            clientId: token.client_id,
            clientSecret: token.client_secret,
            refreshToken: token.refresh_token,
            accessToken: accessToken,
        }
    });
    const message = {
        from: request.body.sender,
        to: 'atwohohoho@gmail.com',
        subject: request.body.subject,
        text: 'test',
        html: '<div>test</div>'
    };
    transporter.sendMail(message, (err, info) => {
        if(err) console.log(err);
        else console.log(info);
    });
    response.end();
});

// Path: Backend/server.js