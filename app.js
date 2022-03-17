var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors'); //CORS
var whiteList = (process.env.CORS_ORIGIN || 'http://localhost:3001').split(','); //CORS

//APLICAR LOS CORS
var corsOptions ={
    origin: (origin, callback) =>{
        if (whiteList.indexOf(origin) >= 0) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    }
}
//_________________________________________________

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api/api');

var app = express();

app.use(logger('dev'));
app.use(cors(corsOptions));// SE AGREGA AQUI
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
// host: http://localhost:3000
// api root folder
// /api/v1/pacientes
// /api/v1/expediente
// /api/v1/expediente/consultas


module.exports = app;
