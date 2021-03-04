const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const auth = require('./auth')
const isAuth = require('./auth/is-auth')
const path = require('path');
global.appRoot = path.resolve(__dirname)


// require('dotenv').config();
require('dotenv-flow').config();

const app = express()
app.use(cors());
app.options('*', cors());
const expressSwagger = require('express-swagger-generator')(app);

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3002',
        basePath: '/api/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js'] //Path to the API handle folder
};

expressSwagger(options)

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());
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