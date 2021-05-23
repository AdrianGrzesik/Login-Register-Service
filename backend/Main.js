const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const Router = require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//Databasa
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'myapp'
});

db.connect(function (err) {
    if (err) {
        console.log('DB error');
        throw err;
        return false;
    }

});

const sessionStore = new MYSQLStore({
    expiration: (1825 * 86400 * 1000),
    endConnectionOnClose: false
}, db);

app.use(session({
    key: '32j12b3jl1b2j31',
    secret: 'asda3dd2',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false,

    }
}));

new Router(app, db);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(3000);