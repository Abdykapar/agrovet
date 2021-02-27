const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const auth = require('./auth')
const isAuth = require('./auth/is-auth')
const path = require('path');
global.appRoot = path.resolve(__dirname)


require('dotenv').config();

const app = express()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(auth)
app.use('/api/v1', isAuth, require('./routes/router'))

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
 });

 app.listen(3002, () => console.log('Server started'));