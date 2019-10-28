const express = require('express')
const app = express()
const port = 3000;

var start = require('./Start');
// var StudentSend = require('./StudentSend');
// var GetStudent = require('./GetStudent');

app.use('/',start);
// app.use('/StudentSend',StudentSend);
// app.use('/GetStudent',GetStudent);

app.listen(port,()=> {
    console.log(`App Listening to ${port}`);
})