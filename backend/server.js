const express = require('express');
const mysql = require('mysql');
const myConn = require('express-myconnection');

const router = require('./routes');

const  errorHandler = require('./middlewares/errorHandler');

const cors = require('cors');

const app = express();
app.set('port',process.env.PORT || 3000);

const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'Isa2024',
    port: 3306,
    database: 'konecta'
}

// middlewares
app.use(myConn(mysql,dbOptions,'single'));
app.use(express.json());
app.use(cors());

// routes
app.use('/api',router);
app.use(errorHandler)

// start server
app.listen(app.get('port'),()=>{
    console.log('server running on port',app.get('port'));
});