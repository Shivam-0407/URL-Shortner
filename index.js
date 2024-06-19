const express = require('express');
const getConnection = require('./connect');
const app = express();
const urlRouter = require('./routes/url_route');

getConnection('mongodb://localhost:27017/my-short-url').then(()=>{
    console.log("mongo db connected")
})
app.use(express.json());

app.use('/',urlRouter)

const PORT = 3000;

app.listen(3000,()=>{
    console.log(`listening on : ${PORT}`);
})