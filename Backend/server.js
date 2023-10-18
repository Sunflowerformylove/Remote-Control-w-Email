const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const multer = require("multer");
const app = express();
const PORT = 2909;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// Path: Backend/server.js